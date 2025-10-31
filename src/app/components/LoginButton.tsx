'use client';

import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LoginButton() {
  const { ready, authenticated, login, logout, user, getAccessToken } = usePrivy();
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync authentication token to server when authenticated
  useEffect(() => {
    if (!ready || !authenticated) return;

    const syncToken = async () => {
      try {
        setIsSyncing(true);
        setError(null);
        
        const token = await getAccessToken();
        
        if (!token) {
          throw new Error('Failed to get access token');
        }

        const response = await fetch('/api/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: token }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to sync token');
        }
      } catch (err) {
        console.error('Token sync error:', err);
        setError(err instanceof Error ? err.message : 'Failed to sync authentication');
      } finally {
        setIsSyncing(false);
      }
    };

    syncToken();
  }, [ready, authenticated, getAccessToken]);

  const handleLogout = async () => {
    try {
      // Clear the cookie first
      await fetch('/api/auth/token', {
        method: 'DELETE',
      });
    } catch (err) {
      console.error('Failed to clear token:', err);
    }
    
    // Then logout from Privy
    logout();
  };

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
        {isSyncing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-600">Syncing authentication...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
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
            onClick={handleLogout}
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