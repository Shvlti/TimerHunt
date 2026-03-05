"use client";

import { useState } from "react";
import LoginForm from "../login/LoginForm";
import RegisterForm from "../register/RegisterForm";

export function AuthSwitcher() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="w-80">
      <button onClick={() => setMode("login")}>Login</button>
      <button onClick={() => setMode("register")}>Register</button>
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
