"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/frontend/lib/api/auth";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(form.email, form.password);
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 space-y-5">
      <h2 className="font-serif text-xl text-[#3d2b1f] mb-2">Connexion</h2>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          required
          autoComplete="email"
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
          placeholder="andre@lamaisonenpaille.com"
        />
      </div>
      <div>
        <label className="block text-xs tracking-widest uppercase text-stone-500 font-bold mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          required
          autoComplete="current-password"
          className="w-full border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:border-[#8b6c47]"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8b6c47] text-white text-xs tracking-widest uppercase py-4 font-bold hover:bg-[#3d2b1f] transition-colors disabled:opacity-50"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

// ← Page principale avec Suspense autour du formulaire
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#3d2b1f] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#8b6c47] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-serif text-xs text-center leading-tight px-1">
              MP
            </span>
          </div>
          <h1 className="font-serif text-2xl text-white">
            La Maison en Paille
          </h1>
          <p className="text-stone-400 text-sm mt-1">Espace administration</p>
        </div>

        {/* Suspense obligatoire autour de useSearchParams */}
        <Suspense
          fallback={
            <div className="bg-white p-8">
              <p className="text-stone-400 text-sm text-center">Chargement…</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-stone-400 text-xs hover:text-stone-200 transition-colors tracking-wider"
          >
            ← Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
