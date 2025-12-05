import { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";

interface StreamState {
    text: string;
    isStreaming: boolean;
    isComplete: boolean;
    error: string | null;
}

export const useGeminiStream = () => {
    const [state, setState] = useState<StreamState>({
        text: '',
        isStreaming: false,
        isComplete: false,
        error: null
    });

    const streamResponse = useCallback(async (prompt: string): Promise<void> => {
        setState({
            text: '',
            isStreaming: true,
            isComplete: false,
            error: null
        });

        if (!process.env.API_KEY) {
            // Simulate streaming for demo without API key
            const demoText = "Salutations, voyageur du Nexus ! 🦎 Axolotl-7 a bien reçu ta transmission. Les circuits quantiques ont enregistré ton message dans les archives éternelles du code. Que la lumière du Nexus guide ton chemin à travers les flux de données. ✨";

            for (let i = 0; i <= demoText.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 20));
                setState(prev => ({
                    ...prev,
                    text: demoText.slice(0, i)
                }));
            }

            setState(prev => ({
                ...prev,
                isStreaming: false,
                isComplete: true
            }));
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const response = await ai.models.generateContentStream({
                model: 'gemini-2.5-flash',
                contents: prompt
            });

            let fullText = '';

            for await (const chunk of response) {
                const chunkText = chunk.text || '';
                fullText += chunkText;
                setState(prev => ({
                    ...prev,
                    text: fullText
                }));
            }

            setState(prev => ({
                ...prev,
                isStreaming: false,
                isComplete: true
            }));

        } catch (error) {
            console.error('Streaming error:', error);
            setState(prev => ({
                ...prev,
                isStreaming: false,
                error: 'Connexion au noyau quantique interrompue...'
            }));
        }
    }, []);

    const reset = useCallback(() => {
        setState({
            text: '',
            isStreaming: false,
            isComplete: false,
            error: null
        });
    }, []);

    return {
        ...state,
        streamResponse,
        reset
    };
};
