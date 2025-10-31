import { PrivyClient } from '@privy-io/server-auth';

let privyServerInstance: PrivyClient | null = null;

function getPrivyServer(): PrivyClient {
  if (!privyServerInstance) {
    const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    const appSecret = process.env.PRIVY_APP_SECRET;

    if (!appId || !appSecret) {
      // During build, env vars might not be available - throw a clear error
      const error = new Error('Missing Privy environment variables: NEXT_PUBLIC_PRIVY_APP_ID and PRIVY_APP_SECRET must be set');
      (error as any).code = 'MISSING_ENV_VARS';
      throw error;
    }

    privyServerInstance = new PrivyClient(appId, appSecret);
  }

  return privyServerInstance;
}

export const privyServer = {
  verifyAuthToken: async (token: string) => {
    try {
      return await getPrivyServer().verifyAuthToken(token);
    } catch (error: any) {
      if (error.code === 'MISSING_ENV_VARS') {
        console.error('Privy environment variables not set. This is expected during build if vars are not configured.');
        throw new Error('Authentication service unavailable');
      }
      throw error;
    }
  },
  getUser: async (userId: string) => {
    try {
      return await getPrivyServer().getUser(userId);
    } catch (error: any) {
      if (error.code === 'MISSING_ENV_VARS') {
        console.error('Privy environment variables not set. This is expected during build if vars are not configured.');
        throw new Error('Authentication service unavailable');
      }
      throw error;
    }
  },
};