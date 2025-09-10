"use client";

import { UserStats } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getLevelName, getNextLevelProgress } from '@/lib/gameLogic';

interface StatsPanelProps {
  stats: UserStats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const levelProgress = getNextLevelProgress(stats.points);
  const levelName = getLevelName(stats.currentLevel);
  const acceptanceRate = stats.totalOffers > 0 ? Math.round((stats.acceptedOffers / stats.totalOffers) * 100) : 0;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-center">
          📊 Tu Progreso Profesional
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Level Section */}
        <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-gray-900">
            Nivel {stats.currentLevel}
          </div>
          <div className="text-sm font-medium text-gray-600 mb-2">
            {levelName}
          </div>
          <div className="space-y-2">
            <Progress value={levelProgress.percentage} className="h-2" />
            <div className="text-xs text-gray-500">
              {levelProgress.current} / {levelProgress.next} puntos
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              {stats.acceptedOffers}
            </div>
            <div className="text-xs text-green-600">Ofertas Aceptadas</div>
          </div>
          
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-700">
              {stats.rejectedOffers}
            </div>
            <div className="text-xs text-red-600">Ofertas Rechazadas</div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">
              {stats.totalOffers}
            </div>
            <div className="text-xs text-blue-600">Total Revisadas</div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              {acceptanceRate}%
            </div>
            <div className="text-xs text-purple-600">Tasa Aceptación</div>
          </div>
        </div>

        {/* Salary Stats */}
        {stats.averageSalary > 0 && (
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-lg font-bold text-yellow-700">
                ${stats.averageSalary.toLocaleString()}
              </div>
              <div className="text-xs text-yellow-600">Salario Promedio</div>
            </div>
            
            {stats.highestSalary > 0 && (
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-orange-700">
                  ${stats.highestSalary.toLocaleString()}
                </div>
                <div className="text-xs text-orange-600">Salario Más Alto</div>
              </div>
            )}
          </div>
        )}

        {/* Points */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-gray-700">
            {stats.points.toLocaleString()} pts
          </div>
          <div className="text-xs text-gray-600">Puntuación Total</div>
        </div>

        {/* Achievements Badge */}
        {stats.achievements.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg text-center">
            <div className="text-lg font-bold text-orange-700">
              🏆 {stats.achievements.length}
            </div>
            <div className="text-xs text-orange-600">Logros Desbloqueados</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}