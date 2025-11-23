import type { Metadata } from "next";
import { Inter, Space_Grotesk, Cinzel } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";
import { StickySocials } from "@/components/layout/StickySocials";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "BAUYES",
  description: "The Cyber-Agrarian Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${cinzel.variable} antialiased bg-[#022c22] text-white min-h-screen flex flex-col`}>
        {/* Facebook SDK */}
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0" nonce="YOUR_NONCE"></script>

        <Navbar user={user} />
        <StickySocials />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
