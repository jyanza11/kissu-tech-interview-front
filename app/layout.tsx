import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { HealthStatus } from "@/components/health-status";
import { Navbar } from "@/components/navbar";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Signal Watcher - Monitoreo de Eventos",
  description: "Sistema de monitoreo y análisis de eventos con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="min-h-screen bg-background">
          {/* Health Status Bar */}
          <div className="border-b bg-muted/50">
            <div className="container mx-auto px-4 py-2">
              <HealthStatus />
            </div>
          </div>

          {/* Navigation */}
          <Navbar />

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">{children}</main>
        </div>

        {/* Toast Notifications */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
