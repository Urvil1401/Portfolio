import { Hanken_Grotesk, JetBrains_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silk",
  display: "swap",
});

export const metadata = {
  title: "Urvil Mehta · Software Engineer",
  description:
    "Urvil Mehta — software engineer building AI-powered products end-to-end with Next.js, Node.js, and AWS.",
  openGraph: {
    type: "website",
    title: "Urvil Mehta · Software Engineer",
    description:
      "Urvil Mehta — software engineer building AI-powered products end-to-end with Next.js, Node.js, and AWS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Urvil Mehta · Software Engineer",
    description: "Software engineer building reliable products end-to-end.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#100f0f",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${mono.variable} ${silkscreen.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
