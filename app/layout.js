import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://jntugvcpsv.jntugv.edu.in"),
  title: "JNTUGV College of Pharmaceutical Sciences, Vizianagaram",
  description:
    "Official-style Next.js website for JNTUGV College of Pharmaceutical Sciences, Vizianagaram with admissions, governance, disclosure, and contact sections."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
