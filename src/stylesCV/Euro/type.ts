import type { FormatResponse } from "../../generateFile/types";

export interface PersonalInfo {
  address: string;
  phone: string;
  email: string;
}

export interface Job {
  title: string;
  company: string;
  dates: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  dates: string;
}

export interface TypeCVEuro {
  name: string;
  jobTitle: string;
  personalInfo: PersonalInfo;
  workExperience: Job[];
  education: Education[];
  skills: string[];
}

export const formatResponseEuro: FormatResponse<TypeCVEuro> = {
  compatibilityScore: 0,
  cv: {
    name: "",
    jobTitle: "",
    personalInfo: {
      address: "",
      phone: "",
      email: "",
    },
    workExperience: [
      {
        title: "",
        company: "",
        dates: "",
        responsibilities: [],
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        dates: "",
      },
    ],
    skills: [],
  },
};
