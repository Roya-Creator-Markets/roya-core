import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privyServer } from './lib/privy-server';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('privy-token')?.value;

  if (!authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    await privyServer.verifyAuthToken(authToken);
    return NextResponse.next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*'],
};