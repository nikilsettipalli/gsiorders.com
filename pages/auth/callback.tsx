// pages/auth/callback.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    async function handleAuthRedirect() {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error handling auth callback:", error.message);
      }
      // Redirect after login
      router.replace("/");
    }

    handleAuthRedirect();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Logging you in...</p>
    </div>
  );
}
 