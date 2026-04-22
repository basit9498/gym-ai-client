'use client';

import { Zap, Globe, MessageCircle, Video, Code2, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Partners'],
  Support: ['Help Center', 'Community', 'Contact Us', 'Status', 'Privacy Policy'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'GDPR', 'Compliance'],
};

const SOCIALS = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Video, href: '#', label: 'YouTube' },
  { icon: Code2, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-5 group">
              <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00d4ff, #9b59ff)' }}>
                <Zap size={18} className="text-white" fill="white" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                BodyForge<span className="gradient-text-blue">AI</span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              The world's first agentic BodyForgeAI coach. Your body, your goals, your AI — evolving every day.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <Icon size={15} className="text-white/50 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            {/* App store badges */}
            <div className="flex gap-3 mt-6">
              {['App Store', 'Google Play'].map((store) => (
                <div
                  key={store}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
                >
                  {store === 'App Store' ? '🍎' : '🤖'} {store}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-white/40 text-sm hover:text-white/80 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-white/30 text-sm">
            © 2025 BodyForgeAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-white/30">
            <span>Made with</span>
            <span className="text-[#ff6b9d]">♥</span>
            <span>by AI Athletes, for AI Athletes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff80]" style={{ boxShadow: '0 0 6px #00ff80' }} />
            <span className="text-white/30 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
