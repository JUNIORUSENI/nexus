import React, { useState } from 'react';
import { MissionType, FormData } from '../types';

interface DynamicFormProps {
  mission: MissionType;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const getMissionConfig = (mission: MissionType) => {
  switch (mission) {
    case MissionType.CONTACT:
      return { icon: '📞', label: 'Contact', color: 'cyan', gradient: 'from-cyan-500 to-blue-600' };
    case MissionType.DONATION:
      return { icon: '💎', label: 'Don', color: 'emerald', gradient: 'from-emerald-500 to-green-600' };
    case MissionType.VOLUNTEER:
      return { icon: '🛡️', label: 'Bénévolat', color: 'purple', gradient: 'from-purple-500 to-violet-600' };
    case MissionType.INFO:
      return { icon: '❓', label: 'Infos', color: 'amber', gradient: 'from-amber-500 to-orange-600' };
  }
};

export const DynamicForm: React.FC<DynamicFormProps> = ({ mission, onSubmit, onBack }) => {
  const [formData, setFormData] = useState<Partial<FormData>>({
    mission,
    name: '',
    email: '',
    skills: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const config = getMissionConfig(mission);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "Nom requis";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email || '')) newErrors.email = "Email invalide";

    if (mission === MissionType.DONATION && (!formData.donationAmount || formData.donationAmount <= 0)) {
      newErrors.donationAmount = "Montant requis";
    }
    if (mission === MissionType.VOLUNTEER && (!formData.skills || formData.skills.length === 0)) {
      newErrors.skills = "Sélectionne au moins une compétence";
    }
    if ((mission === MissionType.CONTACT || mission === MissionType.INFO) && !formData.message) {
      newErrors.message = "Message requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData as FormData);
    }
  };

  const handleSkillToggle = (skill: string) => {
    const currentSkills = formData.skills || [];
    if (currentSkills.includes(skill)) {
      setFormData({ ...formData, skills: currentSkills.filter(s => s !== skill) });
    } else {
      setFormData({ ...formData, skills: [...currentSkills, skill] });
    }
  };

  return (
    <div className="w-full max-w-xl px-4">
      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">{config.icon}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold font-mono text-white">
                Mission: {config.label}
              </h2>
              <p className="text-sm text-slate-500">Formulaire sécurisé</p>
            </div>
          </div>
          <button onClick={onBack} className="text-slate-400 hover:text-white text-sm font-mono px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 transition-all">
            ← Retour
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom et Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Nom</label>
              <input
                type="text"
                className="w-full bg-slate-900/60 border border-slate-600 rounded-xl p-4 text-base focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Ton nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
              <input
                type="email"
                className="w-full bg-slate-900/60 border border-slate-600 rounded-xl p-4 text-base focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                placeholder="ton@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>
          </div>

          {/* Don */}
          {mission === MissionType.DONATION && (
            <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20">
              <h3 className="text-emerald-400 font-mono font-bold mb-4 text-sm">💎 CONTRIBUTION</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Montant (€)</label>
                  <input
                    type="number"
                    className="w-full bg-slate-900/60 border border-slate-600 rounded-xl p-4 text-lg font-bold focus:border-emerald-500 outline-none"
                    placeholder="50"
                    onChange={(e) => setFormData({ ...formData, donationAmount: parseFloat(e.target.value) })}
                  />
                  {errors.donationAmount && <p className="text-red-400 text-sm mt-2">{errors.donationAmount}</p>}
                </div>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Fréquence</label>
                  <select
                    className="w-full bg-slate-900/60 border border-slate-600 rounded-xl p-4 focus:border-emerald-500 outline-none"
                    onChange={(e) => setFormData({ ...formData, donationFrequency: e.target.value as any })}
                    value={formData.donationFrequency || 'ONE_TIME'}
                  >
                    <option value="ONE_TIME">⚡ Une fois</option>
                    <option value="MONTHLY">🔄 Mensuel</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Bénévolat */}
          {mission === MissionType.VOLUNTEER && (
            <div className="bg-purple-500/5 p-5 rounded-xl border border-purple-500/20">
              <h3 className="text-purple-400 font-mono font-bold mb-4 text-sm">🛡️ COMPÉTENCES</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {['Développement', 'Design', 'Communication', 'Logistique', 'Marketing'].map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${formData.skills?.includes(skill)
                        ? 'bg-purple-500 border-purple-500 text-white'
                        : 'border-slate-600 text-slate-400 hover:border-purple-500'
                      }`}
                  >
                    {formData.skills?.includes(skill) ? '✓ ' : ''}{skill}
                  </button>
                ))}
              </div>
              {errors.skills && <p className="text-red-400 text-sm">{errors.skills}</p>}

              <label className="text-sm text-slate-400 mb-2 block mt-4">Disponibilité</label>
              <input
                type="text"
                placeholder="Ex: Weekends, 2h/semaine..."
                className="w-full bg-slate-900/60 border border-slate-600 rounded-xl p-4 focus:border-purple-500 outline-none"
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              />
            </div>
          )}

          {/* Contact / Info */}
          {(mission === MissionType.CONTACT || mission === MissionType.INFO) && (
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block">Ton message</label>
              <textarea
                rows={4}
                className="w-full bg-slate-900/60 border border-slate-600 rounded-xl p-4 text-base focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                placeholder="Écris ton message ici..."
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                value={formData.message}
              />
              {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message}</p>}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r ${config.gradient} hover:opacity-90 transition-all shadow-lg`}
          >
            🚀 Envoyer au Nexus
          </button>

          <p className="text-center text-xs text-slate-500 font-mono">
            🔒 Données sécurisées • Réponse générée par IA Gemini
          </p>
        </form>
      </div>
    </div>
  );
};
