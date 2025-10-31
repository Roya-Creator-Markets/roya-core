import { cookies } from 'next/headers';
import { privyServer } from './privy-server';

export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('privy-token')?.value;

    if (!authToken) {
      return null;
    }

    const verifiedClaims = await privyServer.verifyAuthToken(authToken);
    return verifiedClaims;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

export async function getUser(userId: string) {
  try {
    return await privyServer.getUser(userId);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}