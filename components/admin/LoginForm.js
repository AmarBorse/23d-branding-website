"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) return setError(data.error || "Could not log in.");
    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="adm-login">
      <form className="adm-card adm-login__card" onSubmit={submit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo-23d.png" alt="23D" className="adm-login__logo" />
        <h1>Admin panel</h1>
        <label className="adm-field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required autoComplete="current-password" />
        </label>
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn adm-btn--primary" disabled={busy}>{busy ? "Checking…" : "Log in"}</button>
      </form>
    </div>
  );
}
