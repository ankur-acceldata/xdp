import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xDP",
  description: "Cross Data Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
