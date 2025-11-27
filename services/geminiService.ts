import { GoogleGenAI } from "@google/genai";
import { Topic, Argument } from "../types";

// Note: In a real app, this key comes from process.env.API_KEY
// The user instruction says to assume process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey });

export const generateTopicSummary = async (topic: Topic): Promise<string> => {
  if (!apiKey) {
    return "API Key missing. Please configure process.env.API_KEY to see AI summaries.";
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
  if (!apiKey) return "Fact check unavailable (No API Key).";

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
    if (!apiKey) return "Steel-man unavailable.";
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