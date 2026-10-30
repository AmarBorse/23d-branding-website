"use client";
import { useRef, useState } from "react";
import { uploadImage } from "./upload";

// The images shown under the description on the project page (top to bottom).
export default function GalleryField({ value = [], onChange, folder }) {
  const input = useRef(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  const add = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setError("");
    let list = [...value];
    for (let i = 0; i < files.length; i++) {
      setBusy(`Uploading ${i + 1} of ${files.length}…`);
      try { list = [...list, await uploadImage(files[i], folder)]; onChange(list); }
      catch (err) { setError(err.message || "Upload failed."); break; }
    }
    setBusy("");
  };
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const list = [...value];
    [list[i], list[j]] = [list[j], list[i]];
    onChange(list);
  };
  const remove = (i) => onChange(value.filter((_, k) => k !== i));

  return (
    <div className="adm-field">
      <span>Gallery images</span>
      <small>Shown one below another on the project page. You can select several images at once.</small>
      {value.length > 0 && (
        <ol className="adm-gallery">
          {value.map((src, i) => (
            <li key={src + i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" />
              <div className="adm-gallery__tools">
                <span>{i + 1}</span>
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">↓</button>
                <button type="button" onClick={() => remove(i)} aria-label="Remove" className="adm-danger">✕</button>
              </div>
            </li>
          ))}
        </ol>
      )}
      <div className="adm-row">
        <button type="button" className="adm-btn" onClick={() => input.current?.click()} disabled={!!busy}>{busy || "Add images"}</button>
      </div>
      {error && <p className="adm-error">{error}</p>}
      <input ref={input} type="file" accept="image/*" multiple hidden onChange={add} />
    </div>
  );
}
