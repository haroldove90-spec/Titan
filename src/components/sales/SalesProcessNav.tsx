import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export type SalesStep = 'dashboard' | 'prospecto' | 'cotizacion' | 'cierre';

interface SalesProcessNavProps {
  currentStep: SalesStep;
  onSelectStep: (step: SalesStep) => void;
  canNavigateToCotizacion?: boolean;
  canNavigateToCierre?: boolean;
}

export const SalesProcessNav: React.FC<SalesProcessNavProps> = ({
  currentStep,
  onSelectStep,
  canNavigateToCotizacion = true,
  canNavigateToCierre = true,
}) => {
  return (
    <div className="bg-[#0b0d13] border-b border-[#2a2215] px-4 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md">
      {/* Return to Sales Dashboard */}
      <button
        onClick={() => onSelectStep('dashboard')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          currentStep === 'dashboard'
            ? 'bg-[#d4a34b] text-black shadow-[0_0_12px_rgba(212,163,75,0.4)]'
            : 'bg-[#141722] border border-[#2b2417] text-slate-300 hover:text-white hover:border-[#d4a34b]'
        }`}
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        <span>Dashboard Ventas (P01)</span>
      </button>

      {/* Stepper matching screenshot: (1) Prospecto -> (2) Cotización -> (3) Cierre */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Step 1 */}
        <button
          onClick={() => onSelectStep('prospecto')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentStep === 'prospecto'
              ? 'bg-[#d4a34b] text-black shadow-[0_0_14px_rgba(212,163,75,0.5)]'
              : 'bg-[#12151f] border border-[#2c2314] text-slate-300 hover:border-[#d4a34b]/60'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
            currentStep === 'prospecto' ? 'bg-black text-[#d4a34b]' : 'bg-[#211a10] text-[#d4a34b]'
          }`}>
            1
          </span>
          <span>Prospecto / Levantamiento</span>
        </button>

        <span className="text-[#3f341d] font-bold">›</span>

        {/* Step 2 */}
        <button
          onClick={() => canNavigateToCotizacion && onSelectStep('cotizacion')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentStep === 'cotizacion'
              ? 'bg-[#d4a34b] text-black shadow-[0_0_14px_rgba(212,163,75,0.5)]'
              : 'bg-[#12151f] border border-[#2c2314] text-slate-300 hover:border-[#d4a34b]/60'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
            currentStep === 'cotizacion' ? 'bg-black text-[#d4a34b]' : 'bg-[#211a10] text-[#d4a34b]'
          }`}>
            2
          </span>
          <span>Cotización / Seguimiento</span>
        </button>

        <span className="text-[#3f341d] font-bold">›</span>

        {/* Step 3 */}
        <button
          onClick={() => canNavigateToCierre && onSelectStep('cierre')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentStep === 'cierre'
              ? 'bg-[#d4a34b] text-black shadow-[0_0_14px_rgba(212,163,75,0.5)]'
              : 'bg-[#12151f] border border-[#2c2314] text-slate-300 hover:border-[#d4a34b]/60'
          }`}
        >
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
            currentStep === 'cierre' ? 'bg-black text-[#d4a34b]' : 'bg-[#211a10] text-[#d4a34b]'
          }`}>
            3
          </span>
          <span>Cierre / Contrato</span>
        </button>
      </div>

      {/* Principle Badge */}
      <div className="hidden xl:flex items-center text-[11px] text-slate-400 bg-[#12151e] border border-[#261f13] px-2.5 py-1 rounded">
        <span className="text-[#d4a34b] font-semibold mr-1">Ruta Comercial:</span> Sin recaptura de datos
      </div>
    </div>
  );
};
