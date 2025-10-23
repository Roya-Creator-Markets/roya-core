'use client';

import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';

export default function LoginButton() {
  const { ready, authenticated, login, logout, user } = usePrivy();

  if (!ready) {
    return (
      <button 
        disabled 
        className="px-6 py-3 bg-gray-400 text-white rounded-lg"
      >
        Loading...
      </button>
    );
  }

  if (authenticated) {
    return (
      <div className="space-y-4 text-center">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
          <p className="font-mono text-xs break-all bg-gray-50 p-3 rounded">
            {user?.wallet?.address || user?.email?.address}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            User ID: {user?.id}
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/dashboard"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={logout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Login with Wallet or Email
    </button>
  );
}