"use client";

import { Button } from '@/components/ui/button';

interface DecisionButtonsProps {
  onAccept: () => void;
  onReject: () => void;
  disabled?: boolean;
}

export function DecisionButtons({ onAccept, onReject, disabled = false }: DecisionButtonsProps) {
  return (
    <div className="flex gap-4 justify-center mt-8">
      <Button
        onClick={onReject}
        disabled={disabled}
        variant="outline"
        size="lg"
        className="px-12 py-6 text-lg font-semibold border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 min-w-[150px]"
      >
        ❌ Rechazar
      </Button>
      <Button
        onClick={onAccept}
        disabled={disabled}
        size="lg"
        className="px-12 py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition-all duration-200 min-w-[150px]"
      >
        ✅ Aceptar
      </Button>
    </div>
  );
}