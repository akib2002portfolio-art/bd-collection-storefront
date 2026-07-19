import { useState, type FormEvent } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

interface AdminLoginFormProps {
  onSuccess?: () => void;
}

export function AdminLoginForm({ onSuccess }: AdminLoginFormProps) {
  const { login, loading } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    try {
      const result = await login(email, password);

      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-sm border border-hairline bg-canvas p-10 shadow-sm">
        <p className="eyebrow text-center">
          BD Collection CMS
        </p>

        <h1 className="mt-2 text-center font-display text-3xl text-ink">
          Administrator Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >
          <label className="block">
            <span className="eyebrow">
              Email
            </span>

            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-hairline bg-transparent py-3 text-ink outline-none transition-colors focus:border-ink disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="eyebrow">
              Password
            </span>

            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-b border-hairline bg-transparent py-3 text-ink outline-none transition-colors focus:border-ink disabled:cursor-not-allowed disabled:opacity-50"
            />
          </label>

          {error && (
            <p className="text-xs uppercase tracking-[0.22em] text-sienna">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em]">
            <label className="flex items-center gap-2 text-taupe">
              <input
                type="checkbox"
                checked={rememberMe}
                disabled={loading}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 border border-hairline accent-ink disabled:cursor-not-allowed disabled:opacity-50"
              />

              Remember me
            </label>

            <button
              type="button"
              disabled={loading}
              className="text-taupe transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full bg-ink text-xs uppercase tracking-[0.22em] text-canvas transition-colors hover:bg-sienna disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}