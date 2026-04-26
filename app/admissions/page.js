import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

// export default async function AdmissionsPage() {
//   noStore();
//   const content = await getSiteContent();
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
          <div className="stacked-sections">
            <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
              <span className="section-tag">Counselling Code</span>
              <h2 style={{ fontSize: "2.4rem", margin: "0.5rem 0", color: "var(--primary)", fontFamily: 'var(--font-main)' }}>{institutionalProfile.counsellingCode}</h2>
              <p className="muted" style={{ fontSize: '0.85rem' }}>Utilize this institutional code during AP EAPCET/AP PGECET web counselling for statutory seat allotment.</p>
            </div>
            <div className="sidebar-card card-institutional" style={{ padding: '1.5rem' }}>
              <h3 className="section-tag" style={{ width: '100%' }}>Admission Support</h3>
              <ul className="leader-list" style={{ listStyle: 'none', padding: 0, marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                <li>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Administrative Desk</strong>
                  <span style={{ fontWeight: 600 }}>{institutionalProfile.phone}</span>
                </li>
                <li>
                  <strong style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)' }}>Email Correspondence</strong>
                  <span style={{ fontWeight: 600 }}>{institutionalProfile.email}</span>
                </li>
              </ul>
            </div>
          </div>
        }
      >
        <section className="portal-main">
          <div className="portal-board">
            <div className="portal-board-head">
              <h2>Institutional Admission Metrics</h2>
            </div>
            <div className="stats-strip" style={{ marginTop: '1.5rem' }}>
              {admissionKeyData.map((item) => (
                <article className="stat-card card-institutional" key={item.title} style={{ padding: '1.5rem' }}>
                  <span style={{ color: 'var(--accent)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>{item.title}</span>
                  <strong style={{ display: 'block', fontSize: '1.5rem', color: 'var(--primary)', marginTop: '0.5rem' }}>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <article className="content-card-block card-institutional" style={{ padding: '2.5rem', marginTop: '3rem' }}>
            <span className="section-tag">Eligibility & Statutory Process</span>
            <h2 style={{ fontSize: '1.8rem', marginTop: '1rem' }}>Undergraduate Admissions: Bachelor of Pharmacy</h2>
            <p className="lead" style={{ margin: '1rem 0' }}>
              Admission to the 4-year B.Pharm program is strictly regulated via the **AP EAPCET** (Engineering, Agriculture and Pharmacy Common Entrance Test) merit rankings.
            </p>
            <ul className="clean-list" style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem', borderLeft: '3px solid var(--accent)', paddingLeft: '1.5rem' }}>
              <li><strong>Merit Ranking:</strong> Admissions are exclusively based on the rank secured in the state-conducted Common Entrance Test.</li>
              <li><strong>Academic Prerequisites:</strong> Candidates must possess a 10+2 (Intermediate) qualification with Physics, Chemistry, and Biology/Mathematics as core subjects.</li>
              <li><strong>Allotment Procedure:</strong> Seats are allocated via the State Government's centralized Web Counselling system.</li>
            </ul>
          </article>

          <article className="content-card-block card-institutional" style={{ padding: '2.5rem', marginTop: '2rem' }}>
            <h3>Mandatory Documentation for Admission</h3>
            <div className="feature-grid two-col" style={{ marginTop: "1.5rem", display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="mini-panel" style={{ padding: '1.5rem', background: 'var(--bg-soft)', borderRadius: '12px', fontSize: '0.9rem' }}>
                <p>• AP EAPCET Rank Card & Hall Ticket</p>
                <p>• Official Transfer Certificate (T.C.)</p>
                <p>• SSC / Equivalent Marks Memorandum</p>
              </div>
              <div className="mini-panel" style={{ padding: '1.5rem', background: 'var(--bg-soft)', borderRadius: '12px', fontSize: '0.9rem' }}>
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
