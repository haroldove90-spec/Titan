import React, { useState } from 'react';
import { 
  Bug, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Navigation, 
  Camera, 
  FileCheck, 
  PenTool, 
  AlertTriangle, 
  ShieldCheck, 
  X,
  Play,
  RotateCcw
} from 'lucide-react';
import { ServiceExecution, ChemicalItem } from '../../types/titan';

interface ServicesModuleProps {
  orders: ServiceExecution[];
  chemicals: ChemicalItem[];
  onCompleteService: (updatedOrder: ServiceExecution) => void;
}

export const ServicesModule: React.FC<ServicesModuleProps> = ({
  orders,
  chemicals,
  onCompleteService,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<ServiceExecution | null>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'execute' | null>(null);

  // Execution modal state
  const [execActivityLevel, setExecActivityLevel] = useState<0 | 1 | 2 | 3 | 4 | 5>(1);
  const [execArea, setExecArea] = useState('Cocina Caliente y Almacén Seco');
  const [execCriticalPoints, setExecCriticalPoints] = useState('Sellado de zoclo en tarja y desagüe perimetral');
  const [execObservations, setExecObservations] = useState('Tratamiento focalizado en grietas con gel cucarachicida.');
  const [selectedChemId, setSelectedChemId] = useState(chemicals[0]?.id || '');
  const [chemDose, setChemDose] = useState('30 ml');
  const [appMethod, setAppMethod] = useState('Aspersión localizada y cebado en gel');
  const [clientSigner, setClientSigner] = useState('Luis Martínez');

  const handleStartService = (order: ServiceExecution) => {
    setSelectedOrder(order);
    setActiveModal('execute');
  };

  const handleFinishService = () => {
    if (!selectedOrder) return;
    const chosenProduct = chemicals.find((c) => c.id === selectedChemId);
    const updated: ServiceExecution = {
      ...selectedOrder,
      status: 'completado',
      checkInTime: '08:32',
      checkOutTime: '10:15',
      effectiveMinutes: 103,
      transitMinutes: 18,
      activityLevel: execActivityLevel,
      inspectedArea: execArea,
      criticalPoints: execCriticalPoints,
      findingsObservation: execObservations,
      appliedChemicals: [
        {
          productId: selectedChemId,
          productName: chosenProduct?.tradeName || 'Demand Duo CS',
          batchNumber: chosenProduct?.batchNumber || 'L-SYN-2026-08',
          doseUsed: chemDose,
          applicationMethod: appMethod,
        },
      ],
      clientSignerName: clientSigner,
      certificateFolio: `CERT-NOM256-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      completedAt: new Date().toLocaleString('es-MX'),
    };

    onCompleteService(updated);
    setActiveModal(null);
    setSelectedOrder(null);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-200 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Módulo Operativo</span>
            <span className="text-slate-600">·</span>
            <span>Rutas GPS & Bitácoras Técnicas NOM-256</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            SERVICIOS Y AGENDA DEL TÉCNICO
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Segregación inteligente: El técnico recibe únicamente datos del cliente, ubicación y servicio. Datos fiscales y bancarios permanecen restringidos.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#161a26] border border-[#2b2417] px-3.5 py-2 rounded-xl text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
          <span>Técnico asignado: <strong className="text-white">Carlos Mendoza (Zona Centro)</strong></span>
        </div>
      </div>

      {/* Services List / Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#d4a34b]" />
          Ordenes de Servicio Programadas para Hoy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#11141e] border border-[#282115] rounded-xl p-5 space-y-4 hover:border-[#d4a34b]/60 transition-all shadow-lg"
            >
              <div className="flex items-start justify-between border-b border-[#211a12] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tabular font-bold text-xs text-[#d4a34b]">{srv.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      srv.status === 'completado' 
                        ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40' 
                        : 'bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40'
                    }`}>
                      {srv.status === 'completado' ? 'Completado' : 'Programado'}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mt-1">{srv.clientBusinessName}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#d4a34b]" />
                    <span>{srv.address}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold font-mono-tabular text-white flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3 text-[#f59e0b]" />
                    {srv.scheduledTime}
                  </div>
                  <span className="text-[10px] text-slate-500">{srv.scheduledDate}</span>
                </div>
              </div>

              {/* Service Details & Pests */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#0b0e14] p-2.5 rounded-lg border border-[#231b11]">
                  <span className="text-[10px] text-slate-500 block">Tipo de Servicio:</span>
                  <span className="font-semibold text-slate-200">{srv.serviceType}</span>
                </div>
                <div className="bg-[#0b0e14] p-2.5 rounded-lg border border-[#231b11]">
                  <span className="text-[10px] text-slate-500 block">Zona Operativa:</span>
                  <span className="font-bold text-[#f59e0b]">{srv.zone}</span>
                </div>
              </div>

              {/* Status Info / Certificate if completed */}
              {srv.status === 'completado' ? (
                <div className="bg-[#0f1d17] border border-[#1d4d35] rounded-lg p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#10b981] font-bold">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Bitácora Digital Sellada
                    </span>
                    <span className="font-mono-tabular text-[10px]">{srv.certificateFolio}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    Nivel de actividad registrado: <strong className="text-white">{srv.activityLevel}/5</strong> · Tiempo efectivo: {srv.effectiveMinutes} min
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Ruta optimizada Centro
                  </span>
                  <button
                    onClick={() => handleStartService(srv)}
                    className="flex items-center gap-1.5 bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-extrabold px-4 py-2 rounded-lg text-xs shadow-md transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Iniciar Servicio / Check-in</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Ejecutar Servicio, Check-in, Escala 0-5 y Bitácora NOM-256 */}
      {activeModal === 'execute' && selectedOrder && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111420] border border-[#4a391c] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2d2417] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a34b]">
                  Ejecución Operativa en Sitio
                </span>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bug className="w-4 h-4 text-[#f59e0b]" />
                  Check-in e Inspección · {selectedOrder.clientBusinessName}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Check-in GPS simulation */}
              <div className="bg-[#0b0e14] border border-[#262015] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Check-in GPS Validado en Ubicación</div>
                    <div className="text-[10px] text-slate-400">Lat: 25.6690° N, Lon: 100.3099° W · Hora: 08:32 AM</div>
                  </div>
                </div>
                <span className="text-[10px] bg-[#10b981]/20 text-[#10b981] font-bold px-2.5 py-1 rounded">
                  En Sitio
                </span>
              </div>

              {/* Escala de actividad / Infestación (0 a 5) - Sección 14.2 del PDF */}
              <div>
                <label className="text-slate-300 font-bold block mb-1.5 flex items-center justify-between">
                  <span>Escala de Actividad / Infestación (Normativa TITAN v9):</span>
                  <span className="text-[#f59e0b] font-mono-tabular font-bold">Nivel {execActivityLevel}</span>
                </label>
                <div className="grid grid-cols-6 gap-1.5 text-center">
                  {[
                    { lvl: 0, label: '0 - Sin actividad', color: 'bg-emerald-950 text-emerald-300 border-emerald-700' },
                    { lvl: 1, label: '1 - Muy baja', color: 'bg-emerald-900 text-emerald-200 border-emerald-600' },
                    { lvl: 2, label: '2 - Baja', color: 'bg-yellow-950 text-yellow-300 border-yellow-700' },
                    { lvl: 3, label: '3 - Media', color: 'bg-amber-950 text-amber-300 border-amber-700' },
                    { lvl: 4, label: '4 - Alta', color: 'bg-orange-950 text-orange-300 border-orange-700' },
                    { lvl: 5, label: '5 - Crítica', color: 'bg-red-950 text-red-300 border-red-700' },
                  ].map((item) => (
                    <button
                      key={item.lvl}
                      type="button"
                      onClick={() => setExecActivityLevel(item.lvl as any)}
                      className={`p-2 rounded-lg border text-[10px] font-bold transition-all ${
                        execActivityLevel === item.lvl
                          ? `${item.color} ring-2 ring-[#f59e0b] scale-105 shadow-md`
                          : 'bg-[#151926] border-[#292317] text-slate-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inspección & Puntos Críticos */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Áreas inspeccionadas</label>
                  <input
                    type="text"
                    value={execArea}
                    onChange={(e) => setExecArea(e.target.value)}
                    className="w-full bg-[#181d2a] border border-[#2b2416] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Puntos críticos identificados</label>
                  <input
                    type="text"
                    value={execCriticalPoints}
                    onChange={(e) => setExecCriticalPoints(e.target.value)}
                    className="w-full bg-[#181d2a] border border-[#2b2416] rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              {/* Químico Aplicado (Conexión directa con Inventario Químico) */}
              <div className="bg-[#0f121a] p-3.5 rounded-xl border border-[#2b2316] space-y-2.5">
                <span className="text-xs font-bold text-[#d4a34b] block">
                  Plaguicida Utilizado (Descuento automático de lote)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-slate-400 block mb-1 text-[10px]">Producto maestro</label>
                    <select
                      value={selectedChemId}
                      onChange={(e) => setSelectedChemId(e.target.value)}
                      className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-1.5 text-white text-xs"
                    >
                      {chemicals.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.tradeName} ({c.activeIngredient}) - Lote {c.batchNumber}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 text-[10px]">Dosis aplicada</label>
                    <input
                      type="text"
                      value={chemDose}
                      onChange={(e) => setChemDose(e.target.value)}
                      className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-1.5 text-white font-mono-tabular text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Observaciones y Recomendaciones */}
              <div>
                <label className="text-slate-400 block mb-1">Observaciones y recomendaciones al cliente</label>
                <textarea
                  rows={2}
                  value={execObservations}
                  onChange={(e) => setExecObservations(e.target.value)}
                  className="w-full bg-[#181d2a] border border-[#2b2416] rounded-lg p-2 text-white"
                />
              </div>

              {/* Firma en Sitio y Cierre */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#292214]">
                <div>
                  <label className="text-slate-400 block mb-1 text-[10px]">Representante que recibe servicio</label>
                  <input
                    type="text"
                    value={clientSigner}
                    onChange={(e) => setClientSigner(e.target.value)}
                    className="w-full bg-[#181d2a] border border-[#2b2416] rounded-lg p-1.5 text-white font-semibold"
                  />
                </div>
                <div className="text-right flex items-end justify-end">
                  <div className="text-[10px] text-[#10b981] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> Certificación NOM-256 Lista
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#292214]">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleFinishService}
                className="bg-gradient-to-r from-[#d4a34b] to-[#f59e0b] text-black font-extrabold px-6 py-2 rounded-xl text-xs shadow-lg transition-all hover:scale-[1.02]"
              >
                Concluir y Generar Bitácora Digital
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
