export const publicNav = [
  { label: "Home", href: "/" },
  { label: "Institutional Profile", href: "/about" },
  { label: "Governance", href: "/administration" },
  { label: "Academic Framework", href: "/academics" },
  { label: "Admissions Portfolio", href: "/admissions" },
  { label: "Faculty", href: "/faculty" },
  { label: "Academic Departments", href: "/departments" },
  { label: "Infrastructure", href: "/facilities" },
  { label: "Campus Archive", href: "/gallery" },
  { label: "Student Welfare", href: "/student-support" },
  { label: "Statutory Disclosure", href: "/mandatory-disclosure" },
  { label: "Official Bulletins", href: "/notices" },
  { label: "Connect", href: "/contact" }
];

export const navGroups = [
  {
    label: "Institutional Hierarchy",
    items: [
      { label: "Overview", href: "/about" },
      { label: "Governance", href: "/administration" },
      { label: "Principal's Desk", href: "/principal" },
      { label: "Administrative Office", href: "/contact" }
    ]
  },
  {
    label: "Academic Portfolio",
    items: [
      { label: "Framework & Regulations", href: "/academics" },
      { label: "Admissions Desk", href: "/admissions" },
      { label: "Academic Departments", href: "/departments" },
      { label: "Faculty Repository", href: "/faculty" }
    ]
  },
  {
    label: "Campus Ecosystem",
    items: [
      { label: "Infrastructure", href: "/facilities" },
      { label: "Campus Archive", href: "/gallery" },
      { label: "Student Support Cell", href: "/student-support" }
    ]
  },
  {
    label: "Public Domain",
    items: [
      { label: "Statutory Disclosure", href: "/mandatory-disclosure" },
      { label: "Official Bulletins", href: "/notices" }
    ]
  }
];

export function getSectionNav(pathname) {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  for (const group of navGroups) {
    const hasMatch = group.items.some((item) => item.href === normalized);
    if (hasMatch) {
      return group;
    }
  }

  return null;
}

export const utilityLinks = [
  { label: "University Headquarters", href: "https://jntugv.edu.in" },
  { label: "Academics", href: "/academics" },
  { label: "Admissions", href: "/admissions" },
  { label: "Mandatory Disclosure", href: "/mandatory-disclosure" },
  { label: "Contact", href: "/contact" }
];
