import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "BodyForgeAI | AI-Powered Personal Training",
  description: "Your personal BodyForgeAI coach that thinks, coaches & evolves with you. Smart workout plans, AI nutrition guidance, and motivation that never quits.",
  keywords: "BodyForgeAI, AI gym, personal trainer AI, workout AI, fitness AI, AI nutrition",
  openGraph: {
    title: "BodyForgeAI Coach",
    description: "AI-Powered Personal Training That Thinks, Coaches & Evolves With You",
    type: "website",
  },
};

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
