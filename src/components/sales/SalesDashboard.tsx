import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Plus, 
  DollarSign, 
  Percent, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  MapPin,
  Sparkles
} from 'lucide-react';
import { OperatingZone } from '../../types/titan';

interface SalesDashboardProps {
  onStartNewProspect: () => void;
  onOpenProspect: (id: string) => void;
  onOpenQuote: (id: string) => void;
  onOpenContract: (id: string) => void;
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({
  onStartNewProspect,
  onOpenProspect,
  onOpenQuote,
  onOpenContract,
}) => {
  const [periodFilter, setPeriodFilter] = useState('Mes actual');
  const [executiveFilter, setExecutiveFilter] = useState('Ana López');
  const [stageFilter, setStageFilter] = useState('Todas');
  const [zoneFilter, setZoneFilter] = useState<string>('Todas');

  const mockOpportunities = [
    {
      id: 'P-0001',
      businessName: 'Restaurante El Roble',
      contact: 'Luis Martínez (Gerente)',
      zone: 'CENTRO' as OperatingZone,
      service: 'Control de plagas urbanas (Mediano)',
      stage: 'Cerrado / Contrato Activo',
      monthlyPrice: 8000,
      contractValue: 122960,
      executive: 'Ana López',
      contractFolio: 'TIT-2026-00125',
      date: '29 Sep 2026',
    },
    {
      id: 'P-0002',
      businessName: 'Hotel Valle Real',
      contact: 'Carlos Garza (Compras)',
      zone: 'SUR' as OperatingZone,
      service: 'Manejo Integral de Plagas (Grande)',
      stage: 'Cotización Enviada',
      monthlyPrice: 14500,
      contractValue: 174000,
      executive: 'Ana López',
      contractFolio: 'Pendiente',
      date: '28 Sep 2026',
    },
    {
      id: 'P-0003',
      businessName: 'Distribuidora Logística Norte',
      contact: 'Lic. Javier Salinas',
      zone: 'NORTE' as OperatingZone,
      service: 'Servicio Especial Roedores + MIP',
      stage: 'Visita Agendada',
      monthlyPrice: 11200,
      contractValue: 134400,
      executive: 'Ana López',
      contractFolio: 'Pendiente',
      date: '30 Sep 2026',
    },
    {
      id: 'P-0004',
      businessName: 'Clínica Dental San Pedro',
      contact: 'Dra. Marcela Quiroga',
      zone: 'SUR' as OperatingZone,
      service: 'Control Sanitario Preventivo',
      stage: 'Prospecto Nuevo',
      monthlyPrice: 5800,
      contractValue: 69600,
      executive: 'Ana López',
      contractFolio: 'Pendiente',
      date: '27 Sep 2026',
    },
  ];

  const filteredOpps = mockOpportunities.filter((opp) => {
    if (zoneFilter !== 'Todas' && opp.zone !== zoneFilter) return false;
    return true;
  });

  return (
    <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 w-full max-w-full overflow-hidden">
      {/* Top Banner & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0f121b] border border-[#2b2416] p-4 sm:p-5 rounded-2xl shadow-xl w-full overflow-hidden">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#f59e0b] mb-1">
            <span>Pantalla 01</span>
            <span className="text-slate-600">·</span>
            <span className="truncate">Control Comercial</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-brand font-black text-white truncate">
            DASHBOARD DE VENTAS TITAN
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
            Consulta consolidada de las pantallas operativas P02 (Prospecto), P03 (Cotización) y P04 (Cierre).
          </p>
        </div>

        <button
          onClick={onStartNewProspect}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4a34b] to-[#b3832c] hover:from-[#f59e0b] hover:to-[#c69233] text-black font-bold px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(212,163,75,0.4)] transition-all shrink-0 text-xs"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Nuevo Prospecto</span>
        </button>
      </div>

      {/* Responsive Filters Bar: 100% fitted to mobile grid with zero overflow */}
      <div className="bg-[#121520] border border-[#262015] rounded-xl p-3 space-y-2.5 w-full max-w-full overflow-hidden">
        <div className="flex items-center gap-2 text-slate-400 text-xs">
          <Filter className="w-3.5 h-3.5 text-[#d4a34b] shrink-0" />
          <span className="font-semibold text-slate-200">Filtros Desplegables:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          {/* Periodo */}
          <div className="flex items-center justify-between gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1.5 rounded-lg text-xs w-full">
            <span className="text-slate-400 shrink-0">Periodo:</span>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer truncate text-right text-xs"
            >
              <option value="Hoy" className="bg-[#0a0c10]">Hoy</option>
              <option value="Semana actual" className="bg-[#0a0c10]">Semana actual</option>
              <option value="Mes actual" className="bg-[#0a0c10]">Mes actual</option>
              <option value="Trimestre" className="bg-[#0a0c10]">Trimestre</option>
              <option value="Año" className="bg-[#0a0c10]">Año</option>
            </select>
          </div>

          {/* Ejecutivo */}
          <div className="flex items-center justify-between gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1.5 rounded-lg text-xs w-full">
            <span className="text-slate-400 shrink-0">Ejecutivo:</span>
            <select
              value={executiveFilter}
              onChange={(e) => setExecutiveFilter(e.target.value)}
              className="bg-transparent text-[#f59e0b] font-semibold focus:outline-none cursor-pointer truncate text-right text-xs"
            >
              <option value="Ana López" className="bg-[#0a0c10]">Ana López (Tú)</option>
              <option value="Javier Ramos" className="bg-[#0a0c10]">Javier Ramos</option>
              <option value="Todos" className="bg-[#0a0c10]">Todos</option>
            </select>
          </div>

          {/* Etapa */}
          <div className="flex items-center justify-between gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1.5 rounded-lg text-xs w-full">
            <span className="text-slate-400 shrink-0">Etapa:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer truncate text-right text-xs"
            >
              <option value="Todas" className="bg-[#0a0c10]">Todas las Etapas</option>
              <option value="Prospectos" className="bg-[#0a0c10]">Prospectos</option>
              <option value="Visitas" className="bg-[#0a0c10]">Visitas</option>
              <option value="Cotizaciones" className="bg-[#0a0c10]">Cotizaciones</option>
              <option value="Cerrados" className="bg-[#0a0c10]">Cerrados</option>
            </select>
          </div>

          {/* Zona Operativa */}
          <div className="flex items-center justify-between gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1.5 rounded-lg text-xs w-full">
            <span className="text-slate-400 shrink-0">Zona:</span>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-transparent text-[#d4a34b] font-bold focus:outline-none cursor-pointer truncate text-right text-xs"
            >
              <option value="Todas" className="bg-[#0a0c10]">Todas las Zonas</option>
              <option value="NORTE" className="bg-[#0a0c10]">Zona Norte</option>
              <option value="CENTRO" className="bg-[#0a0c10]">Zona Centro</option>
              <option value="SUR" className="bg-[#0a0c10]">Zona Sur</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full">
        {/* KPI 1: Prospectos */}
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-3 sm:p-4 overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="truncate">Prospectos</span>
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a34b] shrink-0" />
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold font-mono-tabular text-white">28</div>
          <div className="mt-1 text-[10px] text-slate-400 truncate">
            Visitas: <strong className="text-white">19</strong>
          </div>
        </div>

        {/* KPI 2: Cotizaciones */}
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-3 sm:p-4 overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="truncate">Cotizaciones</span>
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4a34b] shrink-0" />
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold font-mono-tabular text-white">16</div>
          <div className="mt-1 text-[10px] text-[#f59e0b] truncate">
            Motor v9 protegido
          </div>
        </div>

        {/* KPI 3: Importe Vendido */}
        <div className="bg-[#11141e] border border-[#3b2f18] rounded-xl p-3 sm:p-4 overflow-hidden bg-gradient-to-br from-[#11141e] to-[#1c160b]">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="truncate">Importe Vendido</span>
            <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f59e0b] shrink-0" />
          </div>
          <div className="mt-1.5 text-lg sm:text-2xl font-bold font-mono-tabular text-[#f59e0b] truncate">
            $ 428,560
          </div>
          <div className="mt-1 text-[10px] text-slate-400 truncate">
            Ticket: $ 8,920/m
          </div>
        </div>

