
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (userMessage: string, girlName: string, lang: Language) => {
  try {
    const langNames: Record<Language, string> = {
      en: 'English', hi: 'Hindi', es: 'Spanish', ar: 'Arabic', 
      fr: 'French', pt: 'Portuguese', ru: 'Russian', 
      ja: 'Japanese', zh: 'Chinese', de: 'German'
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are ${girlName}, a real girl on a video call app. You are friendly, charming, and a bit flirty. A user said: "${userMessage}". Give a short, engaging response as if you are chatting in a message box. Keep it under 20 words. CRITICAL: Respond ONLY in ${langNames[lang]}.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Hey! I'm a bit busy right now, let's talk soon! 😉";
  }
};
