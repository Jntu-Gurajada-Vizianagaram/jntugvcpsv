import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import styles from "./admissions.module.css";

export const dynamic = "force-dynamic";

export default async function AdmissionsPage() {
  noStore();
  const content = await getSiteContent();
  const { admissionKeyData, institutionalProfile } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title="Admissions Portfolio 2025-26"
        description="Prospective scholars are invited to apply to the JNTU-GV College of Pharmaceutical Sciences. Explore our specialized pharmacy programs, eligibility criteria, and standardized admission protocols."
        breadcrumbs={["Admission Desk"]}
      />
      <ContentLayout
        sidebar={
          <div className={styles.stackedSections}>
            <div className={styles.sidebarCard}>
              <span className={styles.sectionTag}>Counselling Code</span>
              <h2 className={styles.codeTitle}>{institutionalProfile.counsellingCode}</h2>
              <p className={styles.mutedText}>Utilize this institutional code during AP EAPCET/AP PGECET web counselling for statutory seat allotment.</p>
            </div>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sectionTag} style={{ width: '100%' }}>Admission Support</h3>
              <ul className={styles.supportList}>
                <li>
                  <strong className={styles.supportLabel}>Administrative Desk</strong>
                  <span className={styles.supportValue}>{institutionalProfile.phone}</span>
                </li>
                <li>
                  <strong className={styles.supportLabel}>Email Correspondence</strong>
                  <span className={styles.supportValue}>{institutionalProfile.email}</span>
                </li>
              </ul>
            </div>
          </div>
        }
      >
        <section>
          <div>
            <div className={styles.boardHead}>
              <h2 className={styles.boardTitle}>Institutional Admission Metrics</h2>
            </div>
            <div className={styles.statsStrip}>
              {admissionKeyData.map((item) => (
                <article className={styles.statCard} key={item.title}>
                  <span className={styles.statLabel}>{item.title}</span>
                  <strong className={styles.statValue}>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <article className={styles.contentCard}>
            <span className={styles.sectionTag}>Eligibility & Statutory Process</span>
            <h2 className={styles.cardTitle}>Undergraduate Admissions: Bachelor of Pharmacy</h2>
            <p className={styles.leadText}>
              Admission to the 4-year B.Pharm program is strictly regulated via the **AP EAPCET** (Engineering, Agriculture and Pharmacy Common Entrance Test) merit rankings.
            </p>
            <ul className={styles.cleanList}>
              <li><strong>Merit Ranking:</strong> Admissions are exclusively based on the rank secured in the state-conducted Common Entrance Test.</li>
              <li><strong>Academic Prerequisites:</strong> Candidates must possess a 10+2 (Intermediate) qualification with Physics, Chemistry, and Biology/Mathematics as core subjects.</li>
              <li><strong>Allotment Procedure:</strong> Seats are allocated via the State Government's centralized Web Counselling system.</li>
            </ul>
          </article>

          <article className={styles.contentCard} style={{ marginTop: '2rem' }}>
            <h3 className={styles.cardTitle}>Mandatory Documentation for Admission</h3>
            <div className={styles.featureGrid}>
              <div className={styles.miniPanel}>
                <p>• AP EAPCET Rank Card & Hall Ticket</p>
                <p>• Official Transfer Certificate (T.C.)</p>
                <p>• SSC / Equivalent Marks Memorandum</p>
              </div>
              <div className={styles.miniPanel}>
                <p>• Intermediate Marks Memorandum</p>
                <p>• Study Certificates (Grade VI to XII)</p>
                <p>• Statutory Caste & Income Certificates</p>
              </div>
            </div>
          </article>
        </section>
      </ContentLayout>
    </SiteShell>
  );
}
