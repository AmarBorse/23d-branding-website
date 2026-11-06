"use client";
import { useEffect, useMemo, useState } from "react";

const fmt = (iso) => new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
const LABEL = { new: "New", read: "Read", replied: "Replied" };

// Messages sent from the Contact page.
export default function EnquiriesInbox() {
  const [list, setList] = useState(null);
  const [storage, setStorage] = useState(true);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);

  const load = async () => {
    const d = await fetch("/api/admin/enquiries").then((r) => r.json());
    setList(d.enquiries || []); setStorage(d.storage);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (e, status) => {
    setList((l) => l.map((x) => (x.id === e.id ? { ...x, status } : x)));
    await fetch("/api/admin/enquiries", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: e.id, status }) });
    window.dispatchEvent(new Event("enquiries-changed"));
  };
  const remove = async (e) => {
    if (!confirm(`Delete the enquiry from ${e.name}? This cannot be undone.`)) return;
    setList((l) => l.filter((x) => x.id !== e.id));
    if (open === e.id) setOpen(null);
    await fetch("/api/admin/enquiries", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: e.id }) });
    window.dispatchEvent(new Event("enquiries-changed"));
  };
  const toggle = (e) => {
    setOpen(open === e.id ? null : e.id);
    if (e.status === "new") setStatus(e, "read");
  };

  const shown = useMemo(() => (list || []).filter((e) => {
    if (filter !== "all" && e.status !== filter) return false;
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return [e.name, e.email, e.phone, e.company, e.message, ...(e.needs || [])].join(" ").toLowerCase().includes(s);
  }), [list, filter, q]);
  const count = (s) => (list || []).filter((e) => s === "all" || e.status === s).length;

  const exportCsv = () => {
    const rows = [["Date", "Name", "Email", "Phone", "Company", "Looking for", "Message", "Status"],
      ...shown.map((e) => [fmt(e.createdAt), e.name, e.email, e.phone, e.company, (e.needs || []).join("; "), e.message, LABEL[e.status]])];
    const csv = rows.map((r) => r.map((c) => `"${String(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv" }));
    a.download = `23d-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <div>
          <h1>Enquiries</h1>
          <p className="adm-muted">Messages sent from the Contact page form. Newest first.</p>
        </div>
        <div className="adm-row">
          <button className="adm-btn adm-btn--ghost" onClick={load}>Refresh</button>
          {!!shown.length && <button className="adm-btn" onClick={exportCsv}>Download (Excel/CSV)</button>}
        </div>
      </div>

      {!storage && <div className="adm-card adm-warn"><h2>Storage not connected</h2><p>Enquiries are saved in the same storage as projects. Connect it (see the Projects tab) and new messages will appear here.</p></div>}

      <div className="adm-enq-bar">
        <div className="adm-nav__tabs adm-enq-filters">
          {["all", "new", "read", "replied"].map((s) => (
            <button key={s} className={`adm-chip ${filter === s ? "is-active" : ""}`} onClick={() => setFilter(s)}>
              {s === "all" ? "All" : LABEL[s]} <span>{count(s)}</span>
            </button>
          ))}
        </div>
        <input className="adm-search" type="search" placeholder="Search name, email, message…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {list === null && <p className="adm-muted">Loading…</p>}
      {list && !shown.length && <div className="adm-card"><p className="adm-muted">{list.length ? "No enquiries match." : "No enquiries yet. When someone sends the Contact form, it will appear here."}</p></div>}

      <ul className="adm-enq">
        {shown.map((e) => {
          const isOpen = open === e.id;
          const reply = `mailto:${e.email}?subject=${encodeURIComponent("Re: Your enquiry to 23D Branding")}&body=${encodeURIComponent(`Hi ${e.name.split(" ")[0]},\n\nThank you for reaching out to 23D Branding.\n\n`)}`;
          const wa = e.phone ? `https://wa.me/${e.phone.replace(/\D/g, "").replace(/^0+/, "").replace(/^(?=\d{10}$)/, "91")}` : "";
          return (
            <li key={e.id} className={`adm-enq__item ${e.status === "new" ? "is-new" : ""} ${isOpen ? "is-open" : ""}`}>
              <button className="adm-enq__head" onClick={() => toggle(e)} aria-expanded={isOpen}>
                <span className={`adm-enq__dot adm-enq__dot--${e.status}`} aria-label={LABEL[e.status]} />
                <span className="adm-enq__who"><strong>{e.name}</strong><span>{e.company || e.email}</span></span>
                <span className="adm-enq__preview">{(e.needs || []).length ? <em>{e.needs.join(", ")}</em> : null} {e.message}</span>
                <span className="adm-enq__date">{fmt(e.createdAt)}</span>
              </button>
              {isOpen && (
                <div className="adm-enq__body">
                  <dl>
                    <dt>Email</dt><dd><a href={`mailto:${e.email}`}>{e.email}</a></dd>
                    {e.phone && <><dt>Phone</dt><dd><a href={`tel:${e.phone}`}>{e.phone}</a></dd></>}
                    {e.company && <><dt>Company</dt><dd>{e.company}</dd></>}
                    {!!(e.needs || []).length && <><dt>Looking for</dt><dd>{e.needs.join(", ")}</dd></>}
                    <dt>Received</dt><dd>{fmt(e.createdAt)}</dd>
                    <dt>Status</dt><dd>{LABEL[e.status]}</dd>
                  </dl>
                  <p className="adm-enq__msg">{e.message}</p>
                  <div className="adm-row">
                    <a className="adm-btn adm-btn--primary" href={reply} onClick={() => setStatus(e, "replied")}>Reply by email</a>
                    {wa && <a className="adm-btn" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>}
                    {e.status !== "replied" && <button className="adm-btn" onClick={() => setStatus(e, "replied")}>Mark as replied</button>}
                    {e.status !== "new" && <button className="adm-btn adm-btn--ghost" onClick={() => setStatus(e, "new")}>Mark as new</button>}
                    <button className="adm-btn adm-btn--danger" onClick={() => remove(e)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
