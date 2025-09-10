"use client";

import { Achievement } from '@/types/job';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface AchievementNotificationProps {
  achievement: Achievement;
  onDismiss: () => void;
}

export function AchievementNotification({ achievement, onDismiss }: AchievementNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full animate-in zoom-in-95 duration-300">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">{achievement.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Logro Desbloqueado!
              </h2>
              <h3 className="text-lg font-semibold text-blue-600 mb-1">
                {achievement.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {achievement.description}
              </p>
            </div>
            <Button 
              onClick={onDismiss}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              ¡Genial!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}