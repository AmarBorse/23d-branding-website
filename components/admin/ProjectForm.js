"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ImageField from "./ImageField";
import GalleryField from "./GalleryField";
import PdfImport from "./PdfImport";

const empty = {
  name: "", title: "", caption: "", category: "", cardImage: "", cardPosition: "", homeImage: "", url: "",
  page: true, hero: "", description: "", gallery: [], showOnWork: true, showOnHome: true, slug: "",
};
const slugify = (s = "") => s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

export default function ProjectForm({ id, categories }) {
  const router = useRouter();
  const isNew = !id;
  const [p, setP] = useState({ ...empty, category: categories[0]?.id || "" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(!isNew);

  useEffect(() => {
    if (isNew) return;
    fetch("/api/admin/projects").then((r) => r.json()).then((d) => {
      const found = (d.projects || []).find((x) => x.id === id);
      if (found) setP({ ...empty, ...found });
      else setError("Project not found.");
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (key) => (v) => setP((prev) => {
    const next = { ...prev, [key]: v?.target ? (v.target.type === "checkbox" ? v.target.checked : v.target.value) : v };
    if (key === "name" && !slugTouched) next.slug = slugify(next.name);
    return next;
  });
  const folder = useMemo(() => `projects/${slugify(p.slug || p.name) || "new"}`, [p.slug, p.name]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true); setError("");
    const res = await fetch(isNew ? "/api/admin/projects" : `/api/admin/projects/${id}`, {
      method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) return setError(data.error || "Could not save.");
    router.push("/admin?saved=1");
    router.refresh();
  };

  if (loading) return <div className="adm-wrap"><p>Loading…</p></div>;

  return (
    <div className="adm-wrap">
      <div className="adm-top">
        <Link href="/admin" className="adm-back">← All projects</Link>
        <h1>{isNew ? "New project" : `Edit: ${p.name || p.caption}`}</h1>
      </div>

      <PdfImport folder={folder} onApply={(d) => {
        setP((prev) => {
          const name = d.name || prev.name;
          return {
            ...prev,
            name,
            title: prev.title || name,
            description: d.description || prev.description,
            page: true,
            hero: d.hero || prev.hero,
            cardImage: prev.cardImage || d.hero,
            gallery: [...prev.gallery, ...d.gallery],
            slug: slugTouched ? prev.slug : slugify(name),
          };
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} />

      <form onSubmit={save} className="adm-form">
        <section className="adm-card">
          <h2>Basic details</h2>
          <label className="adm-field"><span>Project name *</span><small>Big title on the project page, e.g. “SJ FINVEST PVT. LTD.”</small>
            <input value={p.name} onChange={set("name")} required maxLength={120} /></label>
          <div className="adm-grid2">
            <label className="adm-field"><span>Short name</span><small>Used on the home slider, e.g. “SJ Finvest”</small>
              <input value={p.title} onChange={set("title")} maxLength={120} /></label>
            <label className="adm-field"><span>Service (Our Work tab) *</span><small>Which tab it appears under</small>
              <select value={p.category} onChange={set("category")}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select></label>
          </div>
          <label className="adm-field"><span>Card caption</span><small>Text under the image on the Our Work page, e.g. “Finance & Investment firm”</small>
            <input value={p.caption} onChange={set("caption")} maxLength={160} /></label>
          <label className="adm-field"><span>Live website link (optional)</span><small>For website projects, e.g. https://littlesukis.com/ — used when there is no project page</small>
            <input type="url" value={p.url} onChange={set("url")} placeholder="https://" /></label>
        </section>

        <section className="adm-card">
          <h2>Card image</h2>
          <div className="adm-grid2">
            <ImageField label="Our Work page image *" hint="The picture on the Our Work page card." value={p.cardImage} onChange={set("cardImage")} folder={folder} />
            <ImageField label="Home slider image (optional)" hint="A tall (portrait) image looks best. If empty, the project page main image or card image is used." value={p.homeImage} onChange={set("homeImage")} folder={folder} tall />
          </div>
          <div className="adm-checks">
            <label><input type="checkbox" checked={p.showOnWork} onChange={set("showOnWork")} /> Show on the Our Work page</label>
            <label><input type="checkbox" checked={p.showOnHome} onChange={set("showOnHome")} /> Show in the home page “Our Work” slider</label>
          </div>
        </section>

        <section className="adm-card">
          <div className="adm-switch">
            <label><input type="checkbox" checked={p.page} onChange={set("page")} /> <strong>Create a project page</strong></label>
            <small>Clicking the project opens its own page (like SJ Finvest): title, main image, description, then the gallery.</small>
          </div>
          {p.page && (
            <>
              <ImageField label="Main image *" hint="Big image at the top of the project page." value={p.hero} onChange={set("hero")} folder={folder} />
              <label className="adm-field"><span>Description</span><small>Paragraph under the main image.</small>
                <textarea rows={4} value={p.description} onChange={set("description")} maxLength={3000} /></label>
              <GalleryField value={p.gallery} onChange={set("gallery")} folder={folder} />
              <label className="adm-field"><span>Page address</span><small>23dbranding…/work/<b>{p.slug || "…"}</b></small>
                <input value={p.slug} onChange={(e) => { setSlugTouched(true); set("slug")(slugify(e.target.value)); }} maxLength={60} /></label>
            </>
          )}
        </section>

        {error && <p className="adm-error adm-error--big">{error}</p>}
        <div className="adm-actions">
          <Link href="/admin" className="adm-btn adm-btn--ghost">Cancel</Link>
          {!isNew && p.page && <a href={`/work/${p.slug}`} target="_blank" rel="noreferrer" className="adm-btn">View page ↗</a>}
          <button className="adm-btn adm-btn--primary" disabled={saving}>{saving ? "Saving…" : "Save project"}</button>
        </div>
      </form>
    </div>
  );
}