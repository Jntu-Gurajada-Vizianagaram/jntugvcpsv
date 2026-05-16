"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getSectionNav, navGroups, publicNav, utilityLinks } from "@/lib/navigation";
import styles from "./header.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const sectionNav = getSectionNav(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ""}`}>
      {/* Top Utility Strip */}
      <div className={styles.topStrip}>
        <div className={`shell ${styles.topStripInner}`}>
          <div className={styles.utilityLinkRow}>
            {utilityLinks.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.topStripNote}>
            <Link href="/downloads/JNTU-GV%20PCI%20APPROVAL%202025-26.pdf" target="_blank" className={styles.topBadgeLink}>
              📜 PCI Approval Letter
            </Link>
            <span className={styles.separator}>|</span>
            <Link href="/mandatory-disclosure" className={styles.topBadgeLink}>
              🏛️ Affiliation Letter
            </Link>
            <span className={styles.separator}>|</span>
            <span>EAPCET Code: JNVPSF</span>
          </div>
        </div>
      </div>

      {/* Premium Institutional Masthead */}
      <div className={styles.masthead}>
        <div className="shell">
          <div className={styles.vLogo}>
            {/* Left Logo */}
            <Link href="/" className={styles.logoImg}>
              <Image
                src="/logo512.png"
                alt="JNTU-GV Pharmacy Logo"
                width={100}
                height={100}
                priority
              />
            </Link>

            {/* Center Content */}
            <div className={styles.logoContent}>
              <h2 className={styles.collegeTitle}>JNTU-GV COLLEGE OF PHARMACEUTICAL SCIENCES, VIZIANAGARAM</h2>
              <h3 className={styles.universitySubtitle}>JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY - GURAJADA VIZIANAGARAM</h3>
              <p className={styles.addressLine}>DWARAPUDI, VIZIANAGARAM, ANDHRA PRADESH - 535 003.</p>
              <p className={styles.constituentLine}>
                ( A Constituent College of JNTU-GV & Approved by PCI, New Delhi )
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={styles.navBarWrap}>
        <div className={`shell ${styles.navInner}`}>
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close Menu" : "☰ Menu"}
          </button>

          <nav className={`${styles.mainNav} ${open ? styles.open : ""}`}>
            <div className={styles.desktopLinks}>
              {publicNav.slice(0, 7).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navLink} ${pathname === item.href ? styles.active : ""}`}
                >
                  {item.label}
                </Link>
              ))}

              <div className={styles.navDropdown}>
                <button className={styles.dropdownTrigger}>More +</button>
                <div className={styles.dropdownContent}>
                  {publicNav.slice(7).map((item) => (
                    <Link key={item.label} href={item.href} className={styles.dropdownLink}>{item.label}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.navActions}>
              <Link href="/admissions" className={styles.navCta}>Admissions 2025</Link>
              <Link href="/login" className={styles.navAuth}>CMS Portal</Link>
            </div>

            <div className={styles.mobileNavContent}>
              {navGroups.map((group) => (
                <div className={styles.mobileGroup} key={group.label}>
                  <button
                    className={`${styles.mobileTrigger} ${openGroup === group.label ? styles.active : ""}`}
                    onClick={() => setOpenGroup(current => current === group.label ? "" : group.label)}
                  >
                    {group.label}
                    <span>{openGroup === group.label ? "−" : "+"}</span>
                  </button>
                  <div className={`${styles.mobilePanel} ${openGroup === group.label ? styles.open : ""}`}>
                    {group.items.map(item => (
                      <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

    </header>
  );
}
