import Link from "next/link";
import Image from "next/image";
import { unstable_noStore as noStore } from "next/cache";
import { getSiteContent } from "@/lib/cms";
import { SiteShell } from "@/components/site-shell";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  noStore();

  const content = await getSiteContent();
  const {
    institutionalProfile,
    admissionKeyData,
    institutionalNotices,
    universityLeadership,
    academicPrograms,
    institutionalGallery
  } = content;

  return (
    <SiteShell content={content}>
      <main>
        {/* Sleek News Marquee */}
        <div className={styles.glassPanel}>
          <div className="shell flash-container">
            <span className={`flash-label ${styles.pulseDot}`}>Statutory Bulletins</span>
            <div className="marquee-wrapper">
              <div className="marquee-text">
                {institutionalNotices.map((n, i) => (
                  <span key={i} className={styles.marqueeItem}>
                    <span className={styles.marqueeBullet}>•</span> {n.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Hero Section */}
        <section className={styles.heroPremium}>
          <div className={`shell ${styles.heroGridPremium}`}>
            <div className="hero-content">
              <div className={styles.heroBadge}>Established 2025 • PCI Approved</div>
              <h1 className={styles.heroTitle}>
                <span className={styles.textGradient}>JNTU-GV College of</span>
                <br /> Pharmaceutical Sciences
              </h1>
              <p className={styles.heroLead}>
                Elevating Pharmaceutical Education, Scholarly Research, and Clinical Practice. A constituent college of {institutionalProfile.parentUniversity}, committed to academic integrity and healthcare innovation.
              </p>
              <div className={styles.heroActions}>
                <Link href="/admissions" className={`button button-primary ${styles.buttonLg}`}>
                  Explore Admissions
                </Link>
                <Link href="/mandatory-disclosure" className={`button button-outline ${styles.buttonLg}`}>
                  Statutory Disclosures
                </Link>
              </div>
            </div>
            
            <div className={styles.heroVisual}>
              <div className={styles.heroImageWrapper}>
                <Image
                  src="/gallery/pharmacy-campus.jpeg"
                  alt="Campus View"
                  width={600}
                  height={450}
                  priority
                  className={styles.heroImg}
                />
                <div className={styles.heroFloatingCard}>
                  <span className={`${styles.textGradient} ${styles.fontBold}`}>EAPCET Code</span>
                  <strong>JNVPSF</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Affiliations Row */}
        <section className={`section ${styles.affiliationsSection}`}>
          <div className="shell">
            <div className={styles.affiliationCardsRow}>
              {[
                { name: "Pharmacy Council of India", label: "Approved Institution", icon: "⚕️" },
                { name: "JNTU-GV", label: "Constituent College", icon: "🏛️" },
                { name: "UGC", label: "Recognized Status", icon: "🎓" },
              ].map((item, index) => (
                <div key={index} className={`${styles.affiliationCardPremium} ${styles.hoverLift}`}>
                  <div className={styles.iconWrapper}>{item.icon}</div>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Principal's Desk - Dark Premium Mode */}
        <section className={`section ${styles.principalDarkSection}`}>
          <div className="shell">
            <div className={styles.principalDarkGrid}>
              <div className={styles.principalImageContainer}>
                <Image
                  src="/profiles/Dr.K.Atchuta Kumar.jpg"
                  alt="Principal"
                  width={350}
                  height={450}
                  className={styles.principalPortraitPremium}
                />
                <div className={styles.principalNameplate}>
                  <strong>Dr. K. Atchuta Kumar</strong>
                  <span>Principal In-Charge</span>
                </div>
              </div>
              <div className={styles.principalDarkContent}>
                <span className={styles.accentTag}>Leadership Vision</span>
                <h2>Transforming Pharmaceutical Healthcare</h2>
                <blockquote className={styles.premiumQuote}>
                  "Our mission is to foster a transformative learning environment where academic excellence meets ethical clinical practice."
                </blockquote>
                <p>
                  At the College of Pharmaceutical Sciences, we provide a multidisciplinary curriculum that integrates theoretical rigor with advanced practical inquiry. Our goal is to empower the next generation of pharmacists with the skills necessary to excel in the global healthcare ecosystem.
                </p>
                <Link href="/principal" className={`${styles.textLinkGold} ${styles.mt4}`}>
                  Read Full Message <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Information Portal: Notices & Events */}
        <section className={`section ${styles.bgSoft}`}>
          <div className={`shell ${styles.portalSplit}`}>
            {/* Left: Notices */}
            <div className={styles.portalColumn}>
              <div className={styles.sectionHeadingRow}>
                <h2>Institutional Notices</h2>
                <Link href="/notices" className="text-link">View All</Link>
              </div>
              <div className={styles.noticeBoardPremium}>
                {institutionalNotices.slice(0, 4).map((notice, index) => (
                  <Link href="/notices" key={index} className={`${styles.noticeItemPremium} ${styles.hoverLift}`}>
                    <div className={styles.noticeDateBadge}>
                      <span className={styles.month}>Update</span>
                    </div>
                    <div className={styles.noticeContent}>
                      <h3>{notice.title}</h3>
                      <p className={styles.lineClamp2}>{notice.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Gallery/Events */}
            <div className={styles.portalColumn}>
              <div className={styles.sectionHeadingRow}>
                <h2>Campus Life & Events</h2>
                <Link href="/gallery" className="text-link">View Gallery</Link>
              </div>
              <div className={styles.eventGridPremium}>
                {institutionalGallery.slice(0, 2).map((event, i) => (
                  <div key={i} className={`${styles.eventCardPremium} ${styles.hoverLift}`}>
                    <div className={styles.eventImageWrap}>
                      <Image src={event.image} alt={event.title} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div className={styles.eventOverlay}>
                      <span className={styles.eventCategory}>{event.category}</span>
                      <h4>{event.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Stats/Links grid below events */}
              <div className={`${styles.quickStatsGrid} ${styles.mt6}`}>
                {admissionKeyData.map((item, i) => (
                  <div key={i} className={styles.statCardPremium}>
                    <span className={styles.statLabel}>{item.title}</span>
                    <span className={styles.statValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Management Section */}
        <section className="section">
          <div className="shell">
            <div className="section-heading text-center">
              <span className="section-tag">University Governance</span>
              <h2>Leadership & Statutory Administration</h2>
              <div className={styles.headingUnderline}></div>
            </div>
            
            <div className="leadership-grid">
              {universityLeadership.map((leader, i) => (
                <article key={i} className="leader-card-box">
                  <div className="leader-photo-wrap">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={120}
                      height={120}
                      unoptimized={leader.image.startsWith("http")}
                    />
                  </div>
                  <span className="role-tag">{leader.role}</span>
                  <h3>{leader.name}</h3>
                  <p className="muted">{leader.detail}</p>
                </article>
              ))}
            </div>
            <div className={`text-center ${styles.marginTopLg}`}>
              <Link href="/administration" className="button button-outline">Examine Full Academic Senate</Link>
            </div>
          </div>
        </section>

        {/* Explore Portfolio */}
        <section className={`section ${styles.programsSection}`}>
          <div className="shell">
            <div className="section-heading text-center">
              <span className="section-tag">Academic Excellence</span>
              <h2>Our Academic Programs</h2>
              <div className={styles.headingUnderline}></div>
            </div>
            
            <div className={`${styles.programsGrid} ${styles.marginTopLg}`}>
              {academicPrograms.map((prog, i) => (
                <div key={i} className={`${styles.programCard} ${styles.hoverLift}`}>
                  <div className={styles.programIcon}>🎓</div>
                  <h3>{prog.name}</h3>
                  <p className={styles.duration}>{prog.duration}</p>
                  <p className="muted">{prog.note}</p>
                  <div className={styles.programStatus}>{prog.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

