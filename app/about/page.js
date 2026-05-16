import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./about.module.css";

export const dynamic = "force-dynamic";

const sidebarLinks = [
  { label: "Regulatory Disclosures", href: "/mandatory-disclosure" },
  { label: "Admissions Desk", href: "/admissions" },
  { label: "Faculty Roster", href: "/faculty" },
  { label: "Student Welfare", href: "/student-support" },
  { label: "Academic Facilities", href: "/facilities" },
  { label: "Connect with Us", href: "/contact" },
  { label: "Library & Resources", href: "/facilities" }
];

export default async function AboutPage() {
  noStore();
  const content = await getSiteContent();
  const { institutionalProfile, institutionalDirectory } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Institutional Portfolio"
        description="A comprehensive overview of our vision, mission, and the statutory identity of the JNTU-GV College of Pharmaceutical Sciences."
        breadcrumbs={["Institutional Profile"]}
      />
      
      <main className="section">
        <div className="shell">
          <div className={styles.layoutGrid}>
            <aside>
              <div className={styles.sidebarCard}>
                <span className={styles.sidebarTitle}>Academic Navigation</span>
                <ul className={styles.linkList}>
                  {sidebarLinks.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className={styles.linkItem}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className={styles.mainContent}>
              <article className={styles.narrativeCard}>
                <h2 className={styles.sectionTitle}>Institutional Narrative</h2>
                <p className={styles.leadText}>{institutionalProfile.about}</p>
                <p className={styles.subText}>{institutionalProfile.websiteNorms}</p>
              </article>

              <div className={styles.visionMissionGrid}>
                <article className={styles.vmCard} style={{ borderLeft: '4px solid var(--accent)' }}>
                  <div className={styles.vmIcon}>👁️</div>
                  <h3 className={styles.vmTitle}>Institutional Vision</h3>
                  <p className={styles.visionText}>"{institutionalProfile.vision}"</p>
                </article>
                <article className={styles.vmCard} style={{ borderLeft: '4px solid var(--primary-deep)' }}>
                  <div className={styles.vmIcon}>🎯</div>
                  <h3 className={styles.vmTitle}>Institutional Mission</h3>
                  <p className={styles.missionText}>{institutionalProfile.mission}</p>
                </article>
                <article className={styles.identityCard}>
                  <h3 className={styles.identityTitle}>Statutory Identity & Accreditation</h3>
                  <div className={styles.identityMain}>
                    <span>{institutionalProfile.status}</span>
                    <span className={styles.identityDivider}>|</span>
                    <span>{institutionalProfile.approvals}</span>
                  </div>
                  <p className={styles.identityLocation}>
                    Operational Campus: {institutionalProfile.location}
                  </p>
                </article>
              </div>

              <article className={styles.narrativeCard}>
                <h2 className={styles.sectionTitle}>Governance & Academic Divisions</h2>
                <div className={styles.divisionsGrid}>
                  {institutionalDirectory.map((item) => (
                    <div className={styles.divisionCard} key={item.title}>
                      <h3 className={styles.divisionTitle}>{item.title}</h3>
                      <p className={styles.divisionDesc}>{item.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
