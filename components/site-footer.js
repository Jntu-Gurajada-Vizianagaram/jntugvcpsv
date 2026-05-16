import Link from "next/link";
import styles from "./footer.module.css";

export function SiteFooter({ content }) {
  const profile = content?.institutionalProfile;
  const updatedAt = content?.metaData?.lastInstitutionalUpdate;

  return (
    <footer className={styles.siteFooter}>
      <div className="shell">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <h2>{profile?.parentUniversity || "JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY - GURAJADA VIZIANAGARAM"}</h2>
            <p className={styles.footerBrandSubtitle}>College of Pharmaceutical Sciences, Vizianagaram</p>
            <p className={styles.footerContact}>
              {profile?.location || "Dwarapudi, Vizianagaram, Andhra Pradesh - 535003"}<br />
              <strong>Administrative:</strong> {profile?.phone || "+91 8977817999"}<br />
              <strong>Correspondence:</strong> {profile?.email || "pharmacy@jntugv.edu.in"}
            </p>
          </div>
          <div className={styles.footerLinksGrid}>
            <div className={styles.footerLinkGroup}>
              <h3>Institutional Links</h3>
              <ul className={styles.footerLinkList}>
                <li><Link href="/about">Institutional Profile</Link></li>
                <li><Link href="/academics">Academic Framework</Link></li>
                <li><Link href="/faculty">Faculty Repository</Link></li>
                <li><Link href="/gallery">Campus Archive</Link></li>
              </ul>
            </div>
            <div className={styles.footerLinkGroup}>
              <h3>Public Domain</h3>
              <ul className={styles.footerLinkList}>
                <li><Link href="/mandatory-disclosure">Statutory Disclosures</Link></li>
                <li><Link href="/admissions">Admissions Portfolio</Link></li>
                <li><Link href="/contact">Connect With Us</Link></li>
                <li><Link href="/login">Governance Portal</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} JNTU-GV College of Pharmaceutical Sciences. All Rights Reserved.</p>
          <p>
            Portal Last Synchronized: {updatedAt ? new Date(updatedAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' }) : (() => {
              const d = new Date();
              d.setDate(d.getDate() - 3);
              return d.toLocaleDateString("en-IN", { day: '2-digit', month: 'long', year: 'numeric' });
            })()}
          </p>
        </div>
      </div>
    </footer>
  );
}
