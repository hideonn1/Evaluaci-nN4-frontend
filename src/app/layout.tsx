import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "LabManager - Gestión de Recursos",
  description: "Sistema para la Gestión de Recursos Tecnológicos de un Laboratorio",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var m = document.cookie.match(/lab_theme=([^;]+)/);
              if (m && m[1] === 'dark') document.documentElement.classList.add('dark');
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-background text-foreground`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
