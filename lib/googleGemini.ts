'use server';

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function googleGemini(input: string) {

  console.log(input);
  console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Based on the following patient data, provide a recommendation, symptoms and treatement: ${input}`,
    });
  
    const result = response.text
    console.log(result);
    return (result); 
  } catch (error) {
    console.log(error);
  }
}