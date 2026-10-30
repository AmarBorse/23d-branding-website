"use client";
import { useRef, useState } from "react";
import { readProjectPdf } from "./pdfReader";
import { uploadImage } from "./upload";

// "Fill from a PDF": reads a project PDF (like the SJ Finvest design) and fills in the form.
export default function PdfImport({ folder, onApply }) {
  const input = useRef(null);
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [chosen, setChosen] = useState([]);
  const [main, setMain] = useState(0);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(""); setResult(null);
    try {
      const r = await readProjectPdf(file, setStep);
      if (!r.images.length && !r.name) throw new Error("Couldn’t find any text or images in this PDF.");
      setResult(r);
      setChosen(r.images.map(() => true));
      setMain(0);
    } catch (err) {
      setError(err.message || "Could not read this PDF.");
    }
    setStep("");
  };

  const apply = async () => {
    setError("");
    try {
      const urls = [];
      const order = result.images.map((_, i) => i).filter((i) => chosen[i]);
      const mainIndex = chosen[main] ? main : order[0];
      for (let k = 0; k < order.length; k++) {
        setStep(`Uploading image ${k + 1} of ${order.length}…`);
        const file = await result.images[order[k]].getFile();
        urls.push({ i: order[k], url: await uploadImage(file, folder) });
      }
      const hero = urls.find((u) => u.i === mainIndex)?.url || "";
      onApply({
        name: result.name,
        description: result.description,
        hero,
        gallery: urls.filter((u) => u.i !== mainIndex).map((u) => u.url),
      });
      setResult(null);
    } catch (err) {
      setError(err.message || "Upload failed.");
    }
    setStep("");
  };

  return (
    <section className="adm-card adm-pdf">
      <div className="adm-pdf__head">
        <div>
          <h2>Fill from a PDF <span className="adm-count">optional</span></h2>
          <p className="adm-muted">Upload the project’s design PDF (like the SJ Finvest one). The name, description and all images are picked up automatically, and you can check them before using them.</p>
        </div>
        <button type="button" className="adm-btn" onClick={() => input.current?.click()} disabled={!!step}>Choose PDF</button>
      </div>
      <input ref={input} type="file" accept="application/pdf" hidden onChange={pick} />
      {step && <p className="adm-pdf__step">{step}</p>}
      {error && <p className="adm-error">{error}</p>}

      {result && !step && (
        <div className="adm-pdf__result">
          <dl>
            <dt>Name found</dt><dd>{result.name || <em>none</em>}</dd>
            <dt>Description found</dt><dd>{result.description || <em>none</em>}</dd>
          </dl>
          <p className="adm-muted">{result.images.length} images found. Untick any you don’t want, and choose which one is the main image.</p>
          <ol className="adm-gallery">
            {result.images.map((img, i) => (
              <li key={i} className={chosen[i] ? "" : "is-off"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.preview} alt="" />
                <div className="adm-gallery__tools adm-pdf__tools">
                  <label><input type="checkbox" checked={chosen[i]} onChange={(e) => setChosen((c) => c.map((v, k) => (k === i ? e.target.checked : v)))} /> Use</label>
                  <label><input type="radio" name="pdf-main" checked={main === i} onChange={() => setMain(i)} disabled={!chosen[i]} /> Main</label>
                </div>
              </li>
            ))}
          </ol>
          {result.pages > 1 && <p className="adm-muted">Note: only the first page of the PDF is read.</p>}
          <div className="adm-row">
            <button type="button" className="adm-btn adm-btn--primary" onClick={apply}>Use this in the form</button>
            <button type="button" className="adm-btn adm-btn--ghost" onClick={() => setResult(null)}>Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
}
