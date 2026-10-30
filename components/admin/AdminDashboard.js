"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminDashboard({ categories }) {
  const router = useRouter();
  const search = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState(search.get("saved") ? "Saved. The website is updated." : "");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const [p, s] = await Promise.all([fetch("/api/admin/projects").then((r) => r.json()), fetch("/api/admin/status").then((r) => r.json())]);
    setProjects(p.projects || []);
    setStatus(s);
  };
  useEffect(() => { load(); }, []);
  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(""), 4000); return () => clearTimeout(t); } }, [msg]);

  const canEdit = status?.storage && status?.saved;

  const importNow = async () => {
    setBusy(true);
    const res = await fetch("/api/admin/import", { method: "POST" });
    const d = await res.json();
    setBusy(false);
    setMsg(res.ok ? `Imported ${d.count} projects. You can now edit them.` : d.error);
    load();
  };
  const move = async (id, dir) => {
    const i = projects.findIndex((p) => p.id === id);
    const cat = projects[i].category;
    let j = i + dir;
    while (j >= 0 && j < projects.length && projects[j].category !== cat) j += dir;
    if (j < 0 || j >= projects.length) return;
    const next = [...projects];
    [next[i], next[j]] = [next[j], next[i]];
    setProjects(next);
    await fetch("/api/admin/projects", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: next.map((p) => p.id) }) });
    setMsg("Order saved.");
  };
  const remove = async (p) => {
    if (!confirm(`Delete “${p.name || p.caption}”? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/projects/${p.id}`, { method: "DELETE" });
    setMsg(res.ok ? "Project deleted." : "Could not delete.");
    load();
  };
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); };

  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <div>
          <h1>Projects</h1>
          <p className="adm-muted">Add, edit and order the projects shown on the website.</p>
        </div>
        <div className="adm-row">
          <a href="/work" target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost">View website ↗</a>
          {canEdit && <Link href="/admin/projects/new" className="adm-btn adm-btn--primary">+ New project</Link>}
          <button className="adm-btn adm-btn--ghost" onClick={logout}>Log out</button>
        </div>
      </div>

      {msg && <div className="adm-toast">{msg}</div>}

      {status && !status.storage && (
        <div className="adm-card adm-warn">
          <h2>Connect storage first</h2>
          <p>The project list needs a place to be saved. In Vercel: <b>Project → Storage → Create Database → Upstash for Redis</b>, connect it to this project, then redeploy. Until then the website shows the projects from the code files.</p>
        </div>
      )}
      {status && !status.images && (
        <div className="adm-card adm-warn">
          <h2>Connect image storage</h2>
          <p>To upload images: in Vercel <b>Project → Storage → Create → Blob</b>, connect it to this project, then redeploy.</p>
        </div>
      )}
      {status?.storage && !status.saved && (
        <div className="adm-card adm-warn">
          <h2>One-time step: import the current projects</h2>
          <p>Copies the {projects.length} projects that are on the website now into the admin panel, so you can edit them and add new ones.</p>
          <button className="adm-btn adm-btn--primary" onClick={importNow} disabled={busy}>{busy ? "Importing…" : "Import current projects"}</button>
        </div>
      )}

      {categories.map((cat) => {
        const items = projects.filter((p) => p.category === cat.id);
        return (
          <section key={cat.id} className="adm-card">
            <h2>{cat.label} <span className="adm-count">{items.length}</span></h2>
            {!items.length && <p className="adm-muted">No projects yet.</p>}
            <ul className="adm-list">
              {items.map((p, k) => (
                <li key={p.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cardImage || p.hero} alt="" />
                  <div className="adm-list__info">
                    <strong>{p.name || p.caption}</strong>
                    <span>{p.caption}</span>
                    <span className="adm-tags">
                      {p.page && <em>Project page</em>}
                      {p.url && <em>Website link</em>}
                      {p.showOnHome !== false && <em>Home slider</em>}
                      {p.showOnWork === false && <em className="adm-tag--off">Hidden on Our Work</em>}
                    </span>
                  </div>
                  {canEdit && (
                    <div className="adm-row adm-list__tools">
                      <button className="adm-icon" onClick={() => move(p.id, -1)} disabled={k === 0} aria-label="Move up">↑</button>
                      <button className="adm-icon" onClick={() => move(p.id, 1)} disabled={k === items.length - 1} aria-label="Move down">↓</button>
                      {p.page && <a className="adm-btn adm-btn--ghost" href={`/work/${p.slug}`} target="_blank" rel="noreferrer">View</a>}
                      <Link className="adm-btn" href={`/admin/projects/${p.id}`}>Edit</Link>
                      <button className="adm-btn adm-btn--danger" onClick={() => remove(p)}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
