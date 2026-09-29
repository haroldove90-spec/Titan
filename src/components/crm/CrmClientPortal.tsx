import React from 'react';
import { 
  Building2, 
  FileCheck, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Clock, 
  FileText 
} from 'lucide-react';
import { ContractData, ServiceExecution, MipStation } from '../../types/titan';

interface CrmClientPortalProps {
  contract: ContractData;
  services: ServiceExecution[];
  mipStations: MipStation[];
}

export const CrmClientPortal: React.FC<CrmClientPortalProps> = ({
  contract,
  services,
  mipStations,
}) => {
  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Portal del Cliente TITAN</span>
            <span className="text-slate-600">·</span>
            <span>Expediente Digital Transparente</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            BIENVENIDO, RESTAURANTE EL ROBLE
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Folio Único: <strong className="text-[#f59e0b] font-mono-tabular">{contract.clientFolio}</strong> · Contrato: <strong className="text-white font-mono-tabular">{contract.contractFolio}</strong>
          </p>
        </div>

        <div className="bg-[#151926] border border-[#2b2214] px-4 py-2.5 rounded-xl text-xs space-y-0.5">
          <div className="text-[10px] uppercase font-bold text-slate-400">Estado del Inmueble</div>
          <div className="text-[#10b981] font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> 100% Protegido y Certificado
          </div>
        </div>
      </div>

      {/* Main Grid: Services History & MIP Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Certificados de Servicio NOM-256 */}
        <div className="lg:col-span-8 bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[#211a11] flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#d4a34b]" />
              Certificados y Bitácoras Digitales de Servicio
            </h3>
            <span className="text-[11px] text-slate-400 font-mono-tabular">Validez Oficial COFEPRIS</span>
          </div>

          <div className="p-4 space-y-3">
            {services.map((srv) => (
              <div 
                key={srv.id}
                className="bg-[#0b0e14] border border-[#241c12] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#d4a34b]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tabular font-bold text-xs text-[#10b981]">
                      {srv.certificateFolio || 'CERT-PROGRAMADO'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-tabular">
                      Fecha: {srv.scheduledDate} ({srv.scheduledTime})
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1">{srv.serviceType}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Aplicador asignado: {srv.assignedTechnician}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Descargando Certificado Oficial en PDF para ${srv.clientBusinessName}`)}
                    className="flex items-center gap-1.5 bg-[#171b26] hover:bg-[#d4a34b] text-slate-200 hover:text-black font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Estaciones de Monitoreo MIP */}
        <div className="lg:col-span-4 bg-[#10131d] border border-[#282115] rounded-xl p-4 shadow-xl space-y-3">
          <div className="border-b border-[#211a11] pb-2">
            <span className="text-xs font-bold text-[#d4a34b]">
              Red de Monitoreo MIP en su Inmueble
            </span>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {mipStations.length} dispositivos geocodificados
            </div>
          </div>

          <div className="space-y-2">
            {mipStations.map((st) => (
              <div
                key={st.id}
                className="bg-[#0b0e14] border border-[#211a11] rounded-lg p-2.5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white font-mono-tabular flex items-center gap-1.5">
                    <span className="text-[#f59e0b]">{st.code}</span>
                    <span>{st.type}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{st.zoneArea}</div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  st.status === 'actividad_detectada'
                    ? 'bg-red-950 text-red-300 border border-red-700'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                }`}>
                  {st.status === 'actividad_detectada' ? 'Alerta' : 'Controlado'}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#211a11] text-[11px] text-slate-400 text-center">
            Próxima visita de mantenimiento preventivo: <strong className="text-white">06 Octubre 2026</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
