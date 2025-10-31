import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    // Verify the token is valid (basic check)
    if (typeof accessToken !== 'string' || accessToken.length === 0) {
      return NextResponse.json(
        { error: 'Invalid access token' },
        { status: 400 }
      );
    }

    // Create response
    const response = NextResponse.json({ success: true });

    // Set the access token as an HTTP-only cookie
    // The access token itself can be used for server-side verification
    response.cookies.set('privy-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create authentication token' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true });
    
    // Clear the auth token cookie
    response.cookies.set('privy-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token deletion failed:', error);
    return NextResponse.json(
      { error: 'Failed to delete authentication token' },
      { status: 500 }
    );
  }
}

