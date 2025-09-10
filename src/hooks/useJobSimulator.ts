"use client";

import { useState, useEffect } from 'react';
import { JobOffer, UserStats, DecisionHistory, Achievement } from '@/types/job';
import { generateRandomJobOffer } from '@/lib/jobOffers';
import { calculatePoints, updateUserLevel, checkAchievements } from '@/lib/gameLogic';

const initialStats: UserStats = {
  totalOffers: 0,
  acceptedOffers: 0,
  rejectedOffers: 0,
  averageSalary: 0,
  highestSalary: 0,
  currentLevel: 1,
  points: 0,
  achievements: [],
};

export function useJobSimulator() {
  const [currentOffer, setCurrentOffer] = useState<JobOffer | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(initialStats);
  const [decisionHistory, setDecisionHistory] = useState<DecisionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  // Initialize first offer
  useEffect(() => {
    generateNewOffer();
  }, []);

  const generateNewOffer = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentOffer(generateRandomJobOffer());
      setIsLoading(false);
    }, 500);
  };

  const makeDecision = (decision: 'accepted' | 'rejected') => {
    if (!currentOffer) return;

    const pointsEarned = calculatePoints(currentOffer, decision);
    const newTotalPoints = userStats.points + pointsEarned;
    const newLevel = updateUserLevel(newTotalPoints);

    // Update stats
    const newStats: UserStats = {
      ...userStats,
      totalOffers: userStats.totalOffers + 1,
      acceptedOffers: decision === 'accepted' ? userStats.acceptedOffers + 1 : userStats.acceptedOffers,
      rejectedOffers: decision === 'rejected' ? userStats.rejectedOffers + 1 : userStats.rejectedOffers,
      points: newTotalPoints,
      currentLevel: newLevel,
      averageSalary: decision === 'accepted' ? 
        calculateAverageSalary([...decisionHistory.filter(d => d.decision === 'accepted'), { offer: currentOffer, decision, timestamp: new Date(), pointsEarned }]) :
        userStats.averageSalary,
      highestSalary: decision === 'accepted' ? 
        Math.max(userStats.highestSalary, currentOffer.salary.max) :
        userStats.highestSalary,
      achievements: userStats.achievements,
    };

    // Check for new achievements
    const newAchievements = checkAchievements(newStats, currentOffer, decision);
    if (newAchievements.length > 0) {
      newStats.achievements = [...newStats.achievements, ...newAchievements];
      setShowAchievement(newAchievements[0]); // Show first achievement
    }

    // Add to history
    const newDecision: DecisionHistory = {
      offer: currentOffer,
      decision,
      timestamp: new Date(),
      pointsEarned,
    };

    setUserStats(newStats);
    setDecisionHistory(prev => [newDecision, ...prev.slice(0, 49)]); // Keep last 50 decisions
    
    // Generate new offer after a short delay
    setTimeout(() => {
      generateNewOffer();
    }, 1500);
  };

  const calculateAverageSalary = (acceptedOffers: DecisionHistory[]): number => {
    if (acceptedOffers.length === 0) return 0;
    const total = acceptedOffers.reduce((sum, decision) => sum + (decision.offer.salary.min + decision.offer.salary.max) / 2, 0);
    return Math.round(total / acceptedOffers.length);
  };

  const dismissAchievement = () => {
    setShowAchievement(null);
  };

  const resetGame = () => {
    setUserStats(initialStats);
    setDecisionHistory([]);
    setShowAchievement(null);
    generateNewOffer();
  };

  return {
    currentOffer,
    userStats,
    decisionHistory,
    isLoading,
    showAchievement,
    makeDecision,
    generateNewOffer,
    dismissAchievement,
    resetGame,
  };
}