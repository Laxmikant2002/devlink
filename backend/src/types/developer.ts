export interface Developer {
  id: string;
  name: string;
  primarySkill: string;
  photoURL?: string;
  skills: string[];
  location: string;
  bio?: string;
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface CreateDeveloperRequest {
  name: string;
  primarySkill: string;
  photoURL?: string;
  skills: string[];
  location: string;
  bio?: string;
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
}
