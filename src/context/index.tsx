"use client";
import { createContext, useState } from "react";

export const AppContext = createContext<any>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  interface User {
    id: number;
    referral: string;
  }

  const [user, setUser] = useState<User>({
    id: 0,
    referral: "",
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}
