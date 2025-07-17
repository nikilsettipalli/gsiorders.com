import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push('/auth');
        return;
      }

      const userId = session.user.id;

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(
          `
          id,
          total,
          status,
          created_at,
          order_items (
            quantity,
            price,
            products (
              name
            )
          )
        `
        )
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError.message);
        setLoading(false);
        return;
      }

      const formattedOrders = (ordersData || []).map((order: any) => ({
        ...order,
        order_items: (order.order_items || []).map((item: any) => ({
          ...item,
          product_name: item?.products?.name ?? 'Unnamed product',
        })),
      }));

      setOrders(formattedOrders);
      setLoading(false);
    };

    fetchOrders();
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg shadow">
              <p className="text-sm text-gray-600">
                <strong>Order ID:</strong> {order.id}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Placed on:</strong>{' '}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Status:</strong> {order.status ?? 'N/A'}
              </p>

              <ul className="list-disc pl-6 text-sm text-gray-800">
                {order.order_items.map((item, idx) => (
                  <li key={idx}>
                    {item.product_name} × {item.quantity} — $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="mt-2 text-right font-semibold">
                Total: ${order.total?.toFixed(2) ?? '0.00'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
