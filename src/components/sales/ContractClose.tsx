import React, { useState, useRef, useEffect } from 'react';
import { 
  FileCheck, 
  Search, 
  CheckCircle2, 
  CreditCard, 
  Building, 
  Calendar, 
  PenTool, 
  Maximize2, 
  FileText, 
  X, 
  Save, 
  ShieldCheck, 
  Lock, 
  ArrowRight,
  FolderOpen,
  Printer,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { Prospect, Quote, ContractData } from '../../types/titan';

interface ContractCloseProps {
  prospect: Prospect;
  quote: Quote;
  initialContract: ContractData;
  onSaveDraft: (contract: ContractData) => void;
  onFinalizeContract: (contract: ContractData) => void;
  onCancel: () => void;
}

export const ContractClose: React.FC<ContractCloseProps> = ({
  prospect,
  quote,
  initialContract,
  onSaveDraft,
  onFinalizeContract,
  onCancel,
}) => {
  const [contract, setContract] = useState<ContractData>(initialContract);
  const [isSatSearching, setIsSatSearching] = useState(false);
  const [satSuccess, setSatSuccess] = useState(true);
  const [fullscreenPreview, setFullscreenPreview] = useState(false);
  const [showConfirmationSuccess, setShowConfirmationSuccess] = useState(false);

  // Canvas refs for signatures
  const clientCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const salesCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClientDrawing, setIsClientDrawing] = useState(false);
  const [isSalesDrawing, setIsSalesDrawing] = useState(false);
  const [hasClientSigned, setHasClientSigned] = useState(true);
  const [hasSalesSigned, setHasSalesSigned] = useState(true);

  // Initialize canvas signatures with sample signatures
  useEffect(() => {
    const drawSampleSignature = (canvas: HTMLCanvasElement | null, text: string) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      // Draw signature stroke
      ctx.moveTo(30, 45);
      ctx.bezierCurveTo(60, 15, 80, 60, 110, 30);
      ctx.bezierCurveTo(130, 10, 150, 50, 190, 35);
      ctx.stroke();

      // Flourish
      ctx.beginPath();
      ctx.moveTo(25, 55);
      ctx.lineTo(210, 48);
      ctx.stroke();
    };

    drawSampleSignature(clientCanvasRef.current, 'Client');
    drawSampleSignature(salesCanvasRef.current, 'Sales');
  }, []);

  // Drawing handlers for Client Signature
  const handleClientMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsClientDrawing(true);
    const canvas = clientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleClientMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isClientDrawing) return;
    const canvas = clientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasClientSigned(true);
  };

  const handleClientMouseUp = () => {
    setIsClientDrawing(false);
  };

  const clearClientSignature = () => {
    const canvas = clientCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasClientSigned(false);
  };

  // Drawing handlers for Sales Signature
  const handleSalesMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsSalesDrawing(true);
    const canvas = salesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleSalesMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSalesDrawing) return;
    const canvas = salesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    setHasSalesSigned(true);
  };

  const handleSalesMouseUp = () => {
    setIsSalesDrawing(false);
  };

  const clearSalesSignature = () => {
    const canvas = salesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSalesSigned(false);
  };

  const handleSatValidation = () => {
    setIsSatSearching(true);
    setTimeout(() => {
      setIsSatSearching(false);
      setSatSuccess(true);
      setContract((prev) => ({
        ...prev,
        isSatValidated: true,
        fiscalBusinessName: `${prospect.businessName} S.A. de C.V.`,
        fiscalRegime: '601 - General de Ley Personas Morales',
        fiscalZip: prospect.zipCode || '64000',
        fiscalAddress: `${prospect.street} ${prospect.exteriorNo}, ${prospect.colony}, ${prospect.city}, ${prospect.state}`,
      }));
    }, 700);
  };

  const handleExecuteClose = () => {
    setShowConfirmationSuccess(true);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-6 max-w-7xl mx-auto space-y-4 sm:space-y-5 text-slate-200 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Top Banner: Información del cliente (precargada) matching screenshot */}
      <div className="bg-[#10131d] border border-[#2d2516] rounded-xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#241c12] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4a34b]">
              Información del cliente (precargada)
            </span>
            <span className="text-[10px] text-[#10b981] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Datos consolidados de P02 y P03
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[11px] text-slate-400">
              Folio de Contrato: <strong className="text-[#f59e0b] font-mono-tabular">{contract.contractFolio}</strong>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">ID Cliente:</span>
            <span className="font-mono-tabular font-bold text-[#f59e0b]">{contract.clientFolio}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Razón Social:</span>
            <span className="font-bold text-white truncate block">{prospect.businessName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Tipo:</span>
            <span className="font-semibold text-slate-300">{prospect.prospectType}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Giro:</span>
            <span className="font-semibold text-slate-300">{prospect.industry}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Contacto:</span>
            <span className="font-semibold text-white">{prospect.contactName} ({prospect.contactRole})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Zona Operativa:</span>
            <span className="inline-block bg-[#f59e0b] text-black font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
              {prospect.zone}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid: Left (Forms) + Right (Contract Live Preview with Signatures) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-full min-w-0 overflow-hidden">
        {/* LEFT COLUMN: 6 or 7 cols */}
        <div className="lg:col-span-7 space-y-4 min-w-0 w-full">
          {/* Bloque 1: Datos fiscales (para facturación) */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <span className="text-xs font-bold text-[#d4a34b] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" />
                Datos fiscales (para facturación)
              </span>
              <button
                type="button"
                onClick={handleSatValidation}
                disabled={isSatSearching}
                className="flex items-center gap-1.5 text-[10px] font-bold text-[#d4a34b] hover:text-white bg-[#1c160b] hover:bg-[#2c2211] border border-[#423418] px-2.5 py-1 rounded transition-colors"
              >
                <Search className="w-3 h-3" />
                <span>{isSatSearching ? 'Consultando SAT...' : 'Buscar en SAT'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">RFC <span className="text-[#f59e0b]">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={contract.rfc}
                    onChange={(e) => setContract({ ...contract, rfc: e.target.value.toUpperCase() })}
                    className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular uppercase font-bold focus:border-[#d4a34b] focus:outline-none"
                  />
                  {satSuccess && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] absolute right-2.5 top-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Razón social fiscal <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={contract.fiscalBusinessName}
                  onChange={(e) => setContract({ ...contract, fiscalBusinessName: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-slate-400 block mb-1">Régimen fiscal (Catálogo SAT) <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={contract.fiscalRegime}
                  onChange={(e) => setContract({ ...contract, fiscalRegime: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none text-xs"
                >
                  <option value="601 - General de Ley Personas Morales">601 - General de Ley Personas Morales</option>
                  <option value="612 - Personas Físicas con Actividades Empresariales y Profesionales">612 - Personas Físicas con Actividades Empresariales y Profesionales</option>
                  <option value="626 - Régimen Simplificado de Confianza (RESICO)">626 - Régimen Simplificado de Confianza (RESICO)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Uso CFDI <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={contract.cfdiUsage}
                  onChange={(e) => setContract({ ...contract, cfdiUsage: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none text-xs"
                >
                  <option value="G03 - Gastos en general">G03 - Gastos en general</option>
                  <option value="G02 - Devoluciones, descuentos o bonificaciones">G02 - Devoluciones, descuentos</option>
                  <option value="S01 - Sin efectos fiscales">S01 - Sin efectos fiscales</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Código postal fiscal <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={contract.fiscalZip}
                  onChange={(e) => setContract({ ...contract, fiscalZip: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="text-slate-400 block mb-1">Dirección fiscal completa</label>
                <input
                  type="text"
                  value={contract.fiscalAddress}
                  onChange={(e) => setContract({ ...contract, fiscalAddress: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bloque 2: Datos bancarios del cliente (para rastrear pagos) */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <span className="text-xs font-bold text-[#d4a34b] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                Datos bancarios del cliente (para rastreo y conciliación automática)
              </span>
              <span className="text-[10px] text-[#10b981] font-semibold flex items-center gap-1 bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/30">
                <CheckCircle2 className="w-3 h-3" /> Cuenta validada
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Banco emisor <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={contract.bank}
                  onChange={(e) => setContract({ ...contract, bank: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none text-xs"
                >
                  <option value="BBVA">BBVA México</option>
                  <option value="Banorte">Banorte</option>
                  <option value="Santander">Santander</option>
                  <option value="Citibanamex">Citibanamex</option>
                  <option value="HSBC">HSBC</option>
                  <option value="Scotiabank">Scotiabank</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Cuenta / CLABE (18 dígitos) <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={contract.clabe}
                  onChange={(e) => setContract({ ...contract, clabe: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Titular de la cuenta</label>
                <input
                  type="text"
                  value={contract.accountHolder}
                  onChange={(e) => setContract({ ...contract, accountHolder: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Referencia de pago conciliatoria <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={contract.paymentReference}
                  onChange={(e) => setContract({ ...contract, paymentReference: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-[#f59e0b] font-mono-tabular font-bold focus:border-[#d4a34b] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bloque 3: Resumen del contrato (precargado y bloqueado) */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <span className="text-xs font-bold text-[#d4a34b] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Resumen del contrato (precargado de la cotización)
              </span>
              <span className="text-[10px] text-slate-400 font-mono-tabular flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#d4a34b]" />
                Precio mensual acordado bloqueado
              </span>
            </div>

            <div className="border border-[#231c12] rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#231c12] text-[10px] uppercase">
                  <tr>
                    <th className="py-2 px-3">Servicio / Concepto</th>
                    <th className="py-2 px-3">Frecuencia</th>
                    <th className="py-2 px-3 text-center">Cantidad</th>
                    <th className="py-2 px-3 text-right">Precio unitario</th>
                    <th className="py-2 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e170f]">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-white">{quote.serviceType}</td>
                    <td className="py-2 px-3 text-slate-300">Mensual</td>
                    <td className="py-2 px-3 text-center font-mono-tabular">{quote.contractMonths}</td>
                    <td className="py-2 px-3 text-right font-mono-tabular font-bold text-[#f59e0b]">
                      ${quote.agreedMonthlyPrice.toLocaleString()}
                    </td>
                    <td className="py-2 px-3 text-right font-mono-tabular font-bold text-white">
                      ${(quote.agreedMonthlyPrice * quote.contractMonths).toLocaleString()}
                    </td>
                  </tr>
                  {quote.specialServices.map((s) => (
                    <tr key={s.id}>
                      <td className="py-2 px-3 text-slate-300">{s.name}</td>
                      <td className="py-2 px-3 text-slate-400">{s.frequency}</td>
                      <td className="py-2 px-3 text-center font-mono-tabular">{s.months}</td>
                      <td className="py-2 px-3 text-right font-mono-tabular">${s.unitPrice.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right font-mono-tabular">${s.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="bg-[#0e1118] p-2.5 border-t border-[#231c12] flex justify-between items-center text-xs">
                <span className="text-slate-400">Total acumulado ({quote.contractMonths} meses con IVA):</span>
                <span className="font-mono-tabular font-black text-sm text-[#f59e0b]">
                  ${quote.totalContractValue.toLocaleString()} MXN
                </span>
              </div>
            </div>
          </div>

          {/* Bloque 4 & 5: Datos del contrato & Condiciones de pago */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Tipo de contrato</label>
                <select
                  value={contract.contractType}
                  onChange={(e) => setContract({ ...contract, contractType: e.target.value as any })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Anual">Anual (12 meses)</option>
                  <option value="Semestral">Semestral (6 meses)</option>
                  <option value="Trimestral">Trimestral (3 meses)</option>
                  <option value="Bimestral">Bimestral (2 meses)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Condición de pago</label>
                <select
                  value={contract.paymentCondition}
                  onChange={(e) => setContract({ ...contract, paymentCondition: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Crédito 15 días">Crédito 15 días</option>
                  <option value="Crédito 7 días">Crédito 7 días</option>
                  <option value="Crédito 30 días">Crédito 30 días</option>
                  <option value="Contra servicio">Contra servicio</option>
                  <option value="Pago anticipado">Pago anticipado</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Fecha de inicio</label>
                <input
                  type="date"
                  value={contract.startDate}
                  onChange={(e) => setContract({ ...contract, startDate: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Día de corte mensual</label>
                <input
                  type="number"
                  value={contract.cutoffPaymentDay}
                  onChange={(e) => setContract({ ...contract, cutoffPaymentDay: Number(e.target.value) })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 text-xs">Notas internas para Operaciones / Administración:</label>
              <textarea
                rows={2}
                value={contract.internalNotes}
                onChange={(e) => setContract({ ...contract, internalNotes: e.target.value })}
                className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg p-2 text-xs text-slate-300 focus:border-[#d4a34b] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 cols (Contrato digital vista previa con firmas en tiempo real) */}
        <div className="lg:col-span-5 space-y-4 min-w-0 w-full">
          <div className="bg-[#10131d] border border-[#282115] rounded-xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#f59e0b]" />
                Contrato digital (vista previa)
              </span>
              <button
                type="button"
                onClick={() => setFullscreenPreview(true)}
                className="flex items-center gap-1 text-[10px] text-[#d4a34b] hover:text-white"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Abrir en pantalla completa</span>
              </button>
            </div>

            {/* Official Legal Sheet Paper Style */}
            <div 
              id="printable-contract"
              className="bg-[#f8fafc] text-slate-900 rounded-lg p-4 text-[11px] leading-snug space-y-3 border border-slate-300 shadow-inner max-h-[520px] overflow-y-auto"
            >
              {/* Header on paper */}
              <div className="text-center border-b border-slate-300 pb-2">
                <div className="font-brand font-black text-sm tracking-wider text-[#926c22]">
                  TITAN PEST CONTROL GROUP
                </div>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-tight">
                  CONTRATO DE PRESTACIÓN DE SERVICIOS DE CONTROL DE PLAGAS
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
                  <span>No. {contract.contractFolio}</span>
                  <span>Fecha: 29/09/2026</span>
                </div>
              </div>

              {/* Legal Clauses summary */}
              <div>
                <strong className="text-slate-900 block text-[10px] uppercase font-bold">1. DATOS DEL CLIENTE</strong>
                <div className="text-slate-700">
                  Razón Social: <span className="font-semibold text-slate-900">{contract.fiscalBusinessName}</span><br />
                  RFC: <span className="font-mono text-slate-900 font-semibold">{contract.rfc}</span><br />
                  Domicilio: {contract.fiscalAddress}<br />
                  Contacto: {prospect.contactName} ({prospect.contactRole})<br />
                  Zona Operativa Asignada: <span className="font-bold text-[#926c22]">{prospect.zone}</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-900 block text-[10px] uppercase font-bold">2. SERVICIOS Y PRECIO ACORDADO</strong>
                <div className="text-slate-700">
                  Servicio base: <span className="font-semibold">{quote.serviceType}</span><br />
                  Precio mensual acordado: <strong className="text-slate-950 font-mono font-bold">${quote.agreedMonthlyPrice.toLocaleString()} MXN</strong><br />
                  Vigencia: {contract.contractType} ({contract.startDate} al {contract.endDate})<br />
                  Valor acumulado de referencia: <span className="font-mono font-bold">${quote.totalContractValue.toLocaleString()} MXN</span>
                </div>
              </div>

              <div>
                <strong className="text-slate-900 block text-[10px] uppercase font-bold">3. CUMPLIMIENTO SANITARIO</strong>
                <p className="text-[9px] text-slate-600 leading-tight">
                  Los servicios se ejecutarán bajo la estricta observancia de la Norma Oficial Mexicana <strong>NOM-256-SSA1-2012</strong>, utilizando productos debidamente autorizados por <strong>COFEPRIS</strong>. Cada visita generará su respectiva bitácora y constancia de servicio.
                </p>
              </div>

              {/* Canvas Interactive Signature Pads matching Screenshot */}
              <div className="pt-2 border-t border-slate-300 space-y-3">
                {/* Client Signature Pad */}
                <div className="bg-white border border-slate-300 rounded-md p-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-700 font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <PenTool className="w-3 h-3 text-[#926c22]" />
                      Firma del cliente / Representante
                    </span>
                    <button
                      type="button"
                      onClick={clearClientSignature}
                      className="text-[9px] text-slate-400 hover:text-red-600"
                    >
                      Limpiar
                    </button>
                  </div>
                  <canvas
                    ref={clientCanvasRef}
                    width={260}
                    height={55}
                    onMouseDown={handleClientMouseDown}
                    onMouseMove={handleClientMouseMove}
                    onMouseUp={handleClientMouseUp}
                    className="w-full h-14 bg-slate-50 border border-dashed border-slate-300 rounded cursor-crosshair"
                  />
                  <div className="text-[9px] text-slate-500 mt-0.5 flex justify-between">
                    <span>Nombre: {contract.clientSignerName}</span>
                    <span>29/09/2026 11:32</span>
                  </div>
                </div>

                {/* Sales Executive Signature Pad */}
                <div className="bg-white border border-slate-300 rounded-md p-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-700 font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <PenTool className="w-3 h-3 text-[#926c22]" />
                      Firma de la vendedora / TITAN
                    </span>
                    <button
                      type="button"
                      onClick={clearSalesSignature}
                      className="text-[9px] text-slate-400 hover:text-red-600"
                    >
                      Limpiar
                    </button>
                  </div>
                  <canvas
                    ref={salesCanvasRef}
                    width={260}
                    height={55}
                    onMouseDown={handleSalesMouseDown}
                    onMouseMove={handleSalesMouseMove}
                    onMouseUp={handleSalesMouseUp}
                    className="w-full h-14 bg-slate-50 border border-dashed border-slate-300 rounded cursor-crosshair"
                  />
                  <div className="text-[9px] text-slate-500 mt-0.5 flex justify-between">
                    <span>Nombre: {contract.salesRepName}</span>
                    <span>29/09/2026 11:35</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions: Generar contrato digital y cerrar venta matching Screenshot */}
      <div className="bg-[#0b0d13] border border-[#292215] p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#332a19] text-slate-300 hover:text-white hover:bg-[#1a1f2c] text-xs font-semibold transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancelar</span>
          </button>

          <button
            type="button"
            onClick={() => onSaveDraft(contract)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#3e3218] text-[#d4a34b] hover:bg-[#201b11] text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar como borrador</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleExecuteClose}
          className="flex items-center gap-2 bg-gradient-to-r from-[#d4a34b] via-[#f59e0b] to-[#c79435] text-black font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all hover:scale-[1.02]"
        >
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          <span>Generar contrato digital y cerrar venta</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Master Success Modal: Confirmation of conversion to Cliente Activo and automatic bifurcated routing */}
      {showConfirmationSuccess && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#111420] border border-[#52401f] rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-brand font-black text-white">
                ¡VENTA CERRADA Y CONTRATO GENERADO!
              </h3>
              <p className="text-xs text-slate-300">
                El prospecto se ha convertido oficialmente en <strong>Cliente Activo</strong>.
              </p>
            </div>

            {/* Folios Assigned */}
            <div className="bg-[#0b0e14] border border-[#2b2214] rounded-xl p-4 grid grid-cols-2 gap-3 text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Folio Único de Cliente</span>
                <span className="text-base font-bold font-mono-tabular text-[#f59e0b]">{contract.clientFolio}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Folio de Contrato</span>
                <span className="text-base font-bold font-mono-tabular text-[#10b981]">{contract.contractFolio}</span>
              </div>
            </div>

            {/* Smart Bifurcation Notice (Sección 9 del PDF) */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-[#d4a34b] text-[11px] uppercase tracking-wider">
                Distribución automática de información:
              </div>

              <div className="bg-[#151926] p-3 rounded-lg border border-[#242c3d] flex items-start gap-2.5">
                <Building className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ruta Administrativa:</strong> Contrato firmado, datos fiscales SAT ({contract.rfc}) y datos bancarios enviados a Administración para CxC y facturación mensual.
                </div>
              </div>

              <div className="bg-[#151926] p-3 rounded-lg border border-[#242c3d] flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Ruta Operativa:</strong> Datos del inmueble, geolocalización ({prospect.zone}), plagas reportadas y fotos transferidas a Servicios para asignación de ruta y técnico.
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#292214]">
              <button
                type="button"
                onClick={() => {
                  setShowConfirmationSuccess(false);
                  onFinalizeContract(contract);
                }}
                className="w-full bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-extrabold py-2.5 rounded-xl text-xs transition-colors"
              >
                Continuar al Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
