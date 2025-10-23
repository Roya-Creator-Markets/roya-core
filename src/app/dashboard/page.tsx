import { requireAuth, getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  try {
    const session = await requireAuth();
    const user = await getUser(session.userId);

    if (!user) {
      redirect('/');
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">User Information</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">User ID:</p>
                    <p className="font-mono text-xs">{user.id}</p>
                  </div>
                  
                  {user.wallet?.address && (
                    <div>
                      <p className="text-gray-600">Wallet Address:</p>
                      <p className="font-mono text-xs">{user.wallet.address}</p>
                    </div>
                  )}
                  
                  {user.email?.address && (
                    <div>
                      <p className="text-gray-600">Email:</p>
                      <p className="text-xs">{user.email.address}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-gray-600">Created At:</p>
                    <p className="text-xs">
                      {new Date(user.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Linked Accounts</h2>
                <p className="text-sm text-gray-600">
                  {user.linkedAccounts?.length || 0} account(s) linked
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    redirect('/');
  }
}