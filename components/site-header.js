"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getSectionNav, navGroups, publicNav, utilityLinks } from "@/lib/navigation";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState("Institution");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const sectionNav = getSectionNav(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setOpen(false);
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      {/* Top Utility Strip */}
      <div className="top-strip">
        <div className="shell top-strip-inner">
          <div className="utility-link-row">
            {utilityLinks.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="top-strip-note">
            <span>PCI Approved</span>
            <span className="separator">|</span>
            <span>EAPCET Code: JNVPSF</span>
          </div>
        </div>
      </div>

      {/* Premium Institutional Masthead */}
      <div className="masthead">
        <div className="shell masthead-inner">
          <div className="v_logo">
            {/* Left Logo */}
            <Link href="/" className="logo_img">
              <Image
                src="/logo512.png"
                alt="JNTU-GV Pharmacy Logo"
                width={100}
                height={100}
                priority
              />
            </Link>

            {/* Center Content */}
            <div className="logo_content">
              <h2 className="college_title">JNTU-GV COLLEGE OF PHARMACEUTICAL SCIENCES, VIZIANAGARAM</h2>
              <h3 className="university_subtitle">JAWAHARLAL NEHRU TECHNOLOGICAL UNIVERSITY - GURAJADA VIZIANAGARAM</h3>
              <p className="address_line">DWARAPUDI, VIZIANAGARAM, ANDHRA PRADESH - 535 003.</p>
              <p className="constituent_line">
                ( A Constituent College of JNTU-GV & Approved by PCI, New Delhi )
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="nav-bar-wrap">
        <div className="shell nav-inner">
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-icon"></span>
            {open ? "Close Menu" : "Explore Contents"}
          </button>

          <nav className={`main-nav ${open ? "open" : ""}`}>
            <div className="desktop-links">
              {publicNav.slice(0, 7).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                >
                  {item.label}
                </Link>
              ))}

              <div className="nav-dropdown">
                <button className="dropdown-trigger">More +</button>
                <div className="dropdown-content">
                  {publicNav.slice(7).map((item) => (
                    <Link key={item.label} href={item.href}>{item.label}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="nav-actions">
              <Link href="/admissions" className="nav-cta">Admissions 2025</Link>
              <Link href="/login" className="nav-auth">CMS Portal</Link>
            </div>

            <div className="mobile-nav-content">
              {navGroups.map((group) => (
                <div className="mobile-group" key={group.label}>
                  <button
                    className={`mobile-trigger ${openGroup === group.label ? "active" : ""}`}
                    onClick={() => setOpenGroup(current => current === group.label ? "" : group.label)}
                  >
                    {group.label}
                    <span>{openGroup === group.label ? "−" : "+"}</span>
                  </button>
                  {openGroup === group.label && (
                    <div className="mobile-panel">
                      {group.items.map(item => (
                        <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Section Context Secondary Navigation */}
      {sectionNav && pathname !== "/" && !pathname.startsWith("/admin") && !pathname.startsWith("/login") ? (
        <div className="section-subnav">
          <div className="shell subnav-inner">
            <span className="subnav-label">{sectionNav.label} Directory</span>
            <div className="subnav-links">
              {sectionNav.items.map((item) => (
                <Link key={item.label} href={item.href} className={pathname === item.href ? "active" : ""}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

    </header>
  );
}
