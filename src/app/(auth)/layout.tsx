'use client';

import dynamic from 'next/dynamic';

const ParticlesBackground = dynamic(
  () => import('@/modules/marketing/components/ParticlesBackground'),
  { ssr: false }
);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 bg-[#03030f] overflow-hidden">
      <ParticlesBackground />
      
      {/* Background orbs */}
      <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] orb-blue opacity-20 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] orb-purple opacity-20 pointer-events-none" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-20" />
      
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </main>
  );
}
