import { JobOffer } from '@/types/job';

const companies = [
  { name: 'TechCorp', size: 'Enterprise', rating: 4.5 },
  { name: 'StartupX', size: 'Startup', rating: 3.8 },
  { name: 'InnovateLabs', size: 'Scale-up', rating: 4.2 },
  { name: 'CodeFactory', size: 'Medium', rating: 4.0 },
  { name: 'DataDriven Inc', size: 'Enterprise', rating: 4.3 },
  { name: 'AgileMinds', size: 'Startup', rating: 4.1 },
  { name: 'CloudTech Solutions', size: 'Medium', rating: 4.4 },
  { name: 'AI Dynamics', size: 'Scale-up', rating: 3.9 },
  { name: 'DevSphere', size: 'Startup', rating: 4.0 },
  { name: 'TechGlobal', size: 'Enterprise', rating: 4.6 },
];

const jobTitles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'UI/UX Designer',
  'Mobile Developer',
  'QA Engineer',
  'Tech Lead',
  'Software Architect',
  'Machine Learning Engineer',
];

const technologies = [
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java',
  'TypeScript', 'JavaScript', 'Go', 'Rust', 'Docker', 'Kubernetes',
  'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL', 'Redis',
  'GraphQL', 'REST APIs', 'Microservices', 'Next.js', 'Express.js',
];

const benefits = [
  'Seguro médico privado',
  'Seguro dental',
  'Gimnasio corporativo',
  'Días de home office',
  'Capacitación técnica',
  'Conferencias internacionales',
  'Stock options',
  'Bonos por performance',
  'Almuerzo gratuito',
  'Horarios flexibles',
  'Vacaciones ilimitadas',
  'Laptop de última generación',
  'Presupuesto para setup home office',
  'Plan de carrera estructurado',
  'Mentorship program',
];

const locations = [
  'Buenos Aires, Argentina',
  'Madrid, España',
  'Barcelona, España',
  'Ciudad de México, México',
  'Bogotá, Colombia',
  'Lima, Perú',
  'Santiago, Chile',
  'Montevideo, Uruguay',
  'San José, Costa Rica',
  'Remote LATAM',
];

const workModes: Array<'Remote' | 'Hybrid' | 'On-site'> = ['Remote', 'Hybrid', 'On-site'];
const experienceLevels: Array<'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager'> = ['Junior', 'Mid', 'Senior', 'Lead', 'Manager'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateSalary(experienceLevel: string, companySize: string): { min: number; max: number } {
  const baseSalaries = {
    Junior: { min: 1500, max: 3000 },
    Mid: { min: 3000, max: 5000 },
    Senior: { min: 5000, max: 8000 },
    Lead: { min: 7000, max: 12000 },
    Manager: { min: 10000, max: 18000 },
  };

  const multipliers = {
    Startup: 0.8,
    'Scale-up': 0.9,
    Medium: 1.0,
    Enterprise: 1.2,
  };

  const base = baseSalaries[experienceLevel as keyof typeof baseSalaries];
  const multiplier = multipliers[companySize as keyof typeof multipliers];

  return {
    min: Math.round(base.min * multiplier),
    max: Math.round(base.max * multiplier),
  };
}

export function generateRandomJobOffer(): JobOffer {
  const company = getRandomElement(companies);
  const title = getRandomElement(jobTitles);
  const location = getRandomElement(locations);
  const workMode = getRandomElement(workModes);
  const experienceLevel = getRandomElement(experienceLevels);
  const salary = generateSalary(experienceLevel, company.size);
  const selectedBenefits = getRandomElements(benefits, Math.floor(Math.random() * 6) + 3);
  const selectedTechnologies = getRandomElements(technologies, Math.floor(Math.random() * 5) + 3);

  const descriptions = [
    `Únete a nuestro equipo dinámico y trabaja en proyectos innovadores que impactan a millones de usuarios.`,
    `Buscamos un profesional apasionado para liderar iniciativas tecnológicas de vanguardia.`,
    `Oportunidad única para crecer profesionalmente en una empresa en constante expansión.`,
    `Forma parte de un equipo multicultural y colaborativo con mentalidad global.`,
    `Desarrolla tu carrera en un ambiente de aprendizaje continuo y crecimiento acelerado.`,
  ];

  const requirementsList = [
    `${Math.floor(Math.random() * 3) + 2}+ años de experiencia en desarrollo`,
    `Conocimiento sólido en ${selectedTechnologies.slice(0, 2).join(' y ')}`,
    `Experiencia con metodologías ágiles`,
    `Inglés conversacional`,
    `Capacidad de trabajo en equipo`,
    `Orientación a resultados`,
  ];

  return {
    id: Math.random().toString(36).substr(2, 9),
    title,
    company: company.name,
    location,
    workMode,
    salary: {
      ...salary,
      currency: 'USD',
    },
    experienceLevel,
    benefits: selectedBenefits,
    technologies: selectedTechnologies,
    companySize: company.size as 'Startup' | 'Scale-up' | 'Medium' | 'Enterprise',
    companyRating: company.rating,
    description: getRandomElement(descriptions),
    requirements: requirementsList.slice(0, Math.floor(Math.random() * 3) + 3),
    equity: company.size === 'Startup' ? `${(Math.random() * 2).toFixed(2)}%` : undefined,
    bonus: Math.random() > 0.5 ? `${Math.floor(Math.random() * 20) + 10}% anual` : undefined,
    vacationDays: Math.floor(Math.random() * 10) + 20,
    companyLogo: `https://placehold.co/80x80?text=${company.name.charAt(0)}+${company.name.split(' ')[1]?.charAt(0) || ''}`,
  };
}