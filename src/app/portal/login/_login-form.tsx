"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createAuthClient } from "@/lib/supabase-auth-client";
import { AlertCircle, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";

type FormMode = "signin" | "signup";
type FormState = "idle" | "loading" | "error";

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized: "Access denied — this email is not authorised for admin access.",
  auth_failed: "Sign-in failed. Please check your credentials and try again.",
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = ERROR_MESSAGES[searchParams.get("error") ?? ""];

  const [mode, setMode] = useState<FormMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setFormState] = useState<FormState>("idle");
  const [inlineError, setInlineError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setInlineError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setInlineError(mode === "signup" ? "Password must be at least 6 characters." : "Please enter your password.");
      return;
    }

    setFormState("loading");
    setInlineError("");

    const supabase = createAuthClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: trimmed,
        password,
        options: { emailRedirectTo: `${window.location.origin}/portal/auth/callback` },
      });
      if (error) {
        setFormState("error");
        setInlineError(error.message);
        return;
      }
      // Supabase may require email confirmation; if not, session is set and we redirect
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/portal/dashboard");
        router.refresh();
      } else {
        setFormState("idle");
        setInlineError("Check your email to confirm your account, then sign in below.");
        setMode("signin");
        setPassword("");
      }
      return;
    }

    // Sign in
    const { error } = await supabase.auth.signInWithPassword({
      email: trimmed,
      password,
    });

    if (error) {
      setFormState("error");
      setInlineError(error.message);
      return;
    }

    router.push("/portal/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/5">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-7 text-center">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg ring-4 ring-primary/20">
            <span className="text-primary-foreground font-black text-2xl">S</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Supracyn Pharma</h1>
          <p className="text-slate-400 text-sm mt-0.5">Admin Portal</p>
        </div>

        {/* Body */}
        <div className="px-8 py-7 space-y-4">
          {urlError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{urlError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => { setEmail(e.target.value); setInlineError(""); }}
                placeholder="you@example.com"
                disabled={state === "loading"}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 transition"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setInlineError(""); }}
                placeholder="••••••••"
                disabled={state === "loading"}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:opacity-50 transition"
              />
              {mode === "signup" && (
                <p className="mt-1 text-xs text-slate-500">At least 6 characters</p>
              )}
            </div>

            {inlineError && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {inlineError}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading" || !email || !password}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "signup" ? "Creating account…" : "Signing in…"}
                </>
              ) : (
                <>
                  {mode === "signin" ? (
                    <>
                      <Lock className="h-4 w-4" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      Create account
                    </>
                  )}
                </>
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "signin" ? "signup" : "signin"));
              setInlineError("");
            }}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2 transition-colors"
          >
            {mode === "signin" ? "Don’t have an account? Sign up" : "Already have an account? Sign in"}
          </button>

          <p className="text-center text-xs text-slate-400 leading-relaxed flex items-center justify-center gap-1.5 pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-300" />
            Authorised administrators only. Access is logged.
          </p>
        </div>
      </div>
    </div>
  );
}
