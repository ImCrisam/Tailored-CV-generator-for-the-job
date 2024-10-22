// En tu componente de React o donde necesites generar el PDF
import React from "react";
import { generatePDFFromHTML } from "../../generateFile/generatepdf";
import type { TypeCV } from "./type";
interface CVComponentProps {
  cvData: TypeCV;
}
const EuroCV: React.FC<CVComponentProps> = ({ cvData }) => {
  const cvRef = React.useRef<HTMLDivElement>(null);

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
          <h1 id="name">{cvData.name}</h1>
          <p id="job-title">{cvData.jobTitle}</p>
        </header>

        <section className="personal-info">
          <h2>Personal Information</h2>
          <p>
            <strong>Address:</strong>{" "}
            <span id="address">{cvData.personalInfo.address}</span>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <span id="phone">{cvData.personalInfo.phone}</span>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <span id="email">{cvData.personalInfo.email}</span>
          </p>
        </section>

        <section className="work-experience">
          <h2>Work Experience</h2>
          {cvData.workExperience.map((job, index) => (
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
          {cvData.education.map((edu, index) => (
            <div className="degree" key={index}>
              <h3>{edu.degree}</h3>
              <p>
                <em>
                  {edu.institution} - {edu.dates}
                </em>
              </p>
            </div>
          ))}
        </section>

        <section className="skills">
          <h2>Skills</h2>
          <ul>
            {cvData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default EuroCV;
