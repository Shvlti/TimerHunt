"use client";

import { getCurrentUser } from "@/entities/user/api/getCurrentUser";
import { useUserStore } from "@/entities/user/model/user.store";
import { useEffect } from "react";

export function AppInit() {
  const setUser = useUserStore((s) => s.setUser);
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      setUser(user);
    }
    loadUser();
  }, []);
  return null;
}
