import { JobOffer, UserStats, Achievement } from '@/types/job';

export function calculatePoints(offer: JobOffer, decision: 'accepted' | 'rejected'): number {
  let points = 0;
  
  if (decision === 'accepted') {
    // Points for salary range
    const avgSalary = (offer.salary.min + offer.salary.max) / 2;
    points += Math.floor(avgSalary / 100);
    
    // Bonus points for company rating
    points += Math.floor(offer.companyRating * 10);
    
    // Points for experience level match
    const levelPoints = {
      Junior: 50,
      Mid: 75,
      Senior: 100,
      Lead: 150,
      Manager: 200,
    };
    points += levelPoints[offer.experienceLevel];
    
    // Bonus for startups (higher risk, higher reward)
    if (offer.companySize === 'Startup') points += 50;
    
    // Remote work bonus
    if (offer.workMode === 'Remote') points += 25;
    
  } else {
    // Small points for being selective
    points += 10;
    
    // Bonus points for rejecting low-paying offers (being strategic)
    const avgSalary = (offer.salary.min + offer.salary.max) / 2;
    if (avgSalary < 2000) points += 30;
  }
  
  return points;
}

export function updateUserLevel(currentPoints: number): number {
  // Level progression: every 1000 points = new level
  return Math.floor(currentPoints / 1000) + 1;
}

export function checkAchievements(stats: UserStats, newOffer: JobOffer, decision: 'accepted' | 'rejected'): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  const allAchievements: Achievement[] = [
    {
      id: 'first_accept',
      name: 'Primera Oferta',
      description: 'Acepta tu primera oferta de trabajo',
      icon: '🎉',
      unlocked: false,
    },
    {
      id: 'picky_professional',
      name: 'Profesional Exigente',
      description: 'Rechaza 10 ofertas seguidas',
      icon: '🎯',
      unlocked: false,
    },
    {
      id: 'startup_lover',
      name: 'Amante de Startups',
      description: 'Acepta 3 ofertas de startups',
      icon: '🚀',
      unlocked: false,
    },
    {
      id: 'remote_worker',
      name: 'Trabajador Remoto',
      description: 'Acepta 5 trabajos remotos',
      icon: '🏠',
      unlocked: false,
    },
    {
      id: 'high_earner',
      name: 'Alto Ingreso',
      description: 'Acepta una oferta de más de $10,000 USD',
      icon: '💰',
      unlocked: false,
    },
    {
      id: 'experienced',
      name: 'Experimentado',
      description: 'Revisa 50 ofertas de trabajo',
      icon: '📈',
      unlocked: false,
    },
    {
      id: 'level_up',
      name: 'Subida de Nivel',
      description: 'Alcanza el nivel 5',
      icon: '⭐',
      unlocked: false,
    },
  ];
  
  // Check each achievement
  allAchievements.forEach(achievement => {
    const alreadyUnlocked = stats.achievements.some(a => a.id === achievement.id);
    if (alreadyUnlocked) return;
    
    let shouldUnlock = false;
    
    switch (achievement.id) {
      case 'first_accept':
        shouldUnlock = decision === 'accepted' && stats.acceptedOffers === 0;
        break;
      case 'picky_professional':
        shouldUnlock = stats.rejectedOffers >= 9 && decision === 'rejected';
        break;
      case 'startup_lover':
        shouldUnlock = decision === 'accepted' && newOffer.companySize === 'Startup' && 
          stats.acceptedOffers >= 2; // Will be 3 after this acceptance
        break;
      case 'remote_worker':
        shouldUnlock = decision === 'accepted' && newOffer.workMode === 'Remote' && 
          stats.acceptedOffers >= 4; // Will be 5 after this acceptance
        break;
      case 'high_earner':
        shouldUnlock = decision === 'accepted' && newOffer.salary.max >= 10000;
        break;
      case 'experienced':
        shouldUnlock = stats.totalOffers >= 49; // Will be 50 after this offer
        break;
      case 'level_up':
        shouldUnlock = stats.currentLevel >= 5;
        break;
    }
    
    if (shouldUnlock) {
      newAchievements.push({
        ...achievement,
        unlocked: true,
        date: new Date(),
      });
    }
  });
  
  return newAchievements;
}

export function getLevelName(level: number): string {
  const levels = [
    'Principiante',
    'Aprendiz',
    'Desarrollador',
    'Especialista',
    'Experto',
    'Senior',
    'Lead',
    'Arquitecto',
    'Principal',
    'Director',
    'VP Engineering',
    'CTO',
  ];
  
  return levels[Math.min(level - 1, levels.length - 1)] || 'Leyenda Tech';
}

export function getNextLevelProgress(points: number): { current: number; next: number; percentage: number } {
  const currentLevelPoints = Math.floor(points / 1000) * 1000;
  const progress = points - currentLevelPoints;
  const percentage = (progress / 1000) * 100;
  
  return {
    current: progress,
    next: 1000,
    percentage,
  };
}