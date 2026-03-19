"use client";

import Image from "next/image";
import styles from "./account-management-screen.module.css";

type FamilyMember = {
  id: string;
  name: string;
  phone: string;
  address: string;
};

const familyMembers: FamilyMember[] = [
  { id: "1", name: "Juan Dela Cruz", phone: "09192876901", address: "21 Sct. Rivera Paco, Manila" },
  { id: "2", name: "Maria Dela Cruz", phone: "09192876902", address: "21 Sct. Rivera Paco, Manila" },
  { id: "3", name: "Pedro Dela Cruz", phone: "09192876903", address: "21 Sct. Rivera Paco, Manila" },
  { id: "4", name: "Ana Dela Cruz", phone: "09192876904", address: "21 Sct. Rivera Paco, Manila" },
];

function SectionHeader({ children }: { children: string }) {
  return <h2 className={styles.sectionHeader}>{children}</h2>;
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input type={type} placeholder={placeholder} />
    </label>
  );
}

export function AccountManagementScreen() {
  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.topBar}>
          <div className={styles.profileBlock}>
            <div className={styles.avatarWrap}>
              <Image src="/logos/logo.png" alt="Profile" width={74} height={74} className={styles.avatar} />
            </div>
            <div>
              <p className={styles.profileName}>John Doenette</p>
              <p className={styles.profileEmail}>JoeDoenette@gmail.com</p>
            </div>
          </div>
          <button className={styles.primaryBtn}>Save</button>
        </header>

        <SectionHeader>General Information</SectionHeader>
        <div className={styles.gridTwo}>
          <Field label="Full Name" placeholder="John Doenette" />
          <Field label="Gender" placeholder="Female" />
          <Field label="Date of Birth" placeholder="MM/DD/YYYY" />
          <Field label="Home Address" placeholder="21 Sct. Rivera Paco, Manila" />
        </div>

        <SectionHeader>Contact Information</SectionHeader>
        <div className={styles.gridTwo}>
          <div className={styles.withChip}>
            <Field label="Email Address" placeholder="JohnDoenette@gmail.com" type="email" />
            <button className={styles.smallChip}>+Add Email</button>
          </div>
          <div className={styles.withChip}>
            <Field label="Phone Number" placeholder="09635787333" />
            <button className={styles.smallChip}>+Add Phone Number</button>
          </div>
        </div>

        <SectionHeader>Family Management</SectionHeader>
        <div className={styles.familyGrid}>
          {familyMembers.map((member) => (
            <article className={styles.familyCard} key={member.id}>
              <Image src="/logos/logo.png" alt="Family member" width={50} height={50} className={styles.familyAvatar} />
              <div className={styles.familyInfo}>
                <div className={styles.familyTopLine}>
                  <p>{member.name}</p>
                  <span>{member.phone}</span>
                </div>
                <small>{member.address}</small>
              </div>
              <button className={styles.editIcon} aria-label={`Edit ${member.name}`}>
                Edit
              </button>
            </article>
          ))}
        </div>

        <button className={styles.addFamily}>+Add Family Member</button>

        <SectionHeader>Security</SectionHeader>
        <div className={styles.securityRow}>
          <Field label="Password" placeholder="**************" type="password" />
          <button className={styles.smallChip}>Reset Password</button>
        </div>

        <div className={styles.bottomActions}>
          <button className={styles.cancelBtn}>Cancel</button>
          <button className={styles.saveBtn}>Save</button>
        </div>
      </section>
    </main>
  );
}
