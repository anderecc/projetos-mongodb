/* eslint-disable no-undef */
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req = NextRequest) {
    const token = await req.cookies.get('user-token')?.value;
    const header = await req.headers.get('authenticate');

    const appRoutePrivate =
        req.nextUrl.pathname === '/dashboard' ||
        req.nextUrl.pathname === '/billingCycles';

    const apiRoutePrivate = req.url.includes('/api/billingCycles');

    let verifyAuth = async (value) => {
        try {
            await jwtVerify(
                new TextEncoder().encode(value),
                new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET)
            );
            return true;
        } catch (error) {
            return false;
        }
    };

    const verifiedToken = token && (await verifyAuth(token));
    const verifiedHeader = header && (await verifyAuth(header));

    if (req.nextUrl.pathname.startsWith('/auth') && !verifiedToken) {
        return;
    }

    if (req.url.includes('/auth') && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (!verifiedToken && appRoutePrivate) {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    if (!verifiedHeader && apiRoutePrivate) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                message: 'authentication failed',
            }),
            {
                status: 401,
                headers: { 'content-type': 'application/json' },
            }
        );
    }
}

export const config = {
    matcher: [
        '/dashboard',
        '/billingCycles',
        '/auth',
        '/api/billingCycles/:path*',
    ],
};
