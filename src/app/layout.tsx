import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Income Dashboard",
  description: "Brokerage and business income reporting dashboard",
};

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/alpaca", label: "Alpaca" },
  { href: "/robinhood", label: "Robinhood" },
  { href: "/sources", label: "Sources" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <aside className="sidebar" aria-label="Primary navigation">
            <Link href="/" className="brand" aria-label="Income Dashboard home">
              <span className="brand-mark">ID</span>
              <span>
                <strong>Income</strong>
                <small>Dashboard</small>
              </span>
            </Link>
            <nav>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
