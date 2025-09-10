"use client";

import { DecisionHistory } from '@/types/job';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HistoryPanelProps {
  history: DecisionHistory[];
}

export function HistoryPanel({ history }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">📋 Historial de Decisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p>Aún no has tomado ninguna decisión.</p>
            <p className="text-sm mt-1">¡Acepta o rechaza tu primera oferta!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatSalary = (min: number, max: number) => {
    const avg = Math.round((min + max) / 2);
    return `$${avg.toLocaleString()}`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">📋 Historial de Decisiones</CardTitle>
        <p className="text-sm text-gray-600">Últimas {history.length} decisiones</p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-3 p-4">
            {history.map((decision) => (
              <div
                key={`${decision.offer.id}-${decision.timestamp.getTime()}`}
                className={`p-4 rounded-lg border-l-4 ${
                  decision.decision === 'accepted'
                    ? 'bg-green-50 border-l-green-500'
                    : 'bg-red-50 border-l-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {decision.offer.title}
                      </h3>
                      <Badge
                        variant={decision.decision === 'accepted' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {decision.decision === 'accepted' ? '✅ Aceptada' : '❌ Rechazada'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {decision.offer.company} • {decision.offer.location}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{formatSalary(decision.offer.salary.min, decision.offer.salary.max)}</span>
                      <span>{decision.offer.workMode}</span>
                      <span>{formatDate(decision.timestamp)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      decision.pointsEarned > 0 ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      +{decision.pointsEarned} pts
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}