import { useState } from "react";
import { Label, Textarea, Button, Select, Modal } from "flowbite-react";
import ConfigForm from "../IA/geminis/configForm";
import type { configGeminis } from "../IA/geminis/type";
import { generateCVText } from "../generateFile/generateCV";
import { formatResponseEuro } from "../stylesCV/Euro/type";
import { generateContentGeminis } from "../IA/geminis/controller";
import EuroCV from "../stylesCV/Euro/EuroCV";

const ResponsiveForm: React.FC = () => {
  // Estados para los campos del formulario
  const [profileInfo, setProfileInfo] = useState<string>("");
  const [jobInfo, setJobInfo] = useState<string>("");
  const [aiType, setAiType] = useState<string>("gemini");

  const [config, setConfig] = useState<configGeminis>({
    apiKey: "AIzaSyD8Lx8JmC-Q9WJeSIkJwfsTlOjVK92Uyvg",
    model: "",
  });

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cvResult, setCvResult] = useState<any | null>(formatResponseEuro);

  // Manejador del botón enviar
  const handleSubmit = async () => {
    const typeFormatCv = formatResponseEuro;
    const jsonCv = await generateCVText(
      profileInfo,
      jobInfo,
      typeFormatCv,
      generateContentGeminis.bind(null, config),
    );
    setCvResult({ ...typeFormatCv, ...jsonCv });
    console.log({ ...typeFormatCv, ...jsonCv });

    setModalOpen(true);
  };
  const switchConfigForm = () => {
    switch (aiType) {
      case "gemini":
        return <ConfigForm config={config} setConfig={setConfig} />;
      case "openai":
        return <div>Configuración para OpenAI (por implementar)</div>;
      default:
        return <div>Selecciona un tipo de IA para ver su configuración</div>;
    }
  };
  // useMemo para memorizar el resultado de switchConfigForm basado en aiType

  return (
    <div className="m-3 flex w-full flex-col gap-4">
      {/* Label e Input para la API Key de Geminis */}
      <div className="mb-2 w-full">
        <Label htmlFor="aiType" value="Selecciona el tipo de IA" />
        <Select
          id="aiType"
          required={true}
          value={aiType} // Estado para el valor del select
          onChange={(e) => setAiType(e.target.value)} // Manejador del cambio
        >
          <option value="gemini">Gemini AI</option>
          <option value="openai">OpenAI GPT</option>
          <option value="other">Otra IA</option>
        </Select>
      </div>
      <div className="mb-2 w-full">{switchConfigForm()}</div>

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
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>Resultado del CV</Modal.Header>
        <Modal.Body>
          <EuroCV cvData={cvResult}></EuroCV>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResponsiveForm;
