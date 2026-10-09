import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Display face: chunky, quirky grotesque for headlines. Body: friendly, highly legible sans.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: profile.name || "Portfolio", template: `%s | ${profile.name}` },
    description: profile.headline,
    openGraph: { type: "website", siteName: profile.name, title: profile.name, description: profile.headline },
    twitter: { card: "summary_large_image" },
  };
}

// Runs before first paint so the saved theme never flashes. Light is the default unless the OS prefers dark.
const themeScript = `try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.add(d?"dark":"light")}catch(e){document.documentElement.classList.add("light")}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
