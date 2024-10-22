import React from "react";
import { Label, TextInput } from "flowbite-react";
import type { configGeminis } from "./type";

interface ApiKeyInputProps {
  config: configGeminis; // Se pasa un objeto de configuración
  setConfig: (config: configGeminis) => void; // Función para manejar el cambio de estado
}

const ConfigForm: React.FC<ApiKeyInputProps> = ({ config, setConfig }) => {
  // Manejador para actualizar el estado completo (apiKey y model)
  const handleChange =
    (field: keyof configGeminis) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfig({
        ...config,
        [field]: e.target.value, // Actualizar el campo específico (apiKey o model)
      });
    };

  return (
    <div className="mb-2 w-full">
      {/* Input para la API Key */}
      <Label htmlFor="apiKey" value="API Key de Geminis" />
      <TextInput
        id="apiKey"
        type="text"
        placeholder="Ingresa tu API Key"
        required={true}
        className="mt-1"
        shadow
        sizing="lg"
        value={config.apiKey} // Estado para el valor del input
        onChange={handleChange("apiKey")} // Manejador del cambio para apiKey
      />

      {/* Input para el modelo */}
      <Label htmlFor="model" value="Modelo de IA" className="mt-4" />
      <TextInput
        id="model"
        type="text"
        placeholder="Ingresa el modelo de IA"
        required={true}
        className="mt-1"
        shadow
        sizing="lg"
        value={config.model} // Estado para el valor del input
        onChange={handleChange("model")} // Manejador del cambio para model
      />
    </div>
  );
};

export default ConfigForm;
