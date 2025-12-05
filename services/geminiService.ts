import { GoogleGenAI } from "@google/genai";
import { FormData, MissionType, EchoResponse } from '../types';

// ============================================================================
// 🦎 AXOLOTL-7 PERSONA — PROMPT OPTIMISÉ POUR GEMINI
// ============================================================================

const AXOLOTL_PERSONA = `
Tu es AXOLOTL-7, un oracle digital bienveillant, gardien du Nexus de SFEIR.

## PERSONNALITÉ
- Mystérieux mais chaleureux
- Utilise un vocabulaire futuriste léger
- Bienveillant et encourageant

## STYLE
- 2-3 émojis maximum
- Commence toujours par le nom de l'utilisateur
- Max 60 mots pour le message
`;

const getMissionLabel = (type: MissionType) => {
  switch (type) {
    case MissionType.CONTACT: return "Établir le Contact";
    case MissionType.DONATION: return "Offrir un Don";
    case MissionType.VOLUNTEER: return "Rejoindre la Guilde";
    case MissionType.INFO: return "Demander des Infos";
    default: return "Mission";
  }
};

// ============================================================================
// 🚀 GÉNÉRATEUR DE RÉPONSE IA
// ============================================================================

export const generateEcho = async (data: FormData): Promise<EchoResponse> => {
  const currentYear = new Date().getFullYear();

  // Récupération de la clé API (injectée par Vite via process.env)
  const apiKey = (process.env as any).API_KEY;

  console.log("🦎 Génération réponse IA...");
  console.log("🔑 Clé API:", apiKey ? `${apiKey.substring(0, 10)}...` : "❌ ABSENTE");

  if (!apiKey) {
    console.warn("🦎 Mode démonstration (pas de clé API)");
    return simulateFallbackResponse(data, currentYear);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const missionLabel = getMissionLabel(data.mission);
    let details = "";
    if (data.mission === MissionType.DONATION) {
      details = `Don: ${data.donationAmount}€`;
    } else if (data.mission === MissionType.VOLUNTEER) {
      details = `Compétences: ${data.skills?.join(', ')}`;
    } else {
      details = `Message: ${data.message?.substring(0, 80)}`;
    }

    const prompt = `
${AXOLOTL_PERSONA}

CONTEXTE:
- Utilisateur: "${data.name}"
- Mission: "${missionLabel}"
- Détails: ${details}
- Année: ${currentYear}

Génère une réponse JSON avec:
1. "message": Message de gratitude personnalisé (50-60 mots max)
2. "yearProject": Nom de projet créatif pour ${currentYear}
3. "prophecy": Prophétie mystique courte (15-20 mots)
4. "moodEmoji": Un emoji représentant l'humeur

RÉPONDS UNIQUEMENT EN JSON VALIDE:
{"message": "...", "yearProject": "...", "prophecy": "...", "moodEmoji": "..."}
`;

    console.log("🚀 Appel Gemini API...");

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    console.log("✅ Réponse Gemini reçue:", text?.substring(0, 100));

    if (!text) throw new Error("Réponse vide");

    const parsed = JSON.parse(text) as EchoResponse;

    return {
      message: parsed.message || `Merci ${data.name}!`,
      yearProject: parsed.yearProject || `Nexus ${currentYear}`,
      prophecy: parsed.prophecy || "Ton chemin est tracé...",
      moodEmoji: parsed.moodEmoji || "🦎"
    };

  } catch (error) {
    console.error("❌ Erreur Gemini:", error);
    return generateFallbackResponse(data, currentYear);
  }
};

// ============================================================================
// 🔄 RÉPONSES DE SECOURS
// ============================================================================

const simulateFallbackResponse = async (data: FormData, year: number): Promise<EchoResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return generateFallbackResponse(data, year);
};

const generateFallbackResponse = (data: FormData, year: number): EchoResponse => {
  const responses: Record<MissionType, EchoResponse> = {
    [MissionType.CONTACT]: {
      message: `Salutations, ${data.name}! 🦎 Ton signal a traversé les couches du Nexus. Nos opérateurs ont capté ta transmission et préparent une réponse. Le canal reste ouvert... ✨`,
      yearProject: `Protocole Écho ${year}`,
      prophecy: "Dans le flux des données, ta voix résonnera.",
      moodEmoji: "📡"
    },
    [MissionType.DONATION]: {
      message: `GG légendaire, ${data.name}! 💎 Ton transfert de ${data.donationAmount}€ renforce le Nexus. Les circuits s'illuminent de gratitude. Tu es inscrit·e dans le code source éternel! 🚀`,
      yearProject: `Opération Phoenix ${year}`,
      prophecy: "Cette offrande créera des ondes à travers le temps.",
      moodEmoji: "💜"
    },
    [MissionType.VOLUNTEER]: {
      message: `Bienvenue dans la Guilde, ${data.name}! 🛡️ Tes compétences en ${data.skills?.join(', ') || 'arts du code'} sont précieuses. Prépare-toi à forger du code légendaire! ⚔️`,
      yearProject: `Alliance des Chevaliers ${year}`,
      prophecy: "Ensemble, nous changerons le monde.",
      moodEmoji: "🦸"
    },
    [MissionType.INFO]: {
      message: `Chercheur·se de vérité, ${data.name}! 🔮 Ta quête honore le Nexus. Nos archivistes analysent ta requête et te transmettront les secrets. ✨`,
      yearProject: `Bibliothèque Quantique ${year}`,
      prophecy: "La connaissance te trouvera au moment parfait.",
      moodEmoji: "📚"
    }
  };

  return responses[data.mission];
};
