"use client";

import { error } from "console";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Вы вошли успешно");
        setEmail("");
        setPassword("");
        router.push("/dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage(
        "Ошибка сервера reg" +
          (err instanceof Error ? err.message : "неизвестн ошибка"),
      );
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Войти</button>
      {message ?? <p>{message}</p>}
    </form>
  );
}
