// pages/account.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function AccountPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth');
      } else {
        setUserEmail(session.user.email);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">My Account</h1>

      {userEmail ? (
        <>
          <p className="mb-6 text-gray-700">Logged in as <strong>{userEmail}</strong></p>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Your Orders</h2>
              <p className="text-sm text-gray-600">Order history will be shown here soon.</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h2 className="font-semibold text-lg mb-2">Account Info</h2>
              <p className="text-sm text-gray-600">Editing profile details coming soon.</p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