        {/* KPI 4: Conversión */}
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-3 sm:p-4 overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="truncate">Conversión</span>
            <Percent className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10b981] shrink-0" />
          </div>
          <div className="mt-1.5 text-xl sm:text-2xl font-bold font-mono-tabular text-white">43.7%</div>
          <div className="mt-1 text-[10px] text-[#10b981] truncate">
            Comisión: $ 34,284
          </div>
        </div>
      </div>

      {/* Commercial Table with self-contained horizontal scroll */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl w-full max-w-full">
        <div className="p-3 sm:p-4 border-b border-[#241c12] flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a34b]" />
              Expedientes Comerciales Activos
            </h3>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              Toca cualquier registro para abrirlo directamente.
            </p>
          </div>

          <div className="text-[10px] text-[#d4a34b] font-semibold bg-[#1a160d] border border-[#3f3117] px-2 py-0.5 rounded">
            {filteredOpps.length} expedientes
          </div>
        </div>

        {/* The table scrolls cleanly within its own box without moving the page */}
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead className="bg-[#0b0d13] text-slate-400 border-b border-[#231b11] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Folio</th>
                <th className="py-2.5 px-3">Prospecto / Empresa</th>
                <th className="py-2.5 px-3">Zona</th>
                <th className="py-2.5 px-3">Etapa</th>
                <th className="py-2.5 px-3 text-right">Precio/Mes</th>
                <th className="py-2.5 px-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {filteredOpps.map((opp) => (
                <tr 
                  key={opp.id} 
                  className="hover:bg-[#161a26] transition-colors cursor-pointer group"
                  onClick={() => {
                    if (opp.stage.includes('Cerrado')) onOpenContract(opp.id);
                    else if (opp.stage.includes('Cotización')) onOpenQuote(opp.id);
                    else onOpenProspect(opp.id);
                  }}
                >
                  <td className="py-2.5 px-3 font-mono-tabular font-bold text-[#d4a34b]">
                    {opp.id}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-white group-hover:text-[#f59e0b] transition-colors truncate max-w-[180px]">
                      {opp.businessName}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{opp.contact}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="inline-flex items-center gap-1 font-bold text-[10px] px-1.5 py-0.5 rounded bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30">
                      <MapPin className="w-2.5 h-2.5" />
                      {opp.zone}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${
                      opp.stage.includes('Cerrado') ? 'text-[#10b981]' : 'text-[#f59e0b]'
                    }`}>
                      {opp.stage.includes('Cerrado') && <CheckCircle2 className="w-3 h-3" />}
                      {opp.stage}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono-tabular font-bold text-white">
                    ${opp.monthlyPrice.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      className="p-1 rounded bg-[#1a1e2b] text-slate-300 group-hover:text-black group-hover:bg-[#d4a34b] transition-colors"
                      title="Abrir"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
