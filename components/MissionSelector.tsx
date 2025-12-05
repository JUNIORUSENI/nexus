import React from 'react';
import { MissionType } from '../types';

interface MissionSelectorProps {
  onSelect: (mission: MissionType) => void;
}

const missions = [
  {
    type: MissionType.CONTACT,
    icon: '📞',
    title: 'Établir le Contact',
    desc: 'Ouvrir un canal de communication direct avec le Nexus.',
    color: 'border-cyan-500 hover:bg-cyan-500/10',
    accent: 'text-cyan-400'
  },
  {
    type: MissionType.DONATION,
    icon: '💎',
    title: 'Faire un Don',
    desc: 'Transférer des ressources vitales pour soutenir la communauté.',
    color: 'border-emerald-500 hover:bg-emerald-500/10',
    accent: 'text-emerald-400'
  },
  {
    type: MissionType.VOLUNTEER,
    icon: '🛡️',
    title: 'Devenir Bénévole',
    desc: 'Rejoindre notre équipe et contribuer à la cause.',
    color: 'border-purple-500 hover:bg-purple-500/10',
    accent: 'text-purple-400'
  },
  {
    type: MissionType.INFO,
    icon: '❓',
    title: 'Demander des Infos',
    desc: 'Poser une question ou consulter les archives.',
    color: 'border-amber-500 hover:bg-amber-500/10',
    accent: 'text-amber-400'
  }
];

export const MissionSelector: React.FC<MissionSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-5xl px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>🦎</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 font-mono text-white">
          Choisis ta Mission
        </h2>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Le Nexus a besoin de toi! Comment puis-je t'aider en cette année{' '}
          <span className="text-emerald-400 font-bold">{new Date().getFullYear()}</span>?
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {missions.map((m) => (
          <button
            key={m.type}
            onClick={() => onSelect(m.type)}
            className={`group p-6 rounded-2xl border-2 bg-slate-800/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg text-left ${m.color}`}
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
              {m.icon}
            </div>
            <h3 className={`font-bold font-mono text-lg mb-2 ${m.accent}`}>
              {m.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {m.desc}
            </p>
            <div className="mt-4 text-xs font-mono text-slate-500 group-hover:text-white transition-colors">
              [ ENTRER ] →
            </div>
          </button>
        ))}
      </div>

      {/* Footer info */}
      <div className="mt-10 text-center">
        <p className="text-slate-600 text-sm font-mono flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Propulsé par Gemini AI
        </p>
      </div>
    </div>
  );
};
