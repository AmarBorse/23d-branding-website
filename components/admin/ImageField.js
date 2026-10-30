"use client";
import { useRef, useState } from "react";
import { uploadImage } from "./upload";

// One image: preview + Upload / Replace / Remove.
export default function ImageField({ label, hint, value, onChange, folder, tall = false }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true); setError("");
    try { onChange(await uploadImage(file, folder)); }
    catch (err) { setError(err.message || "Upload failed."); }
    setBusy(false);
  };

  return (
    <div className="adm-field">
      <span>{label}</span>
      {hint && <small>{hint}</small>}
      <div className={`adm-image ${tall ? "adm-image--tall" : ""}`}>
        {value
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={value} alt="" />
          : <div className="adm-image__empty">No image yet</div>}
        {busy && <div className="adm-image__busy">Uploading…</div>}
      </div>
      <div className="adm-row">
        <button type="button" className="adm-btn" onClick={() => input.current?.click()} disabled={busy}>{value ? "Replace" : "Upload image"}</button>
        {value && <button type="button" className="adm-btn adm-btn--ghost" onClick={() => onChange("")} disabled={busy}>Remove</button>}
      </div>
      {error && <p className="adm-error">{error}</p>}
      <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
    </div>
  );
}
