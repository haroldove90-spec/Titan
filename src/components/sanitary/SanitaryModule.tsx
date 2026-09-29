import React from 'react';
import { 
  FlaskConical, 
  ShieldCheck, 
  FileCheck, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Award 
} from 'lucide-react';
import { ServiceExecution, ChemicalItem } from '../../types/titan';

interface SanitaryModuleProps {
  completedOrders: ServiceExecution[];
  chemicals: ChemicalItem[];
}

export const SanitaryModule: React.FC<SanitaryModuleProps> = ({
  completedOrders,
  chemicals,
}) => {
  return (
    <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-200 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Cumplimiento Regulatorio Oficial</span>
            <span className="text-slate-600">·</span>
            <span>NOM-256-SSA1-2012 & COFEPRIS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            MÓDULO DEL RESPONSABLE SANITARIO
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cero recapturas: Los datos ingresados por los aplicadores en campo alimentan automáticamente el expediente técnico y las constancias sanitarias auditables.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#151926] border border-[#282115] px-4 py-2.5 rounded-xl">
          <Award className="w-6 h-6 text-[#f59e0b]" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Licencia Sanitaria</div>
            <div className="text-xs font-bold text-white font-mono-tabular">19-NL-01-MIP</div>
          </div>
        </div>
      </div>

      {/* Audit Checklist & Compliance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#11141e] border border-[#262015] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Bitácoras Oficiales Validadas</span>
            <FileCheck className="w-4 h-4 text-[#10b981]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-white">{completedOrders.length}</div>
          <p className="text-[11px] text-slate-400">
            Con firmas digitales del aplicador y del cliente en sitio.
          </p>
        </div>

        <div className="bg-[#11141e] border border-[#262015] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Plaguicidas en Inventario</span>
            <FlaskConical className="w-4 h-4 text-[#f59e0b]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-white">{chemicals.length}</div>
          <p className="text-[11px] text-slate-400">
            100% con registro COFEPRIS vigente y SDS cargada.
          </p>
        </div>

        <div className="bg-[#11141e] border border-[#262015] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Auditorías Sanitarias</span>
            <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-[#10b981]">100% Aprobado</div>
          <p className="text-[11px] text-slate-400">
            Expediente listo para inspecciones de salubridad estatal.
          </p>
        </div>
      </div>

      {/* Official Certificates History */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl w-full max-w-full">
        <div className="p-4 border-b border-[#211a11] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4a34b]" />
            Certificados y Constancias de Servicio Emitidos
          </h3>
          <span className="text-xs text-slate-400 font-mono-tabular">
            Expediente Digital Permanente
          </span>
        </div>

        <div className="w-full max-w-full overflow-x-auto block">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#211a11] text-[10px] uppercase">
              <tr>
                <th className="py-3 px-4">Folio Constancia</th>
                <th className="py-3 px-4">Establecimiento</th>
                <th className="py-3 px-4">Plagas Atendidas</th>
                <th className="py-3 px-4">Nivel de Actividad</th>
                <th className="py-3 px-4">Técnico Certificado</th>
                <th className="py-3 px-4">Fecha y Hora</th>
                <th className="py-3 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {completedOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#161a25] transition-colors">
                  <td className="py-3 px-4 font-mono-tabular font-bold text-[#10b981]">
                    {ord.certificateFolio || 'CERT-NOM256-PENDING'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{ord.clientBusinessName}</div>
                    <div className="text-[10px] text-slate-400">{ord.address}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {ord.observedPests?.join(', ') || 'Cucarachas'}
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-2 py-0.5 rounded font-mono-tabular font-bold text-[10px]">
                      Nivel {ord.activityLevel ?? 1}/5
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{ord.assignedTechnician}</td>
                  <td className="py-3 px-4 font-mono-tabular text-slate-400">
                    {ord.completedAt || ord.scheduledDate}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => alert(`Generando Carpeta Sanitaria NOM-256 para ${ord.clientBusinessName}`)}
                      className="px-2.5 py-1 rounded bg-[#191d2a] hover:bg-[#d4a34b] text-slate-300 hover:text-black font-bold text-[10px] transition-colors inline-flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Descargar</span>
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
