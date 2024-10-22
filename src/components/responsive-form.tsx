import React, { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";

const ResponsiveForm: React.FC = () => {
  // Estados para los campos del formulario
  const [apiKey, setApiKey] = useState<string>("");
  const [profileInfo, setProfileInfo] = useState<string>("");
  const [jobInfo, setJobInfo] = useState<string>("");

  // Manejador del botón enviar
  const handleSubmit = () => {
    // Aquí puedes agregar la lógica para enviar los datos
    console.log("API Key:", apiKey);
    console.log("Información del perfil:", profileInfo);
    console.log("Información del trabajo:", jobInfo);

    // Lógica para procesar o enviar los datos
    // Podrías usar fetch o axios para hacer una petición a una API, por ejemplo
  };

  return (
    <div className="m-3 flex w-full flex-col gap-4">
      {/* Label e Input para la API Key de Geminis */}
      <div className="mb-2 w-full">
        <Label htmlFor="apiKey" value="API Key de Geminis" />
        <TextInput
          id="apiKey"
          type="text"
          placeholder="Ingresa tu API Key"
          required={true}
          className="mt-1"
          shadow
          sizing="lg" // Aumentar tamaño para pantallas más grandes
          value={apiKey} // Estado para el valor del input
          onChange={(e) => setApiKey(e.target.value)} // Manejador del cambio
        />
      </div>

      {/* Label y TextArea para la información del perfil */}
      <div className="mb-2 block">
        <Label htmlFor="profileInfo" value="Información del perfil" />
        <Textarea
          id="profileInfo"
          placeholder="Describe la información de tu perfil"
          required={true}
          rows={4}
          className="mt-1"
          value={profileInfo} // Estado para el valor del textarea
          onChange={(e) => setProfileInfo(e.target.value)} // Manejador del cambio
        />
      </div>

      {/* Label y TextArea para la información del trabajo */}
      <div className="mb-2 block">
        <Label htmlFor="jobInfo" value="Información del trabajo" />
        <Textarea
          id="jobInfo"
          placeholder="Describe la información del trabajo"
          required={true}
          rows={4}
          className="mt-1"
          value={jobInfo} // Estado para el valor del textarea
          onChange={(e) => setJobInfo(e.target.value)} // Manejador del cambio
        />
      </div>

      {/* Botón para enviar */}
      <Button
        gradientDuoTone="purpleToPink"
        className="w-full"
        onClick={handleSubmit}
      >
        Enviar
      </Button>
    </div>
  );
};

export default ResponsiveForm;
