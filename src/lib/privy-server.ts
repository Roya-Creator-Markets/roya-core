import { PrivyClient } from '@privy-io/server-auth';

if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID || !process.env.PRIVY_APP_SECRET) {
  throw new Error('Missing Privy environment variables');
}

export const privyServer = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID,
  process.env.PRIVY_APP_SECRET
);