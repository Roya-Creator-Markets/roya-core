import { NextResponse } from 'next/server';
import { requireAuth, getUser } from '@/lib/auth';

export async function GET() {
  try {
    const session = await requireAuth();
    const user = await getUser(session.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        createdAt: user.createdAt,
        wallet: user.wallet?.address,
        email: user.email?.address,
        linkedAccounts: user.linkedAccounts,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}