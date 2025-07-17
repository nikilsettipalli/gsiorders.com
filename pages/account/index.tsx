// pages/account/index.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

const menuItems = [
  'Overview',
  'My Orders',
  'Subscriptions',
  'Rewards',
  'Refer & Earn',
  'Store Credit',
  'Settings',
];

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState('Overview');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth');
      } else {
        setUser(session.user);
      }
    };

    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth');
  };

  const handleMenuClick = (item: string) => {
    if (item === 'My Orders') {
      router.push('/account/orders');
    } else {
      setActiveMenu(item);
    }
  };

  if (!user) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-white border-r shadow-md">
        <h2 className="text-xl font-bold mb-8">
          Hi, {user.user_metadata?.name || user.email.split('@')[0]}!
        </h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleMenuClick(item)}
              className={`w-full text-left px-2 py-1 rounded hover:bg-gray-100 ${
                activeMenu === item ? 'font-semibold text-green-600 underline' : ''
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">{activeMenu}</h1>
        <div className="bg-white p-6 rounded-lg shadow text-gray-700">
          {activeMenu === 'Overview' && <p>Welcome to your dashboard.</p>}
          {activeMenu === 'Subscriptions' && <p>No active subscriptions found.</p>}
          {activeMenu === 'Rewards' && <p>Rewards program coming soon.</p>}
          {activeMenu === 'Refer & Earn' && <p>Share your referral link to earn store credit!</p>}
          {activeMenu === 'Store Credit' && (
            <>
              <p>No store credits earned yet.</p>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Continue Shopping
              </button>
            </>
          )}
          {activeMenu === 'Settings' && <p>Settings management will be added soon.</p>}
        </div>
      </main>
    </div>
  );
}
