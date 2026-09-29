import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Filter, 
  ArrowUpRight, 
  Eye, 
  CheckCircle2, 
  Clock, 
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
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner & Primary Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0f121b] border border-[#2b2416] p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Pantalla 01</span>
            <span className="text-slate-600">·</span>
            <span>Control y Trazabilidad Comercial</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            DASHBOARD DE VENTAS TITAN
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Consulta consolidada de las pantallas operativas P02 (Prospecto), P03 (Cotización) y P04 (Cierre). Toda cifra enlaza a su expediente origen.
          </p>
        </div>

        <button
          onClick={onStartNewProspect}
          className="flex items-center gap-2 bg-gradient-to-r from-[#d4a34b] to-[#b3832c] hover:from-[#f59e0b] hover:to-[#c69233] text-black font-bold px-4 py-2.5 rounded-xl shadow-[0_0_15px_rgba(212,163,75,0.4)] transition-all shrink-0 hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Nuevo Prospecto / Levantamiento</span>
        </button>
      </div>

      {/* Filters Bar matching Section 3.2 */}
      <div className="bg-[#121520] border border-[#262015] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Filter className="w-3.5 h-3.5 text-[#d4a34b]" />
          <span className="font-semibold text-slate-200">Filtros Desplegables:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Periodo */}
          <div className="flex items-center gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1 rounded-lg">
            <span className="text-slate-400">Periodo:</span>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="Hoy" className="bg-[#0a0c10]">Hoy</option>
              <option value="Semana actual" className="bg-[#0a0c10]">Semana actual</option>
              <option value="Mes actual" className="bg-[#0a0c10]">Mes actual</option>
              <option value="Trimestre" className="bg-[#0a0c10]">Trimestre</option>
              <option value="Año" className="bg-[#0a0c10]">Año</option>
            </select>
          </div>

          {/* Ejecutivo */}
          <div className="flex items-center gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1 rounded-lg">
            <span className="text-slate-400">Ejecutivo:</span>
            <select
              value={executiveFilter}
              onChange={(e) => setExecutiveFilter(e.target.value)}
              className="bg-transparent text-[#f59e0b] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="Ana López" className="bg-[#0a0c10]">Ana López (Tú)</option>
              <option value="Javier Ramos" className="bg-[#0a0c10]">Javier Ramos</option>
              <option value="Todos" className="bg-[#0a0c10]">Todos los Ejecutivos</option>
            </select>
          </div>

          {/* Etapa */}
          <div className="flex items-center gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1 rounded-lg">
            <span className="text-slate-400">Etapa:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="Todas" className="bg-[#0a0c10]">Todas las Etapas</option>
              <option value="Prospectos" className="bg-[#0a0c10]">Prospectos</option>
              <option value="Visitas" className="bg-[#0a0c10]">Visitas Agendadas</option>
              <option value="Cotizaciones" className="bg-[#0a0c10]">Cotizaciones</option>
              <option value="Cerrados" className="bg-[#0a0c10]">Contratos Cerrados</option>
            </select>
          </div>

          {/* Zona Operativa */}
          <div className="flex items-center gap-1.5 bg-[#0a0c10] border border-[#292215] px-2.5 py-1 rounded-lg">
            <span className="text-slate-400">Zona:</span>
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="bg-transparent text-[#d4a34b] font-bold focus:outline-none cursor-pointer"
            >
              <option value="Todas" className="bg-[#0a0c10]">Todas las Zonas</option>
              <option value="NORTE" className="bg-[#0a0c10]">Zona Norte</option>
              <option value="CENTRO" className="bg-[#0a0c10]">Zona Centro</option>
              <option value="SUR" className="bg-[#0a0c10]">Zona Sur</option>
            </select>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (Section 3.1 & 3.3) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Prospectos & Visitas */}
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Prospectos Captados</span>
            <Users className="w-4 h-4 text-[#d4a34b]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono-tabular text-white">28</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Visitas agendadas: <strong className="text-white">19</strong></span>
            <span className="text-[#10b981] font-semibold">+14% vs mes ant.</span>
          </div>
        </div>

        {/* KPI 2: Cotizaciones Generadas */}
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Cotizaciones Emitidas</span>
            <FileText className="w-4 h-4 text-[#d4a34b]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono-tabular text-white">16</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Motor oculto v9: <strong className="text-[#f59e0b]">100% blindado</strong></span>
          </div>
        </div>

        {/* KPI 3: Importe Vendido Acumulado */}
        <div className="bg-[#11141e] border border-[#3b2f18] rounded-xl p-4 relative overflow-hidden shadow-lg bg-gradient-to-br from-[#11141e] to-[#1c160b]">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Importe Vendido (Anual)</span>
            <DollarSign className="w-4 h-4 text-[#f59e0b]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono-tabular text-[#f59e0b]">$ 428,560</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Ticket promedio: <strong className="text-white font-mono-tabular">$ 8,920/mes</strong></span>
          </div>
        </div>

        {/* KPI 4: Tasa de Conversión & Comisiones */}
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Tasa de Conversión</span>
            <Percent className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono-tabular text-white">43.7%</div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
            <span>Comisión ejecutiva (8%): <strong className="text-[#10b981] font-mono-tabular">$ 34,284</strong></span>
          </div>
        </div>
      </div>

      {/* Commercial Pipeline & Opportunity Table with Traceability */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#241c12] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4a34b]" />
              Expedientes Comerciales Activos y Trazabilidad Punta a Punta
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Haz clic en cualquier renglón para acceder directamente a la pantalla correspondiente.
            </p>
          </div>

          <div className="text-xs text-[#d4a34b] font-semibold bg-[#1a160d] border border-[#3f3117] px-3 py-1 rounded-lg">
            {filteredOpps.length} expedientes en vista
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b0d13] text-slate-400 border-b border-[#231b11] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Folio / ID</th>
                <th className="py-3 px-4">Prospecto / Empresa</th>
                <th className="py-3 px-4">Zona</th>
                <th className="py-3 px-4">Servicio Contratado</th>
                <th className="py-3 px-4">Etapa Actual</th>
                <th className="py-3 px-4 text-right">Precio Mensual</th>
                <th className="py-3 px-4 text-right">Valor Contrato</th>
                <th className="py-3 px-4 text-center">Acciones</th>
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
                  <td className="py-3.5 px-4 font-mono-tabular font-bold text-[#d4a34b]">
                    {opp.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white group-hover:text-[#f59e0b] transition-colors">
                      {opp.businessName}
                    </div>
                    <div className="text-[10px] text-slate-400">{opp.contact}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-2 py-0.5 rounded ${
                      opp.zone === 'CENTRO' 
                        ? 'bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30'
                        : opp.zone === 'NORTE'
                        ? 'bg-[#3b82f6]/15 text-[#60a5fa] border border-[#3b82f6]/30'
                        : 'bg-[#10b981]/15 text-[#34d399] border border-[#10b981]/30'
                    }`}>
                      <MapPin className="w-2.5 h-2.5" />
                      {opp.zone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {opp.service}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                      opp.stage.includes('Cerrado') 
                        ? 'text-[#10b981]' 
                        : opp.stage.includes('Cotización') 
                        ? 'text-[#f59e0b]'
                        : 'text-slate-300'
                    }`}>
                      {opp.stage.includes('Cerrado') && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {opp.stage}
                    </span>
                    {opp.contractFolio !== 'Pendiente' && (
                      <div className="text-[10px] text-slate-500 font-mono-tabular">{opp.contractFolio}</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono-tabular font-bold text-white">
                    ${opp.monthlyPrice.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">/mes</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono-tabular text-slate-300">
                    ${opp.contractValue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (opp.stage.includes('Cerrado')) onOpenContract(opp.id);
                        else if (opp.stage.includes('Cotización')) onOpenQuote(opp.id);
                        else onOpenProspect(opp.id);
                      }}
                      className="p-1.5 rounded-lg bg-[#1a1e2b] hover:bg-[#d4a34b] text-slate-300 hover:text-black transition-colors"
                      title="Abrir expediente"
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
