/* eslint-disable no-undef */
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req = NextRequest) {
    const token = await req.cookies.get('user-token')?.value;
    const header = await req.headers.get('authenticate');

    const base_url = await req.nextUrl.origin;

    const appRoutePrivate =
        req.url.includes('/closing') ||
        req.url.includes('/dashboard') ||
        req.url.includes('/generatePDF');

    const verifyAuth = async (value) => {
        try {
            await jwtVerify(
                new TextEncoder().encode(value),
                new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT)
            );
            return true;
        } catch (error) {
            return false;
        }
    };
    const verifiedToken = token && (await verifyAuth(token));
    const verifiedHeader = header && (await verifyAuth(header));

    if (req.url.includes('/api/auth')) {
        return NextResponse.next();
    }

    if (req.url.includes('/api/closing') && verifiedHeader) {
        return NextResponse.next();
    }

    if (req.url.includes('/api/closing') && !verifiedHeader) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'authentication failed',
            }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }

    if (req.url.includes('/auth') && !verifiedToken) {
        return NextResponse.next();
    }

    if (req.url.includes('/auth') && verifiedToken) {
        const url = `${base_url}/dashboard`;
        return NextResponse.redirect(url);
    }

    if (appRoutePrivate && !verifiedToken) {
        const url = `${base_url}/auth/login`;
        return NextResponse.redirect(url);
    }

    if (appRoutePrivate && verifiedToken) {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/closing/:path*',
        '/auth/:path*',
        '/api/:path*',
        '/generatePDF',
    ],
};
