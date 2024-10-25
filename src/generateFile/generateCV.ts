// Define la interfaz para la estructura de respuesta esperada

import { extractionJson } from "../utils/extractionJson";
import type { FormatResponse } from "./types";

// Función asincrónica para generar el CV personalizado en formato Europass
export const generateCVText = async <T, J>(
  profileInfo: string,
  jobDescription: string,
  formatResponse: FormatResponse<T>,
  generateContent: (data: string, config?: J) => Promise<string | null>,
  formatPrompts?: string,
): Promise<FormatResponse<T> | null> => {
  try {
    const prompt = `
      I have the following profile information:
      ${profileInfo}
      
      And the following job description:
      ${jobDescription}
      
      Can you evaluate the compatibility between the profile and the job description? 
      Please rate the compatibility from 0 to 100 and generate a CV in the Europass format based on the profile 
      that highlights the most relevant skills, experiences, and education for the job description.

      I need the response in the following JSON structure:
      ${JSON.stringify(formatResponse, null, 2)}

    (response only json)
    ${formatPrompts}

    
    `;
    const response = await generateContent(prompt);
    if (!response) return null;
    // Asegúrate de esperar la respuesta
    const responseJsonSting = extractionJson(response);

    // Aquí deberías convertir la respuesta en el tipo FormatResponse
    if (!response) {
      throw new Error("Received null response from the AI.");
    }
    if(!responseJsonSting) return null
    const parsedResponse: FormatResponse<T> =
      await JSON.parse(responseJsonSting);

    return parsedResponse; // Asegúrate de esperar la respuesta
  } catch (error) {
    console.error("Error generating Europass CV:", error);
    return null;
  }
};
