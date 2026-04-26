import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { getSiteContent } from "@/lib/cms";
import { SiteShell } from "@/components/site-shell";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  noStore();

  const content = await getSiteContent();
  const {
    institutionalProfile,
    admissionKeyData,
    institutionalNotices,
    universityLeadership,
    institutionalDirectory,
    quickLinks,
    metaData
  } = content;

  return (
    <SiteShell content={content}>
      <main>
        {/* News Marquee */}
        <div className="flash-news-bar card-institutional">
          <div className="shell flash-container">
            <span className="flash-label">Statutory Bulletins</span>
            <div className="marquee-wrapper">
              <div className="marquee-text">
                {institutionalNotices.map((n, i) => (
                  <span key={i}>• {n.title} &nbsp;&nbsp;&nbsp;</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="landing-hero">
          <div className="shell landing-grid">
            <div className="landing-main">
              <h1>JNTU-GV College of Pharmaceutical Sciences</h1>
              <p className="lead">
                Elevating Pharmaceutical Education, Scholarly Research, and Clinical Practice. A constituent college of {institutionalProfile.parentUniversity}, committed to academic integrity and healthcare innovation.
              </p>
            </div>

            <aside className="landing-side">
              <div className="mini-panel contact-summary-panel card-institutional">
                <span className="section-tag">Institutional Profile</span>
                <ul className="leader-list">
                  <li>
                    <strong>UGC Identity</strong>
                    <span>{institutionalProfile.status}</span>
                  </li>
                  <li>
                    <strong>Parent University</strong>
                    <span style={{ fontSize: '0.85rem' }}>{institutionalProfile.parentUniversity}</span>
                  </li>
                  <li>
                    <strong>PCI Approval Status</strong>
                    <span>{institutionalProfile.approvals}</span>
                  </li>
                  <li>
                    <strong>Residential Support</strong>
                    <span>{institutionalProfile.hostel}</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* Affiliations & Accreditations */}
        <section className="section section-tight bg-muted">
          <div className="shell">
            <div className="affiliation-grid">
              {[
                { name: "PCI", label: "Pharmacy Council of India", icon: "💊" },
                { name: "JNTU-GV", label: "University Affiliation", icon: "🏛️" },
                // { name: "HEI", label: "Higher Education Institute", icon: "🎓" },
              ].map((item, index) => (
                <div key={index} className="affiliation-item">
                  <span style={{ fontSize: "2rem" }}>{item.icon}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span className="muted">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principal's Desk */}
        <section className="section">
          <div className="shell">
            <div className="content-card-block card-institutional">
              <div className="split-info" style={{ display: "grid", gridTemplateColumns: "minmax(auto, 280px) 1fr", gap: "3rem", alignItems: "center" }}>
                <div className="principal-portrait">
                  <Image
                    src="/profiles/Dr.K.Atchuta Kumar.jpg"
                    alt="Principal"
                    width={280}
                    height={340}
                    style={{ borderRadius: "16px", objectFit: "cover", boxShadow: "var(--shadow)" }}
                  />
                </div>
                <div>
                  <span className="section-tag">From the Principal's Desk</span>
                  <h2 style={{ fontSize: "2rem", margin: "0.5rem 0" }}>Visionary Leadership</h2>
                  <p className="lead" style={{ fontSize: "1.1rem", fontStyle: "italic", color: "var(--navy)" }}>
                    "Our mission is to foster a transformative learning environment where academic excellence meets ethical clinical practice."
                  </p>
                  <p style={{ margin: "1rem 0" }}>
                    At the College of Pharmaceutical Sciences, we provide a multidisciplinary curriculum that integrates theoretical rigor with advanced practical inquiry. Our goal is to empower the next generation of pharmacists with the skills necessary to excel in the global healthcare ecosystem.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
                    <Link href="/principal" className="button button-primary">Examine Vision Statement</Link>
                    <div>
                      <strong style={{ display: "block" }}>Dr. K. Atchuta Kumar</strong>
                      <span className="muted" style={{ fontSize: "0.85rem" }}>Principal In-Charge, JNTU-GV CPSV</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notice Board & Portal Side */}
        <section className="section section-alt">
          <div className="shell portal-layout">
            <div className="portal-main">
              <div className="portal-board">
                <div className="portal-board-head">
                  <h2>Institutional Notices & Bulletins</h2>
                  <Link href="/notices" className="text-link">
                    Archives Repository →
                  </Link>
                </div>
                <div className="scrolling-notice-container">
                  <div className="compact-list notice-scroll">
                    {institutionalNotices.length > 0 ? (
                      [...institutionalNotices, ...institutionalNotices].map((notice, index) => (
                        <article key={`${notice.title}-${index}`}>
                          <span className="notice-pill">{notice.date}</span>
                          <h3>{notice.title}</h3>
                          <p>{notice.summary}</p>
                        </article>
                      ))
                    ) : (
                      <p className="muted">Pending current announcements.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Latest Events */}
              <div className="events-grid-block margin-top">
                <div className="section-heading-compact">
                  <h2>Academic & Cultural Events</h2>
                  <Link href="/gallery" className="text-link">Examine Gallery</Link>
                </div>
                <div className="event-cards">
                  {content.institutionalGallery.slice(0, 3).map((event, i) => (
                    <article key={i} className="event-card-mini">
                      <div className="event-img">
                        <Image src={event.image} alt={event.title} width={300} height={200} style={{ objectFit: "cover" }} />
                      </div>
                      <div className="event-info">
                        <span className="event-cat">{event.category}</span>
                        <h4>{event.title}</h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <aside className="portal-side">
                  <h3 className="aside-title">Governance & Compliance</h3>
                  <div className="quick-access-grid">
                    {[
                      { label: "Statutory Disclosures", href: "/mandatory-disclosure" },
                      { label: "PCI Regulatory Compliance", href: "/mandatory-disclosure" },
                      { label: "Anti-Ragging Ombudsman", href: "/student-support" },
                      { label: "Grievance Redressal Cell", href: "/student-support" },
                      { label: "Academic Audit Reports", href: "/academics" },
                      { label: "Institutional Notifications", href: "/notices" }
                    ].map((item, index) => (
                      <Link href={item.href} className="quick-access-card" key={`${item.label}-${index}`}>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="stats-strip">
                    {admissionKeyData.map((item, index) => (
                      <article className="stat-card" key={`${item.title}-${index}`}>
                        <span>{item.title}</span>
                        <strong>{item.value}</strong>
                      </article>
                    ))}
                  </div> */}

        {/* <div className="video-spotlight card-institutional">
                <span className="section-tag">Campus Visualized</span>
                <div className="video-thumb">
                  <div className="video-play-hint">
                    <span>▶ Documentary: Institutional Excellence</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section> */}

        {/* Top Management Section */}
        <section className="section">
          <div className="shell">
            <div className="section-heading text-center">
              <span className="section-tag">University Governance</span>
              <h2>Leadership & Statutory Administration</h2>
            </div>
            <div className="leadership-grid">
              {universityLeadership.map((leader, i) => (
                <article key={i} className="leader-card-box">
                  <div className="leader-title-wrap">
                    <img src={leader.image} alt={leader.name} />
                    <span className="role-tag">{leader.role}</span>
                    <h3>{leader.name}</h3>
                    <p className="muted">{leader.detail}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="text-center margin-top">
              <Link href="/administration" className="button button-outline">Examine Full Academic Senate</Link>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="shell">
            <div className="section-heading">
              <div>
                <span className="section-tag">Explore Portfolio</span>
                <h2>Academic & Research Ecosystem</h2>
              </div>
              <p>
                The institution is anchored by three fundamental pillars: Pedagogical Excellence, Innovative Research, and Scholarly Discipline.
              </p>
            </div>
          </div>
        </section>
      </main>
    </SiteShell >
  );
}
