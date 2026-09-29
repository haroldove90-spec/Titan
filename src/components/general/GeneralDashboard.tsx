import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Users, 
  Bug, 
  Calendar, 
  PieChart, 
  BarChart3, 
  ArrowUpRight, 
  Filter, 
  CheckCircle2,
  MapPin,
  Sparkles
} from 'lucide-react';
import { OperatingZone } from '../../types/titan';

interface GeneralDashboardProps {
  onNavigateToModule: (moduleKey: string) => void;
}

export const GeneralDashboard: React.FC<GeneralDashboardProps> = ({ onNavigateToModule }) => {
  const [period, setPeriod] = useState('Mes actual');

  const clientProfitabilityData = [
    {
      clientName: 'Restaurante El Roble S.A. de C.V.',
      zone: 'CENTRO' as OperatingZone,
      serviceType: 'Control de Plagas Urbanas',
      incomeBilled: 8000,
      directChemicalCost: 850,
      techHoursCost: 920,
      logisticsCost: 350,
      salesCommission: 640,
      realMargin: 5240,
      marginPercent: 65.5,
    },
    {
      clientName: 'Hotel Gran Plaza Monterrey',
      zone: 'CENTRO' as OperatingZone,
      serviceType: 'MIP Integral Hotelero',
      incomeBilled: 14500,
      directChemicalCost: 1950,
      techHoursCost: 1840,
      logisticsCost: 600,
      salesCommission: 1160,
      realMargin: 8950,
      marginPercent: 61.7,
    },
    {
      clientName: 'Distribuidora Logística Norte',
      zone: 'NORTE' as OperatingZone,
      serviceType: 'Roedores Perimetral + MIP',
      incomeBilled: 11200,
      directChemicalCost: 1600,
      techHoursCost: 1380,
      logisticsCost: 850,
      salesCommission: 896,
      realMargin: 6474,
      marginPercent: 57.8,
    },
  ];

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Sección 21 del Sistema</span>
            <span className="text-slate-600">·</span>
            <span>Acceso Integral Sin Candados</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            DASHBOARD GENERAL DE DIRECCIÓN
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Concentración ejecutiva en tiempo real: Resultados comerciales, cumplimiento operativo en ruta, cobranza bancaria y rentabilidad real neta por cliente.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#161a25] border border-[#2d2417] px-3.5 py-1.5 rounded-xl text-xs">
          <span className="text-slate-400">Periodo de Análisis:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-transparent text-[#f59e0b] font-bold focus:outline-none cursor-pointer"
          >
            <option value="Mes actual" className="bg-[#10131d]">Mes actual (Septiembre 2026)</option>
            <option value="Trimestre" className="bg-[#10131d]">T3 2026</option>
            <option value="Año" className="bg-[#10131d]">Año 2026</option>
          </select>
        </div>
      </div>

      {/* High Level Executive KPI Matrix */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Facturación Mensual Recurrente</span>
            <DollarSign className="w-4 h-4 text-[#f59e0b]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-white">$ 168,500</div>
          <div className="text-[11px] text-[#10b981] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs mes anterior
          </div>
        </div>

        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Utilidad Bruta Operativa</span>
            <Sparkles className="w-4 h-4 text-[#d4a34b]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-[#f59e0b]">$ 102,785</div>
          <div className="text-[11px] text-slate-400">
            Margen promedio consolidado: <strong className="text-white font-mono-tabular">61.0%</strong>
          </div>
        </div>

        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Efectividad Operativa Rutas</span>
            <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-white">98.2%</div>
          <div className="text-[11px] text-slate-400">
            44 de 45 servicios concluidos en horario
          </div>
        </div>

        <div className="bg-[#11141e] border border-[#282115] rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cartera Sana (Cobranza)</span>
            <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-white">94.1%</div>
          <div className="text-[11px] text-slate-400">
            Conciliación SPEI automática al día
          </div>
        </div>
      </div>

      {/* Rentabilidad por Cliente (Sección 20.2 del PDF) */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl space-y-3">
        <div className="p-4 border-b border-[#211a11] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#d4a34b]" />
              20.2 Análisis de Rentabilidad Real por Cliente y Margen Neto
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Fórmula maestra: <strong className="text-[#f59e0b]">INGRESO DEL CLIENTE − COSTOS DIRECTOS TRAZABLES = MARGEN REAL DEL CLIENTE</strong>
            </p>
          </div>
          <span className="text-[10px] text-slate-500 font-mono-tabular">
            Costos: Químicos + Horas Técnicas + Combustible + Comisión
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#211a11] text-[10px] uppercase">
              <tr>
                <th className="py-3 px-4">Cliente / Inmueble</th>
                <th className="py-3 px-4">Zona</th>
                <th className="py-3 px-4 text-right">Ingreso Cobrado</th>
                <th className="py-3 px-4 text-right">Costo Químico</th>
                <th className="py-3 px-4 text-right">Horas Técnicas</th>
                <th className="py-3 px-4 text-right">Logística / Ruta</th>
                <th className="py-3 px-4 text-right">Comisión</th>
                <th className="py-3 px-4 text-right">Margen Real</th>
                <th className="py-3 px-4 text-center">% Margen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {clientProfitabilityData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#161a25] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{row.clientName}</div>
                    <div className="text-[10px] text-slate-500">{row.serviceType}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-2 py-0.5 rounded text-[10px] font-bold">
                      {row.zone}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular font-bold text-white">
                    ${row.incomeBilled.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular text-slate-400">
                    ${row.directChemicalCost.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular text-slate-400">
                    ${row.techHoursCost.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular text-slate-400">
                    ${row.logisticsCost.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular text-slate-400">
                    ${row.salesCommission.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono-tabular font-extrabold text-[#10b981] text-sm">
                    ${row.realMargin.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-center font-mono-tabular font-bold text-[#f59e0b]">
                    {row.marginPercent}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Navigation Cards to Other Modules */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Ir a Ventas (P01)', key: 'ventas', desc: 'Embudo comercial y cotizaciones' },
          { label: 'Ir a Servicios', key: 'servicios', desc: 'Rutas GPS y bitácoras de campo' },
          { label: 'Ir a Administración', key: 'administracion', desc: 'CxC, bancos y facturación' },
          { label: 'Ir a Resp. Sanitario', key: 'responsable_sanitario', desc: 'Cumplimiento NOM-256' },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => onNavigateToModule(btn.key)}
            className="p-3 rounded-xl bg-[#11141e] border border-[#282115] hover:border-[#d4a34b] text-left transition-colors group"
          >
            <div className="text-xs font-bold text-white group-hover:text-[#f59e0b] flex items-center justify-between">
              <span>{btn.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8b7340] group-hover:text-[#f59e0b]" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{btn.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
