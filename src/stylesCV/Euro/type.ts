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

export interface TypeCV {
  name: string;
  jobTitle: string;
  personalInfo: PersonalInfo;
  workExperience: Job[];
  education: Education[];
  skills: string[];
}
