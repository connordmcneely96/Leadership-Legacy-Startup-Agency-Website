"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    router.replace("/dashboard");
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "Invalid email or password");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-navy-dark to-navy flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,39,0.12),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(52,152,219,0.1),transparent_25%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-navy" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Leadership Legacy
            </span>
            <span className="text-xs text-muted-foreground -mt-0.5">
              Digital Solutions
            </span>
          </div>
        </Link>

        {/* Login Card */}
        <div className="bg-navy-light/60 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-semibold text-foreground text-center mb-2">
            Sign In
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-8">
            Enter your credentials to access the dashboard
          </p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-navy/60 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-2.5 bg-navy/60 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-gold text-navy font-medium rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Back link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">
            Back to website
          </Link>
        </p>
      </div>
    </main>
  );
}
