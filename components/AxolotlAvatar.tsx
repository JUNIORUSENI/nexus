import React from 'react';

interface AxolotlAvatarProps {
    mood?: 'idle' | 'thinking' | 'speaking' | 'celebrating';
    size?: number;
}

export const AxolotlAvatar: React.FC<AxolotlAvatarProps> = ({
    mood = 'idle',
    size = 100
}) => {
    const getEmoji = () => {
        switch (mood) {
            case 'thinking': return '🤔';
            case 'speaking': return '💬';
            case 'celebrating': return '🎉';
            default: return '🦎';
        }
    };

    const getBorderColor = () => {
        switch (mood) {
            case 'thinking': return 'border-purple-500 shadow-purple-500/30';
            case 'speaking': return 'border-cyan-500 shadow-cyan-500/30';
            case 'celebrating': return 'border-amber-500 shadow-amber-500/30';
            default: return 'border-emerald-500 shadow-emerald-500/30';
        }
    };

    return (
        <div
            className={`flex items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 shadow-lg ${getBorderColor()} ${mood === 'thinking' ? 'animate-pulse' : mood === 'speaking' ? 'animate-bounce' : ''
                }`}
            style={{
                width: size,
                height: size,
                animationDuration: mood === 'speaking' ? '1s' : '2s'
            }}
        >
            <span style={{ fontSize: size * 0.5 }}>{getEmoji()}</span>
        </div>
    );
};
