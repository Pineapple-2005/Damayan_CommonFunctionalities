import Link from "next/link";
import Image from "next/image";
import styles from "./landing-page.module.css";

export function LandingPage() {
  return (
    <main className={styles.page}>
      <div className={styles.heroMedia} aria-hidden="true">
        <div className={styles.heroImage} />
        <div className={styles.heroOverlay} />
      </div>
      <div className={styles.bottomBand} aria-hidden="true" />

      <div className={styles.overlay}>
        <header className={styles.header}>
          <div className={styles.navPill}>
            <div className={styles.authHighlight} aria-hidden="true" />

            <div className={styles.logoRing} aria-hidden="true" />
            <div className={styles.logoInner} aria-hidden="true">
              <Image
                src="/logos/logo.png"
                alt="Damayan logo"
                width={58}
                height={58}
                className={styles.logoImage}
                priority
              />
            </div>

            <nav className={styles.nav} aria-label="Main navigation">
              <Link className={styles.navLink} href="/">
                Home
              </Link>
              <a className={styles.navLink} href="#about">
                About Us
              </a>
            </nav>

            <div className={styles.authNav}>
              <Link className={styles.authLink} href="/signup">
                Sign Up
              </Link>
              <Link className={styles.authLink} href="/login">
                Log In
              </Link>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          <div className={styles.heroBlock}>
            <p className={styles.intro}>
              Welcome To <strong>DAMAYAN</strong>
            </p>

            <h1 className={styles.headline}>
              Stay <span>Safe</span>, Stay <span>Informed</span>, Stay <span>United</span>.
            </h1>

            <section className={styles.aboutAnchor} id="about">
              <p className={styles.support}>
                Together, we can protect lives by ensuring timely alerts, clear reporting, and safe
                evacuations. Your vigilance today saves communities tomorrow.
              </p>
            </section>

            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/dashboard">
                View Reports
              </Link>
              <Link className={styles.secondaryAction} href="/signup">
                Report an Incident
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
