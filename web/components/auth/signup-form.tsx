"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import styles from "./signup-form.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm() {
  const router = useRouter();
  const { signup, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "file", string>>>({});

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setErrors((current) => ({ ...current, file: undefined }));
  };

  const validate = () => {
    const nextErrors: typeof errors = {};

    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (!form.birthDate.trim()) nextErrors.birthDate = "Date of birth is required.";
    if (form.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    if (!selectedFile) nextErrors.file = "Verification file is required.";

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
      await signup(form.name.trim(), form.email.trim(), form.password);
      logout();
      router.push("/signup/review");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Unable to create account.");
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
            width={56}
            height={56}
            className={styles.logoImage}
            priority
          />
        </div>

        <div className={styles.card}>
          <h1 className={styles.title}>Sign Up &amp; Verify</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.grid}>
              <div className={styles.formColumn}>
                <label className={styles.field}>
                  <span className={styles.label}>Email Address*</span>
                  <input
                    className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, email: event.target.value }))
                    }
                    type="email"
                  />
                  {errors.email ? <span className={styles.error}>{errors.email}</span> : null}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Full Name*</span>
                  <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    type="text"
                  />
                  {errors.name ? <span className={styles.error}>{errors.name}</span> : null}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Phone Number*</span>
                  <input
                    className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                    value={form.phone}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, phone: event.target.value }))
                    }
                    type="tel"
                  />
                  {errors.phone ? <span className={styles.error}>{errors.phone}</span> : null}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Date of Birth* (mm/dd/yyyy)</span>
                  <input
                    className={`${styles.input} ${errors.birthDate ? styles.inputError : ""}`}
                    value={form.birthDate}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, birthDate: event.target.value }))
                    }
                    placeholder="mm/dd/yyyy"
                    type="text"
                  />
                  {errors.birthDate ? (
                    <span className={styles.error}>{errors.birthDate}</span>
                  ) : null}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Password*</span>
                  <input
                    className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                    value={form.password}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, password: event.target.value }))
                    }
                    type="password"
                  />
                  {errors.password ? <span className={styles.error}>{errors.password}</span> : null}
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Confirm Password*</span>
                  <input
                    className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                    value={form.confirmPassword}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, confirmPassword: event.target.value }))
                    }
                    type="password"
                  />
                  {errors.confirmPassword ? (
                    <span className={styles.error}>{errors.confirmPassword}</span>
                  ) : null}
                </label>
              </div>

              <div className={styles.verifyColumn}>
                <div className={styles.verifyLabel}>
                  Upload Files for Verification<span className={styles.required}>*</span>
                </div>

                <div className={styles.uploadCard}>
                  <div className={styles.uploadIcon} aria-hidden="true">
                    ^
                  </div>
                  <p className={styles.uploadTitle}>Drop your ID here or click to browse</p>
                  <p className={styles.uploadSub}>Supported formats: JPG, PNG, PDF (Max 10MB)</p>

                  <button
                    className={styles.browseButton}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </button>

                  <input
                    ref={fileInputRef}
                    className={styles.fileInput}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileChange}
                  />

                  {selectedFile ? <div className={styles.fileName}>{selectedFile.name}</div> : null}
                </div>

                {errors.file ? <div className={styles.banner + " " + styles.errorBanner}>{errors.file}</div> : null}
                {serverError ? (
                  <div className={styles.banner + " " + styles.errorBanner}>{serverError}</div>
                ) : null}
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.submit} type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create an Account"}
              </button>

              <p className={styles.footer}>
                Already have an account? <Link href="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
