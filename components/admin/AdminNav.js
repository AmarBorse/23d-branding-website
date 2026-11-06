"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Tabs at the top of the admin panel.
export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); };
  const tab = (href, label, active) => <Link href={href} className={`adm-nav__tab ${active ? "is-active" : ""}`}>{label}</Link>;
  return (
    <nav className="adm-nav">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-23d.png" alt="23D" className="adm-nav__logo" />
      <div className="adm-nav__tabs">
        {tab("/admin", "Projects", pathname === "/admin" || pathname.startsWith("/admin/projects"))}
        {tab("/admin/team", "Team", pathname.startsWith("/admin/team"))}
      </div>
      <div className="adm-row">
        <a href="/" target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost adm-btn--dark">View website ↗</a>
        <button className="adm-btn adm-btn--ghost adm-btn--dark" onClick={logout}>Log out</button>
      </div>
    </nav>
  );
}
