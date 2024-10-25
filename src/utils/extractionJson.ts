export function extractionJson(input: string): string | null {
  if (!input) return "";
  const primeraLlave = input.indexOf("{");
  const ultimaLlave = input.lastIndexOf("}");

  // Verificamos que ambas llaves existan y que la primera esté antes de la última
  if (primeraLlave === -1 || ultimaLlave === -1 || primeraLlave > ultimaLlave) {
    return null; // Retornamos null si no hay llaves o están en orden incorrecto
  }

  return input.substring(primeraLlave, ultimaLlave + 1); // Incluimos la última llave
}
