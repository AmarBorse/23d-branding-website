"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Tabs at the top of the admin panel.
export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    const check = () => fetch("/api/admin/enquiries?count=1").then((r) => r.json()).then((d) => setUnread(d.newCount || 0)).catch(() => {});
    check();
    const t = setInterval(check, 60000);
    window.addEventListener("enquiries-changed", check);
    return () => { clearInterval(t); window.removeEventListener("enquiries-changed", check); };
  }, []);
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); };
  const tab = (href, label, active) => <Link href={href} className={`adm-nav__tab ${active ? "is-active" : ""}`}>{label}</Link>;
  return (
    <nav className="adm-nav">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-23d.png" alt="23D" className="adm-nav__logo" />
      <div className="adm-nav__tabs">
        {tab("/admin", "Projects", pathname === "/admin" || pathname.startsWith("/admin/projects"))}
        {tab("/admin/team", "Team", pathname.startsWith("/admin/team"))}
        <Link href="/admin/enquiries" className={`adm-nav__tab ${pathname.startsWith("/admin/enquiries") ? "is-active" : ""}`}>
          Enquiries{unread > 0 && <span className="adm-nav__badge">{unread}</span>}
        </Link>
      </div>
      <div className="adm-row">
        <a href="/" target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost adm-btn--dark">View website ↗</a>
        <button className="adm-btn adm-btn--ghost adm-btn--dark" onClick={logout}>Log out</button>
      </div>
    </nav>
  );
}
