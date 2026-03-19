"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import styles from "./login-form.module.css";

type FormState = {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
};

const REMEMBERED_EMAIL_KEY = "damayan-web-remembered-email";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const remembered = window.localStorage.getItem(REMEMBERED_EMAIL_KEY);

    if (!remembered) {
      return;
    }

    setForm((current) => ({
      ...current,
      email: remembered,
      rememberMe: true,
    }));
  }, []);

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(form.email.trim(), form.password);

      if (form.rememberMe) {
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, form.email.trim());
      } else {
        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }

      router.push("/dashboard");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to log in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true" />

      <section className={styles.shell}>
        <div className={styles.logoRing} aria-hidden="true" />
        <div className={styles.logoInner} aria-hidden="true">
          <Image
            src="/logos/logo.png"
            alt="Damayan logo"
            width={64}
            height={64}
            className={styles.logoImage}
            priority
          />
        </div>

        <div className={styles.card}>
          <header className={styles.header}>
            <p className={styles.welcome}>Welcome to</p>
            <h1 className={styles.brand}>DAMAYAN</h1>
            <p className={styles.title}>LOGIN</p>
            <p className={styles.subtitle}>Use demo credentials: demo@damayan.app / password123</p>
          </header>

          {serverError ? (
            <div className={`${styles.alert} ${styles.alertError}`} role="alert">
              {serverError}
            </div>
          ) : null}

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <input
                className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => {
                  setForm((current) => ({ ...current, email: event.target.value }));
                  if (errors.email) {
                    setErrors((current) => ({ ...current, email: undefined }));
                  }
                }}
                autoComplete="email"
              />
              {errors.email ? <span className={styles.error}>{errors.email}</span> : null}
            </div>

            <div className={styles.field}>
              <div className={`${styles.passwordBox} ${errors.password ? styles.inputError : ""}`}>
                <input
                  className={styles.passwordInput}
                  type={form.showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, password: event.target.value }));
                    if (errors.password) {
                      setErrors((current) => ({ ...current, password: undefined }));
                    }
                  }}
                  autoComplete="current-password"
                />
                <button
                  className={styles.toggle}
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      showPassword: !current.showPassword,
                    }))
                  }
                >
                  {form.showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password ? <span className={styles.error}>{errors.password}</span> : null}
            </div>

            <div className={styles.forgotRow}>
              <label className={styles.rememberRow}>
                <input
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      rememberMe: event.target.checked,
                    }))
                  }
                />
                <span>Remember me</span>
              </label>

              <Link className={styles.forgot} href="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button className={styles.submit} type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className={styles.divider}>OR</div>

          <div className={styles.socialRow}>
            <div className={styles.socialButton}>
              <Image src="/icons/google.png" alt="Google" width={22} height={22} />
            </div>
            <div className={styles.socialButton}>
              <Image src="/icons/apple.png" alt="Apple" width={24} height={24} />
            </div>
            <div className={styles.socialButton}>
              <Image src="/icons/facebook.png" alt="Facebook" width={20} height={20} />
            </div>
          </div>

          <p className={styles.footer}>
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
