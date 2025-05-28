import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";

type SessionState = {
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  isLoading: true,
  setSession: (session) => set({ session }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
