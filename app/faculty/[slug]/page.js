import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ContentLayout } from "@/components/content-layout";
import { PageHero } from "@/components/page-hero";
import { SiteShell } from "@/components/site-shell";
import { getSiteContent } from "@/lib/cms";
import { enrichFaculty } from "@/lib/content-helpers";

export const dynamic = "force-dynamic";

export default async function FacultyDetailPage({ params }) {
  noStore();
  const { slug } = await params;
  const content = await getSiteContent();
  const allFaculty = enrichFaculty(content.faculty);
  const profile = allFaculty.find((member) => member.slug === slug);

  if (!profile) {
    notFound();
  }

  const { downloads } = content;

  return (
    <SiteShell content={content}>
      <PageHero
        title={profile.name}
        description={`${profile.designation} in ${profile.department}`}
        breadcrumbs={["Faculty", profile.name]}
      />
      <ContentLayout
        sidebar={
          <div className="stacked-sections">
            <div className="sidebar-card card-institutional">
              <span className="section-tag">Quick Contact</span>
              <div style={{ marginTop: "1rem" }}>
                <p style={{ fontSize: "0.85rem", wordBreak: "break-all" }}>
                  <strong>Email:</strong><br />
                  <a href={`mailto:${profile.email}`} className="text-link">{profile.email}</a>
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <span className="status-badge" style={{ padding: "0.25rem 0.5rem", borderRadius: "6px", background: "var(--gold-soft)", fontSize: "0.75rem", fontWeight: "700" }}>
                    {profile.experience.split(' ')[0]} Years+ Exp.
                  </span>
                </div>
              </div>
            </div>
            
            <div className="sidebar-card">
              <h3>Faculty Directory</h3>
              <ul className="link-list">
                {allFaculty.map((member) => (
                  <li key={member.slug}>
                    <Link href={`/faculty/${member.slug}`} className={slug === member.slug ? "active" : ""}>
                      {member.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-card">
              <h3>Academic Downloads</h3>
              <ul className="link-list">
                {downloads.slice(0, 3).map((item) => (
                  <li key={item.title}>
                    <a href={item.file} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      >
        <section className="portal-main">
          <div className="portal-board">
            <div className="profile-detail-grid" style={{ display: "grid", gridTemplateColumns: "minmax(auto, 320px) 1fr", gap: "3rem" }}>
              <div className="profile-portrait-wrap">
                <Image 
                   src={profile.image || "/placeholder-faculty.jpg"} 
                   alt={profile.name} 
                   width={420} 
                   height={520} 
                   style={{ borderRadius: "16px", objectFit: "cover", boxShadow: "var(--shadow)" }}
                />
              </div>
              <div className="profile-info-content">
                <span className="notice-pill">{profile.designation}</span>
                <h2 style={{ fontSize: "2.5rem", margin: "0.5rem 0", color: "var(--primary-deep)" }}>{profile.name}</h2>
                <p style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--primary)" }}>{profile.department}</p>
                
                <div className="stats-strip" style={{ margin: "2rem 0" }}>
                   <article className="stat-card">
                      <span>Total Experience</span>
                      <strong>{profile.experience}</strong>
                   </article>
                </div>

                <div className="content-card-block" style={{ padding: 0, border: "none", boxShadow: "none" }}>
                   <h3>Professional Statement</h3>
                   <p style={{ lineHeight: "1.8", color: "var(--muted)" }}>{profile.profile}</p>
                </div>

                <div className="info-grid two-col" style={{ marginTop: "2rem" }}>
                   <div className="mini-panel">
                      <h4>Research Areas</h4>
                      <ul className="clean-list" style={{ fontSize: "0.9rem" }}>
                         <li>Pharmaceutical Formulations</li>
                         <li>Drug Delivery Systems</li>
                         <li>Clinical Research & Safety</li>
                      </ul>
                   </div>
                   <div className="mini-panel">
                      <h4>Qualifications</h4>
                      <ul className="clean-list" style={{ fontSize: "0.9rem" }}>
                         <li>Ph.D. in Pharmaceutical Sciences</li>
                         <li>M.Pharmacy (Rank Holder)</li>
                         <li>Registered Pharmacist</li>
                      </ul>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <article className="content-card-block card-institutional" style={{ marginTop: "3rem" }}>
             <h3>Institutional Responsibility</h3>
             <p>
                As a member of the {profile.department} at JNTU-GV College of Pharmaceutical Sciences, {profile.name} is dedicated to maintaining high academic records and fostering a research-centric environment for all pharmacy aspirants.
             </p>
          </article>
        </section>
      </ContentLayout>
    </SiteShell>
  );
}
