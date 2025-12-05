import React, { useEffect, useState } from 'react';
import { EchoResponse, MissionType } from '../types';
import { AxolotlAvatar } from './AxolotlAvatar';

interface ConfirmationEchoProps {
    data: EchoResponse;
    mission: MissionType;
    userName: string;
    onReset: () => void;
}

export const ConfirmationEcho: React.FC<ConfirmationEchoProps> = ({ data, mission, userName, onReset }) => {
    const currentYear = new Date().getFullYear();
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [avatarMood, setAvatarMood] = useState<'thinking' | 'speaking' | 'celebrating'>('speaking');

    // Effet machine à écrire pour montrer l'IA en action
    useEffect(() => {
        let index = 0;
        const text = data.message;

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText(text.slice(0, index + 1));
                index++;
            } else {
                setIsTyping(false);
                setAvatarMood('celebrating');
                clearInterval(interval);
            }
        }, 30); // Vitesse de frappe

        return () => clearInterval(interval);
    }, [data.message]);

    return (
        <div className="w-full max-w-2xl px-4">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-8 shadow-xl shadow-emerald-500/5">
                {/* Header avec Avatar */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <AxolotlAvatar mood={avatarMood} size={100} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold font-mono text-white mb-2">
                        ✨ Transmission Réussie!
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-green-400 font-mono">Réponse générée par Gemini AI</span>
                    </div>
                </div>

                {/* Message IA avec effet typing visible */}
                <div className="bg-slate-900/60 p-6 rounded-xl border-l-4 border-emerald-500 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{data.moodEmoji || '🦎'}</span>
                        <span className="text-sm text-slate-500 font-mono">Message pour {userName}:</span>
                    </div>
                    <p className="text-lg md:text-xl text-white leading-relaxed">
                        {displayedText}
                        {isTyping && <span className="inline-block w-3 h-5 bg-emerald-400 ml-1 animate-pulse"></span>}
                    </p>
                </div>

                {/* Infos supplémentaires générées par l'IA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🎯</span>
                            <span className="text-xs text-slate-500 font-mono uppercase">Projet {currentYear}</span>
                        </div>
                        <p className="text-base text-white font-semibold">{data.yearProject}</p>
                    </div>

                    {data.prophecy && (
                        <div className="bg-slate-900/40 p-5 rounded-xl border border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">🔮</span>
                                <span className="text-xs text-slate-500 font-mono uppercase">Prophétie IA</span>
                            </div>
                            <p className="text-base text-slate-300 italic">"{data.prophecy}"</p>
                        </div>
                    )}
                </div>

                {/* Info année */}
                <div className="text-center mb-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <p className="text-emerald-400">
                        🗓️ Ton soutien en <span className="font-bold">{currentYear}</span> est crucial pour notre progression!
                    </p>
                </div>

                {/* Bouton retour */}
                <button
                    onClick={onReset}
                    className="w-full py-4 rounded-xl border-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 transition-all font-mono text-base"
                >
                    ← Nouvelle mission
                </button>
            </div>
        </div>
    );
};
