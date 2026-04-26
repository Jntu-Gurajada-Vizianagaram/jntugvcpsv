"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({ defaultUsername, passwordConfigured }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Login failed.");
      }

      router.push(next);
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="login-tip">
        <strong>CMS Login</strong>
        <p>
          Default username: <code>{defaultUsername}</code>
        </p>
        <p>
          Password source: {passwordConfigured ? "configured from environment" : "fallback local password"}
        </p>
      </div>

      <label className="cms-field">
        <span>Username</span>
        <input className="cms-input" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>

      <label className="cms-field">
        <span>Password</span>
        <input
          className="cms-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      {error ? <p className="login-error">{error}</p> : null}

      <button type="submit" className="button button-primary" disabled={pending}>
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
