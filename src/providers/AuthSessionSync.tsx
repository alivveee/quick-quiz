import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store/useSessionStore";

export default function AuthSessionSync() {
  const { setSession, setIsLoading } = useSessionStore();

  useEffect(() => {
    setIsLoading(true);

    // Ambil session saat pertama kali
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen perubahan session login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setIsLoading, setSession]);

  return null;
}
