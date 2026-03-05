"use client";

import { error } from "console";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Успешно! Войдите в аккаунт");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error("Ошибка регистрации:", err);
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
      <button type="submit">Зарегистрироваться</button>
      {message ?? <p>{message}</p>}
    </form>
  );
}
