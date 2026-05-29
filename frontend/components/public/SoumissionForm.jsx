"use client";
import { useState, useRef, useId, useEffect } from "react";

const CATEGORIES = [
  { value: "poele_de_masse", label: "Poêle de masse", icon: "" },
  { value: "paille", label: "Paille · Terre · Chaux", icon: "" },
  { value: "autre", label: "Autre", icon: "" },
];

const API = process.env.NEXT_PUBLIC_API_URL;

// ── Champ texte accessible ──
function InputField({ id, label, required, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] tracking-[0.2em] uppercase font-bold"
        style={{ color: error ? "#c0392b" : "#8b6347" }}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[#c8a060]">
            *
          </span>
        )}
        {required && <span className="sr-only"> (obligatoire)</span>}
      </label>
      {children}
      {hint && !error && (
        <p
          className="text-[10px]"
          style={{ color: "#b8a090" }}
          id={`${id}-hint`}
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          className="text-[10px] font-medium"
          style={{ color: "#c0392b" }}
          role="alert"
          id={`${id}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function SoumissionForm() {
  const uid = useId();
  const [form, setForm] = useState({
    nom: "",
    email: "",
    titre: "",
    description: "",
    categorie: "poele_de_masse",
  });
  const [honeypot, setHoneypot] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const inputRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function processFile(f) {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setErrors((e) => ({ ...e, file: "Format accepté : JPG, PNG ou WebP." }));
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setErrors((e) => ({ ...e, file: "La photo ne doit pas dépasser 2 Mo." }));
      return;
    }
    setErrors((e) => ({ ...e, file: "" }));
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function handleFile(e) {
    processFile(e.target.files?.[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files?.[0]);
  }

  function removeFile() {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function validate() {
    const errs = {};
    if (!form.nom.trim()) errs.nom = "Votre nom est requis.";
    if (!form.email.trim()) errs.email = "Votre email est requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Format d'email invalide.";
    if (!file) errs.file = "Veuillez sélectionner une photo.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (honeypot) return;

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("loading");
    setSubmitError("");

    // ── reCAPTCHA ──

    const data = new FormData();
    data.append("nom", form.nom);
    data.append("email", form.email);
    data.append("titre", form.titre);
    data.append("description", form.description);
    data.append("categorie", form.categorie);
    data.append("image", file);

    try {
      const res = await fetch(`${API}/api/soumissions`, {
        method: "POST",
        body: data,
      });
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error("Réponse non-JSON →", await res.text());
        throw new Error("Réponse inattendue du serveur.");
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Erreur lors de l'envoi.");
      setStatus("success");
    } catch (err) {
      setSubmitError(err.message);
      setStatus("error");
    }
  }

  // ── Succès ──
  if (status === "success") {
    return (
      <div
        className="max-w-2xl mx-auto p-12 text-center rounded"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,240,232,0.95))",
          border: "1px solid rgba(200,160,96,0.3)",
          boxShadow: "0 8px 40px rgba(61,26,14,0.12)",
        }}
        role="alert"
        aria-live="polite"
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            backgroundColor: "#f0ebe0",
            border: "1px solid rgba(200,160,96,0.3)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 14 L11 20 L23 8"
              stroke="#8aab7a"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          className="font-raleway font-black text-2xl uppercase tracking-widest mb-3"
          style={{ color: "#3d1a0e" }}
        >
          Photo envoyée !
        </h2>
        <p
          className="leading-relaxed"
          style={{ color: "#9a8070", fontSize: "0.9rem" }}
        >
          Merci{" "}
          <strong className="font-semibold" style={{ color: "#3d1a0e" }}>
            {form.nom}
          </strong>
          . Votre photo sera publiée dans la galerie après validation par André.
        </p>
        <div
          className="mt-8 h-px mx-auto w-12"
          style={{ backgroundColor: "rgba(200,160,96,0.4)" }}
        />
        <p
          className="mt-4 text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "#c8bfb0" }}
        >
          La Maison en Paille · Charente
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulaire d'envoi de réalisation"
      className="max-w-2xl mx-auto"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.97), rgba(248,244,238,0.97))",
        border: "1px solid rgba(200,160,96,0.25)",
        boxShadow: "0 8px 40px rgba(61,26,14,0.10)",
      }}
    >
      {/* Honeypot */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* ── Section 1 : Coordonnées ── */}
      <section className="p-8 pb-6" aria-labelledby="section-coordonnees">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
            style={{ backgroundColor: "#3d1a0e" }}
            aria-hidden="true"
          >
            1
          </span>
          <h2
            id="section-coordonnees"
            className="text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ color: "#8b6347" }}
          >
            Vos coordonnées
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            id={`${uid}-nom`}
            label="Prénom et nom"
            required
            error={errors.nom}
          >
            <input
              id={`${uid}-nom`}
              name="nom"
              type="text"
              value={form.nom}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="Marie Dupont"
              aria-required="true"
              aria-invalid={!!errors.nom}
              aria-describedby={errors.nom ? `${uid}-nom-error` : undefined}
              className="w-full rounded-lg px-4 py-3 text-sm transition-all outline-none"
              style={{
                backgroundColor: "#faf7f3",
                border: `1.5px solid ${errors.nom ? "#c0392b" : "#e2d8cc"}`,
                color: "#3d1a0e",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#c8a060";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(200,160,96,0.15), inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.nom ? "#c0392b" : "#e2d8cc";
                e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
            />
          </InputField>
          <InputField
            id={`${uid}-email`}
            label="Email"
            required
            error={errors.email}
            hint="Pour la confirmation d'André"
          >
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="marie@exemple.fr"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? `${uid}-email-error` : `${uid}-email-hint`
              }
              className="w-full rounded-lg px-4 py-3 text-sm transition-all outline-none"
              style={{
                backgroundColor: "#faf7f3",
                border: `1.5px solid ${errors.email ? "#c0392b" : "#e2d8cc"}`,
                color: "#3d1a0e",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#c8a060";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(200,160,96,0.15), inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email
                  ? "#c0392b"
                  : "#e2d8cc";
                e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
            />
          </InputField>
        </div>
      </section>

      <div className="mx-8 h-px" style={{ backgroundColor: "#f0e8dc" }} />

      {/* ── Section 2 : Photo ── */}
      <section className="p-8 pb-6" aria-labelledby="section-photo">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
            style={{ backgroundColor: "#3d1a0e" }}
            aria-hidden="true"
          >
            2
          </span>
          <h2
            id="section-photo"
            className="text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ color: "#8b6347" }}
          >
            Votre photo
          </h2>
        </div>

        {!preview ? (
          <div>
            <label
              htmlFor={`${uid}-file`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center gap-4 cursor-pointer rounded-xl py-14 px-6 text-center transition-all"
              style={{
                border: `2px dashed ${isDragging ? "#c8a060" : errors.file ? "#c0392b" : "#d8cdc0"}`,
                backgroundColor: isDragging
                  ? "rgba(200,160,96,0.06)"
                  : "#faf7f3",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "#f0e8dc",
                  border: "1px solid #e2d8cc",
                }}
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3 L12 17M6 9 L12 3 L18 9"
                    stroke="#c8a060"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 21 L21 21"
                    stroke="#c8a060"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  className="font-raleway font-bold text-sm mb-1"
                  style={{ color: "#3d1a0e" }}
                >
                  {isDragging ? "Déposez ici" : "Cliquez ou déposez une photo"}
                </p>
                <p
                  className="text-[11px] tracking-wide"
                  style={{ color: "#b8a090" }}
                >
                  JPG · PNG · WebP · 2 Mo maximum
                </p>
              </div>
              <input
                id={`${uid}-file`}
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFile}
                aria-required="true"
                aria-invalid={!!errors.file}
                aria-describedby={errors.file ? `${uid}-file-error` : undefined}
                className="sr-only"
              />
            </label>
            {errors.file && (
              <p
                className="mt-2 text-[11px] font-medium"
                style={{ color: "#c0392b" }}
                role="alert"
                id={`${uid}-file-error`}
              >
                {errors.file}
              </p>
            )}
          </div>
        ) : (
          <div
            className="relative rounded-xl overflow-hidden"
            style={{ maxHeight: "300px", border: "1.5px solid #e2d8cc" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Aperçu de votre photo"
              className="w-full object-cover"
              style={{ maxHeight: "300px" }}
            />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: "rgba(61,26,14,0.75)" }}
              aria-label="Supprimer la photo sélectionnée"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 1 L9 9 M9 1 L1 9"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div
              className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: "rgba(61,26,14,0.65)" }}
            >
              {file?.name}
            </div>
          </div>
        )}

        {/* Catégorie */}
        <div className="mt-5">
          <p
            className="text-[10px] tracking-[0.2em] uppercase font-bold mb-3"
            style={{ color: "#8b6347" }}
            id={`${uid}-categorie-label`}
          >
            Catégorie
          </p>
          <div
            role="radiogroup"
            aria-labelledby={`${uid}-categorie-label`}
            className="grid grid-cols-3 gap-3"
          >
            {CATEGORIES.map((c) => (
              <label
                key={c.value}
                className="flex flex-col items-center gap-2 p-3 rounded-xl cursor-pointer transition-all text-center"
                style={{
                  border: `1.5px solid ${form.categorie === c.value ? "#c8a060" : "#e2d8cc"}`,
                  backgroundColor:
                    form.categorie === c.value
                      ? "rgba(200,160,96,0.08)"
                      : "#faf7f3",
                  boxShadow:
                    form.categorie === c.value
                      ? "0 0 0 3px rgba(200,160,96,0.15)"
                      : "none",
                }}
              >
                <input
                  type="radio"
                  name="categorie"
                  value={c.value}
                  checked={form.categorie === c.value}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-xl" aria-hidden="true">
                  {c.icon}
                </span>
                <span
                  className="text-[10px] tracking-wide font-bold leading-tight"
                  style={{
                    color: form.categorie === c.value ? "#3d1a0e" : "#9a8070",
                  }}
                >
                  {c.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-8 h-px" style={{ backgroundColor: "#f0e8dc" }} />

      {/* ── Section 3 : Description ── */}
      <section className="p-8 pb-6" aria-labelledby="section-description">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0"
            style={{
              backgroundColor: "#f0e8dc",
              color: "#8b6347",
              border: "1.5px solid #e2d8cc",
            }}
            aria-hidden="true"
          >
            3
          </span>
          <h2
            id="section-description"
            className="text-[10px] tracking-[0.3em] uppercase font-bold"
            style={{ color: "#8b6347" }}
          >
            Description{" "}
            <span
              className="font-normal normal-case tracking-normal"
              style={{ color: "#c8bfb0" }}
            >
              (optionnel)
            </span>
          </h2>
        </div>
        <div className="space-y-5">
          <InputField id={`${uid}-titre`} label="Titre de la réalisation">
            <input
              id={`${uid}-titre`}
              name="titre"
              type="text"
              value={form.titre}
              onChange={handleChange}
              placeholder="Poêle de masse construit en 2024, Dordogne…"
              className="w-full rounded-lg px-4 py-3 text-sm transition-all outline-none"
              style={{
                backgroundColor: "#faf7f3",
                border: "1.5px solid #e2d8cc",
                color: "#3d1a0e",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#c8a060";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(200,160,96,0.15), inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2d8cc";
                e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
            />
          </InputField>
          <InputField id={`${uid}-description`} label="Quelques mots">
            <textarea
              id={`${uid}-description`}
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Contexte, lieu, année, anecdote sur le chantier…"
              className="w-full rounded-lg px-4 py-3 text-sm transition-all outline-none resize-none"
              style={{
                backgroundColor: "#faf7f3",
                border: "1.5px solid #e2d8cc",
                color: "#3d1a0e",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#c8a060";
                e.target.style.boxShadow =
                  "0 0 0 3px rgba(200,160,96,0.15), inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2d8cc";
                e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.04)";
              }}
            />
          </InputField>
        </div>
      </section>

      {/* ── Submit ── */}
      <div className="px-8 pb-8 pt-2">
        {submitError && (
          <div
            className="mb-4 px-4 py-3 rounded-lg text-sm"
            style={{
              backgroundColor: "rgba(192,57,43,0.08)",
              border: "1px solid rgba(192,57,43,0.25)",
              color: "#c0392b",
            }}
            role="alert"
          >
            {submitError}
          </div>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-4 rounded-xl text-[11px] tracking-[0.25em] uppercase font-black text-white transition-all disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "#3d1a0e",
            boxShadow: "0 4px 16px rgba(61,26,14,0.3)",
          }}
          onMouseEnter={(e) => {
            if (status !== "loading")
              e.target.style.backgroundColor = "#5a2614";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#3d1a0e";
          }}
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <path
                  d="M7 2 A5 5 0 0 1 12 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Envoi en cours…
            </span>
          ) : (
            "Envoyer ma photo"
          )}
        </button>
        <p
          className="mt-4 text-center text-[10px] tracking-wide leading-relaxed"
          style={{ color: "#c8bfb0" }}
        >
          Votre photo sera publiée après validation par André · Aucune donnée
          revendue
        </p>
      </div>
    </form>
  );
}
