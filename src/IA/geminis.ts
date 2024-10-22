// src/api/generativeAI.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Función asincrónica para generar contenido
export const generateContentGeminis = async (
  prompt: string,
): Promise<string | null> => {
  try {
    // Crear instancia del cliente de Google Generative AI
    const genAI = new GoogleGenerativeAI("apiKey");

    // Obtener el modelo generativo (en este caso gemini-1.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generar contenido utilizando el prompt proporcionado
    const result = await model.generateContent(prompt);

    // Retornar el texto generado por el modelo
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    return null;
  }
};
