import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ganesh Kurella | AI Engineer",
  description: "Modern premium developer portfolio showcasing AI & Web engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#00ffcc] selection:text-black">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
