/* eslint-disable no-undef */
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req = NextRequest) {
    const token = await req.cookies.get('user-token')?.value;
    const header = await req.headers.get('authenticate');

    const appRoutePrivate =
        (await req.url.includes('/closing')) ||
        (await req.url.includes('/dashboard'));

    const apiRoutePrivate = await req.url.includes('/api/closing');

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

    if (req.nextUrl.pathname.startsWith('/auth/login') && !verifiedToken) {
        return;
    }

    if (req.url.includes('/auth') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!verifiedToken && appRoutePrivate) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (!verifiedHeader && apiRoutePrivate) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'authentication failed',
            }),
            { status: 401, headers: { 'content-type': 'application/json' } }
        );
    }
}

export const config = {
    matcher: ['/dashboard', '/closing', '/auth/:path*', '/api/closing/:path*'],
};
