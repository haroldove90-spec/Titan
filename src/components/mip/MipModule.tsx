import React, { useState } from 'react';
import { 
  Crosshair, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Map, 
  Activity, 
  ShieldAlert,
  Flame,
  X
} from 'lucide-react';
import { MipStation } from '../../types/titan';

interface MipModuleProps {
  stations: MipStation[];
  onUpdateStation?: (station: MipStation) => void;
}

export const MipModule: React.FC<MipModuleProps> = ({ stations }) => {
  const [selectedStation, setSelectedStation] = useState<MipStation | null>(stations[0] || null);
  const [activeTab, setActiveTab] = useState<'croquis' | 'lista'>('croquis');

  return (
    <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-200 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Header */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Manejo Integral de Plagas (MIP)</span>
            <span className="text-slate-600">·</span>
            <span>Auditable por Salubridad</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            MAPAS, ESTACIONES Y MONITOREO MIP
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Croquis georreferenciado del inmueble con trazabilidad individual por cebadera, trampa UV y testigo. Vinculado al expediente único del cliente.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('croquis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'croquis'
                ? 'bg-[#d4a34b] text-black shadow'
                : 'bg-[#181d2a] text-slate-400 hover:text-white'
            }`}
          >
            Croquis Interactivo
          </button>
          <button
            onClick={() => setActiveTab('lista')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'lista'
                ? 'bg-[#d4a34b] text-black shadow'
                : 'bg-[#181d2a] text-slate-400 hover:text-white'
            }`}
          >
            Listado de Dispositivos ({stations.length})
          </button>
        </div>
      </div>

      {/* Main MIP View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-full min-w-0 overflow-hidden">
        {/* Left: Croquis / Interactive Blueprint */}
        <div className="lg:col-span-8 bg-[#0d1017] border border-[#292215] rounded-xl p-4 shadow-xl space-y-3 min-w-0 w-full">
          <div className="flex items-center justify-between text-xs border-b border-[#211b11] pb-2">
            <span className="font-bold text-white flex items-center gap-2">
              <Map className="w-4 h-4 text-[#d4a34b]" />
              Plano de Monitoreo: Restaurante El Roble (Planta Baja y Almacén)
            </span>
            <span className="text-[10px] text-[#f59e0b] font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> Mapa de calor de consumo activo
            </span>
          </div>

          {/* Interactive Tactical Blueprint Box */}
          <div className="relative w-full h-80 sm:h-96 bg-[#090b10] border border-[#261f14] rounded-lg overflow-hidden flex items-center justify-center p-4">
            {/* Grid blueprint lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c2333_1px,transparent_1px),linear-gradient(to_bottom,#1c2333_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />

            {/* Simulated architectural zones */}
            <div className="absolute left-6 top-6 w-48 h-36 border border-slate-700/60 rounded bg-slate-900/30 p-2 text-[10px] text-slate-500 font-mono">
              Cocina Caliente & Tarjas
            </div>
            <div className="absolute right-8 top-6 w-44 h-48 border border-slate-700/60 rounded bg-slate-900/30 p-2 text-[10px] text-slate-500 font-mono">
              Salón Comedor
            </div>
            <div className="absolute left-6 bottom-6 w-60 h-32 border border-slate-700/60 rounded bg-slate-900/30 p-2 text-[10px] text-slate-500 font-mono">
              Bodega Secos & Cámaras
            </div>

            {/* Interactive Stations Pins */}
            {stations.map((st) => {
              const isSelected = selectedStation?.id === st.id;
              const hasActivity = st.status === 'actividad_detectada';
              return (
                <button
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  style={{ left: `${st.xPercent}%`, top: `${st.yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border shadow-lg transition-transform ${
                    hasActivity 
                      ? 'bg-red-950 text-red-300 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.7)] animate-pulse'
                      : isSelected
                      ? 'bg-[#f59e0b] text-black border-white shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                      : 'bg-[#151926] text-[#d4a34b] border-[#3e3218]'
                  }`}>
                    {st.code}
                  </div>
                  <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 -top-7 bg-black text-white text-[9px] px-1.5 py-0.5 rounded border border-slate-700 whitespace-nowrap z-40">
                    {st.type} - {st.zoneArea}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> Estado Óptimo (3)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" /> Actividad Detectada (1)
              </span>
            </div>
            <span className="text-slate-500 font-mono-tabular">Última inspección: 29/09/2026</span>
          </div>
        </div>

        {/* Right: Station Detailed Card */}
        <div className="lg:col-span-4 bg-[#10131d] border border-[#292215] rounded-xl p-4 shadow-xl space-y-4 min-w-0 w-full">
          <div className="border-b border-[#211a11] pb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[#d4a34b]">Ficha Técnica del Dispositivo</span>
            {selectedStation && (
              <span className="font-mono-tabular font-bold text-xs bg-[#1f190e] border border-[#4a391c] px-2 py-0.5 rounded text-[#f59e0b]">
                {selectedStation.code}
              </span>
            )}
          </div>

          {selectedStation ? (
            <div className="space-y-3 text-xs">
              <div className="bg-[#0b0e14] p-3 rounded-lg border border-[#231b11] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tipo:</span>
                  <span className="font-bold text-white">{selectedStation.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ubicación física:</span>
                  <span className="text-slate-300">{selectedStation.zoneArea}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Estado operativo:</span>
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    selectedStation.status === 'actividad_detectada'
                      ? 'bg-red-950 text-red-300 border border-red-700'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                  }`}>
                    {selectedStation.status}
                  </span>
                </div>
              </div>

              <div className="bg-[#0b0e14] p-3 rounded-lg border border-[#231b11] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Consumo de cebo:</span>
                  <span className="font-mono-tabular font-bold text-white">
                    {selectedStation.lastConsumptionGrams} gramos
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Última revisión:</span>
                  <span className="font-mono-tabular text-slate-300">{selectedStation.lastCheckedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Técnico auditor:</span>
                  <span className="text-[#d4a34b]">{selectedStation.inspectedBy}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-[#161a25] p-2.5 rounded-lg border border-[#242c3d]">
                <strong>Acción correctiva sugerida:</strong>{' '}
                {selectedStation.status === 'actividad_detectada'
                  ? 'Reabastecer bloque anticoagulante y colocar trampa de goma complementaria en perímetro.'
                  : 'Dispositivo limpio y con cebo fresco. Monitoreo rutinario sin novedades.'}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 text-xs">
              Selecciona una estación en el croquis para ver detalles.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
