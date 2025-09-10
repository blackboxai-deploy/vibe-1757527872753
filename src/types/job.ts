export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experienceLevel: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager';
  benefits: string[];
  technologies: string[];
  companySize: 'Startup' | 'Scale-up' | 'Medium' | 'Enterprise';
  companyRating: number;
  description: string;
  requirements: string[];
  equity?: string;
  bonus?: string;
  vacationDays: number;
  companyLogo?: string;
}

export interface UserStats {
  totalOffers: number;
  acceptedOffers: number;
  rejectedOffers: number;
  averageSalary: number;
  highestSalary: number;
  currentLevel: number;
  points: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: Date;
}

export interface DecisionHistory {
  offer: JobOffer;
  decision: 'accepted' | 'rejected';
  timestamp: Date;
  pointsEarned: number;
}