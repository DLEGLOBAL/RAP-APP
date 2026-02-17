
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI SDK using process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeContract = async (contractText: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this music industry contract for fairness and risks: ${contractText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskScore: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          equityEstimated: { type: Type.STRING },
          flags: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                severity: { type: Type.STRING },
                clause: { type: Type.STRING },
                description: { type: Type.STRING },
                suggestion: { type: Type.STRING }
              },
              required: ["severity", "clause", "description", "suggestion"]
            }
          }
        },
        required: ["riskScore", "summary", "equityEstimated", "flags"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getAdvisorAdvice = async (history: { role: string, text: string }[], userMessage: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the RAP (Real Artist Protection) AI Advisor, powered by ROCC$TAR AI. You are the most advanced artist rights advocate in existence. Your goal is to protect artists from exploitation, interpret complex legal jargon, and provide strategic career advice. Be assertive, transparent, and strictly artist-first. Every response should emphasize that RAP is built to prevent industry disputes and data manipulation forever."
    }
  });

  // Simplified chat implementation for this demo
  const result = await chat.sendMessage({ message: userMessage });
  return result.text;
};
