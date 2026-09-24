import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match Político — Quiz de Afinidade Eleitoral",
  description:
    "Descubra qual candidato à Presidência realmente pensa como você com base em dados extraídos de planos de governo oficiais.",
  keywords: ["eleições", "match político", "quiz eleitoral", "planos de governo", "afinidade política"],
  openGraph: {
    title: "Match Político — Quem é seu candidato ideal?",
    description: "Faça o quiz de afinidade eleitoral baseado em propostas reais e descubra seu percentual de match com cada candidato.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col selection:bg-sky-500/25 selection:text-sky-300">
        {children}
      </body>
    </html>
  );
}
