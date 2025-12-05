import React from 'react';
import { ParticleBackground } from './ParticleBackground';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden text-slate-200 font-sans">
      <ParticleBackground />

      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-nexus-dark to-slate-900 -z-10" />

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-3xl">🦎</span>
            </div>
            <div>
              <h1 className="text-2xl font-mono font-bold text-white">
                SFEIR<span className="text-emerald-400">.NEXUS</span>
              </h1>
              <p className="text-sm text-slate-500 font-mono">
                Formulaire Augmenté • {new Date().getFullYear()}
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-mono text-green-400">IA GEMINI ACTIVE</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center">
          {children}
        </main>

        <footer className="mt-10 text-center text-slate-600 text-sm font-mono border-t border-slate-800 pt-6">
          <p>Nuit de l'Info {new Date().getFullYear()} • Défi "Formulaire Augmenté" • Propulsé par Gemini AI 🤖</p>
        </footer>
      </div>
    </div>
  );
};
