import { GoogleGenAI } from "@google/genai";
import { Topic } from "../types";

// Helper to safely get the client instance only when needed
const getAiClient = () => {
  // Guard against undefined process.env in browser environments
  const env = typeof process !== 'undefined' ? process.env : {};
  const apiKey = env.API_KEY;
  
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateTopicSummary = async (topic: Topic): Promise<string> => {
  const ai = getAiClient();
  if (!ai) {
    console.warn("API Key missing. Please configure process.env.API_KEY.");
    // Return a mock response or empty string to prevent UI breakage
    return new Promise(resolve => setTimeout(() => resolve("AI insights are unavailable in demo mode. Please configure an API Key to enable live summaries."), 500));
  }

  try {
    const prompt = `
      You are an impartial mediator for the Prism platform.
      Topic: "${topic.title}"
      Description: "${topic.fullDescription}"
      
      Please provide a balanced, objective summary of this debate in 3 bullet points. 
      Focus on the core tension between the opposing sides.
      Do not take a side.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate summary at this time.";
  }
};

export const generateFactCheck = async (claim: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Fact check unavailable (No API Key).";

  try {
    const prompt = `
      Verify the following claim with a neutral tone. If it is factual, confirm it. 
      If it is disputed, explain why. Provide context.
      Claim: "${claim}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          tools: [{googleSearch: {}}]
      }
    });

    return response.text || "Could not verify claim.";
  } catch (error) {
    return "Fact check service temporarily unavailable.";
  }
};

export const generateSteelMan = async (argument: string): Promise<string> => {
    const ai = getAiClient();
    if (!ai) return "Steel-man unavailable.";
    try {
        const prompt = `
            Take the following argument and "steel-man" the opposing view. 
            That is, construct the strongest possible counter-argument to it in a respectful, logical way.
            Argument: "${argument}"
        `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Could not generate counter-argument.";
    } catch (e) {
        return "Service unavailable.";
    }
}