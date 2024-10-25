import { useRef } from "react";
import "./styles.css";
import type { FormatResponse } from "../../generateFile/types";
import type { TypeCVEuro } from "./type";
import { generatePDFFromHTML } from "../../generateFile/generatepdf";

interface CVComponentProps {
  cvData: FormatResponse<TypeCVEuro>;
}

const EuroCV: React.FC<CVComponentProps> = ({ cvData }) => {
  const { compatibilityScore: score, cv: data } = cvData; // Desestructuramos el score y cv por separado

  const cvRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = () => {
    if (cvRef.current) {
      generatePDFFromHTML(cvRef.current);
    }
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Generar PDF</button>
      <div ref={cvRef} className="cv-container">
        <header>
          <h1 id="name">{data?.name}</h1>
          <p id="job-title">{data?.jobTitle}</p>
        </header>

        <section className="personal-info">
          <h2>Personal Information</h2>
          <p>
            <strong>Address:</strong>{" "}
            <span id="address">{data?.personalInfo?.address}</span>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <span id="phone">{data?.personalInfo?.phone}</span>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <span id="email">{data?.personalInfo?.email}</span>
          </p>
        </section>

        <section className="work-experience">
          <h2>Work Experience</h2>
          {data?.workExperience?.map((job, index) => (
            <div className="job" key={index}>
              <h3>
                {job.title} at {job.company}
              </h3>
              <p>
                <em>{job.dates}</em>
              </p>
              <ul>
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="education">
          <h2>Education</h2>
          {data?.education?.map((edu, index) => (
            <div className="degree" key={index}>
              <h3>{edu.degree}</h3>
              <p>
                <em>
                  {edu?.institution} - {edu?.dates}
                </em>
              </p>
            </div>
          ))}
        </section>

        <section className="skills">
          <h2>Skills</h2>
          <ul>
            {data?.skills
              ?.slice(0, 20)
              .map((skill, index) => <li key={index}>{skill}</li>)}
          </ul>
        </section>

        {/* Muestra el score de compatibilidad si lo necesitas */}
        <footer>
          <p>
            <strong>Compatibility Score:</strong> {score}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default EuroCV;
