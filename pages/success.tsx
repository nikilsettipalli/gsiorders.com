import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    const recordOrder = async () => {
      if (!session_id) return;

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        console.error("User session error:", error);
        router.push("/auth");
        return;
      }

      const userId = session.user.id;

      // Fetch cart snapshot from Supabase
      const { data: snapshot, error: snapshotError } = await supabase
        .from("checkout_sessions")
        .select("cart")
        .eq("stripe_session_id", session_id)
        .single();

      if (snapshotError || !snapshot) {
        console.error("❌ Could not retrieve cart snapshot:", snapshotError);
        setLoading(false);
        return;
      }

      const cartItems = snapshot.cart;

      if (!cartItems || cartItems.length === 0) {
        console.warn("🛒 Cart from snapshot is empty.");
        setLoading(false);
        return;
      }

      // Calculate total
      const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );

      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: userId,
            total,
            status: "paid",
            stripe_session_id: session_id,
          },
        ])
        .select()
        .single();

      if (orderError || !orderData) {
        console.error("❌ Error inserting order:", orderError);
        setLoading(false);
        return;
      }

      const orderId = orderData.id;

      // Prepare order_items
      const itemsToInsert = cartItems.map((item: any) => ({
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      }));

      console.log("🧾 Preparing order_items insert...");
      console.log("📦 itemsToInsert:", itemsToInsert);

      if (!itemsToInsert || itemsToInsert.length === 0) {
        console.error("❌ No items to insert into order_items.");
        setLoading(false);
        return;
      }

      // Insert order_items
      const { error: itemError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemError) {
        console.error("❌ ORDER ITEMS INSERT ERROR:", itemError);
        console.log("❌ Payload used:", itemsToInsert);
      } else {
        console.log("✅ Successfully inserted order items.");
        setOrderCreated(true);

        // Optionally delete the snapshot
        await supabase
          .from("checkout_sessions")
          .delete()
          .eq("stripe_session_id", session_id);
      }

      setLoading(false);
    };

    recordOrder();
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Processing your order...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white shadow p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-green-600 mb-2">
            Payment Successful!
          </h1>
          {orderCreated ? (
            <>
              <p className="text-lg text-gray-700">
                Your order has been placed successfully.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Transaction ID: <code>{session_id}</code>
              </p>
            </>
          ) : (
            <p className="text-lg text-red-500">
              Payment succeeded, but order creation failed.
            </p>
          )}
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Home
            </Link>
            <Link
              href="/account/orders"
              className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
