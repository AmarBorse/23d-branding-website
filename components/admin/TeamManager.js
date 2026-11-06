"use client";
import { useEffect, useState } from "react";
import ImageField from "./ImageField";

const blank = { id: "", name: "", role: "", photo: "" };

// Add, edit, delete and re-order the people shown in "Our Team" on the About page.
export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [status, setStatus] = useState(null);
  const [editing, setEditing] = useState(null); // member being edited (or a new one)
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const [t, s] = await Promise.all([fetch("/api/admin/team").then((r) => r.json()), fetch("/api/admin/status").then((r) => r.json())]);
    setTeam(t.team || []);
    setStatus(s);
  };
  useEffect(() => { load(); }, []);
  useEffect(() => { if (msg) { const t = setTimeout(() => setMsg(""), 3500); return () => clearTimeout(t); } }, [msg]);

  const save = async (list, okMsg) => {
    setBusy(true); setError("");
    const res = await fetch("/api/admin/team", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ team: list }) });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) { setError(d.error || "Could not save."); return false; }
    setTeam(d.team); setMsg(okMsg); setStatus((s) => ({ ...s, teamSaved: true }));
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    const m = { ...editing, name: editing.name.trim(), role: editing.role.trim() };
    if (!m.name || !m.photo) return setError("Please add a name and a photo.");
    const list = m.id ? team.map((x) => (x.id === m.id ? m : x)) : [...team, { ...m, id: `m${Date.now().toString(36)}` }];
    if (await save(list, m.id ? "Member updated." : "Member added.")) setEditing(null);
  };
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= team.length) return;
    const list = [...team];
    [list[i], list[j]] = [list[j], list[i]];
    save(list, "Order saved.");
  };
  const remove = (m) => { if (confirm(`Remove ${m.name} from the team?`)) save(team.filter((x) => x.id !== m.id), "Member removed."); };

  const canEdit = status?.storage;

  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <div>
          <h1>Our Team</h1>
          <p className="adm-muted">The people in the sliding “Our Team” section on the About page. The first one is shown in the centre first.</p>
        </div>
        {canEdit && !editing && <button className="adm-btn adm-btn--primary" onClick={() => { setError(""); setEditing({ ...blank }); }}>+ Add member</button>}
      </div>

      {msg && <div className="adm-toast">{msg}</div>}
      {status && !status.storage && (
        <div className="adm-card adm-warn"><h2>Connect storage first</h2><p>See the Projects tab for the setup steps. Until then the About page shows the team from the code files.</p></div>
      )}

      {editing && (
        <form className="adm-card adm-team-form" onSubmit={submit}>
          <h2>{editing.id ? `Edit ${editing.name}` : "New team member"}</h2>
          <div className="adm-team-form__grid">
            <ImageField label="Photo *" hint="A portrait photo works best (it is shown in black & white)." value={editing.photo}
              onChange={(v) => setEditing((m) => ({ ...m, photo: v }))} folder="team" tall />
            <div>
              <label className="adm-field"><span>Name *</span>
                <input value={editing.name} onChange={(e) => setEditing((m) => ({ ...m, name: e.target.value }))} maxLength={80} required autoFocus /></label>
              <label className="adm-field"><span>Role</span><small>e.g. Founder, Web Developer, Social Marketing</small>
                <input value={editing.role} onChange={(e) => setEditing((m) => ({ ...m, role: e.target.value }))} maxLength={80} /></label>
              {error && <p className="adm-error">{error}</p>}
              <div className="adm-row">
                <button className="adm-btn adm-btn--primary" disabled={busy}>{busy ? "Saving…" : "Save member"}</button>
                <button type="button" className="adm-btn adm-btn--ghost" onClick={() => { setEditing(null); setError(""); }}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
      )}

      <section className="adm-card">
        <h2>Members <span className="adm-count">{team.length}</span></h2>
        {!editing && error && <p className="adm-error">{error}</p>}
        {!team.length && <p className="adm-muted">No team members yet.</p>}
        <ul className="adm-team">
          {team.map((m, i) => (
            <li key={m.id || i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.photo} alt="" />
              <div className="adm-team__info"><strong>{m.name}</strong><span>{m.role}</span></div>
              {canEdit && (
                <div className="adm-row adm-team__tools">
                  <button className="adm-icon" onClick={() => move(i, -1)} disabled={i === 0 || busy} aria-label="Move earlier">←</button>
                  <button className="adm-icon" onClick={() => move(i, 1)} disabled={i === team.length - 1 || busy} aria-label="Move later">→</button>
                  <button className="adm-btn" onClick={() => { setError(""); setEditing({ ...m }); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Edit</button>
                  <button className="adm-btn adm-btn--danger" onClick={() => remove(m)} disabled={busy}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
