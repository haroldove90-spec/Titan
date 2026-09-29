import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Mail, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Lock, 
  Calendar, 
  Building2, 
  MapPin, 
  FolderOpen, 
  Check, 
  ArrowRight, 
  X, 
  Save, 
  Info,
  Clock,
  Sparkles,
  PhoneCall,
  Printer
} from 'lucide-react';
import { 
  Prospect, 
  Quote, 
  SpecialServiceItem, 
  PropertySize, 
  InfestationLevel, 
  ServiceComplexity,
  QuoteFollowUp 
} from '../../types/titan';

interface QuoteEngineProps {
  prospect: Prospect;
  initialQuote: Quote;
  onSaveDraft: (quote: Quote) => void;
  onProceedToClose: (quote: Quote) => void;
  onBackToProspect: () => void;
}

export const QuoteEngine: React.FC<QuoteEngineProps> = ({
  prospect,
  initialQuote,
  onSaveDraft,
  onProceedToClose,
  onBackToProspect,
}) => {
  const [quote, setQuote] = useState<Quote>(initialQuote);
  const [showFullDossierModal, setShowFullDossierModal] = useState(false);
  const [showNewFollowUpModal, setShowNewFollowUpModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);

  // New follow-up state
  const [newFollowUp, setNewFollowUp] = useState<Partial<QuoteFollowUp>>({
    contactType: 'Llamada',
    result: 'Interesado',
    notes: '',
    nextAction: 'Llamar para cierre',
    nextDate: '2026-10-04',
    executive: 'Ana López',
  });

  // Special service modal state
  const [specialName, setSpecialName] = useState('Servicio especial: Roedores (perimetral)');
  const [specialFreq, setSpecialFreq] = useState('Trimestral');
  const [specialMonths, setSpecialMonths] = useState(4);
  const [specialPrice, setSpecialPrice] = useState(2500);

  // MOTOR DE PRECIOS OCULTO TITAN v9 (Página 10 del PDF)
  // Margen bruto objetivo: 55%. Costo operativo representa máx 45% del precio sugerido.
  // Regla de pisos: Planta baja = base. Cada piso adicional incrementa al menos 15% lineal.
  const recalculatePrices = (
    size: PropertySize,
    floors: number,
    infest: InfestationLevel,
    comp: ServiceComplexity
  ) => {
    // 1. Costo operativo base interno estimado
    let baseCost = 2500;
    if (size === 'Pequeño') baseCost = 1800;
    else if (size === 'Mediano') baseCost = 3150;
    else if (size === 'Grande') baseCost = 5400;
    else if (size === 'Especial') baseCost = 8200;

    // Complejidad factor
    let compFactor = 1.0;
    if (comp === 'Media') compFactor = 1.15;
    else if (comp === 'Alta') compFactor = 1.30;
    else if (comp === 'Especial') compFactor = 1.50;

    // Infestación factor
    let infestFactor = 1.0;
    if (infest === 'Medio') infestFactor = 1.1;
    else if (infest === 'Alto') infestFactor = 1.25;

    // Costo operativo estimado
    const estimatedOpCost = baseCost * compFactor * infestFactor;

    // Fórmula base: Precio sugerido base = Costo operativo estimado / 0.45 (55% margen bruto)
    const suggestedBase = estimatedOpCost / 0.45;

    // Fórmula de pisos: Factor pisos = 1 + tasa_piso * (P - 1), tasa_piso = 0.15
    const floorFactor = 1 + 0.15 * Math.max(0, floors - 1);
    const suggestedAdjusted = Math.round((suggestedBase * floorFactor) / 100) * 100;

    // Precio mínimo autorizado (85% del sugerido, protegido por dirección)
    const minAuthorized = Math.round((suggestedAdjusted * 0.85) / 100) * 100;

    const chosenPrice = quote.chosenPriceType === 'sugerido' ? suggestedAdjusted : minAuthorized;

    // Recompute totals
    const mainServiceTotal = chosenPrice * quote.contractMonths;
    const specialTotal = quote.specialServices.reduce((acc, curr) => acc + curr.total, 0);
    const subtotal = mainServiceTotal + specialTotal;
    const tax = Math.round(subtotal * 0.16);
    const totalContractValue = subtotal + tax;

    setQuote((prev) => ({
      ...prev,
      propertySize: size,
      floorsCount: floors,
      infestationLevel: infest,
      complexity: comp,
      suggestedPriceTitan: suggestedAdjusted,
      minAuthorizedPrice: minAuthorized,
      agreedMonthlyPrice: chosenPrice,
      subtotal,
      tax,
      totalContractValue,
    }));
  };

  const handlePriceTypeToggle = (type: 'sugerido' | 'minimo') => {
    const chosenPrice = type === 'sugerido' ? quote.suggestedPriceTitan : quote.minAuthorizedPrice;
    const mainServiceTotal = chosenPrice * quote.contractMonths;
    const specialTotal = quote.specialServices.reduce((acc, curr) => acc + curr.total, 0);
    const subtotal = mainServiceTotal + specialTotal;
    const tax = Math.round(subtotal * 0.16);
    const totalContractValue = subtotal + tax;

    setQuote({
      ...quote,
      chosenPriceType: type,
      agreedMonthlyPrice: chosenPrice,
      subtotal,
      tax,
      totalContractValue,
    });
  };

  const handleAddSpecialService = () => {
    const newItem: SpecialServiceItem = {
      id: `spec-${Date.now()}`,
      name: specialName,
      frequency: specialFreq,
      months: specialMonths,
      unitPrice: specialPrice,
      total: specialPrice * specialMonths,
    };
    const updatedSpecials = [...quote.specialServices, newItem];
    const specialTotal = updatedSpecials.reduce((acc, curr) => acc + curr.total, 0);
    const mainTotal = quote.agreedMonthlyPrice * quote.contractMonths;
    const subtotal = mainTotal + specialTotal;
    const tax = Math.round(subtotal * 0.16);

    setQuote({
      ...quote,
      specialServices: updatedSpecials,
      subtotal,
      tax,
      totalContractValue: subtotal + tax,
    });
    setShowSpecialModal(false);
  };

  const handleRemoveSpecialService = (id: string) => {
    const updatedSpecials = quote.specialServices.filter((s) => s.id !== id);
    const specialTotal = updatedSpecials.reduce((acc, curr) => acc + curr.total, 0);
    const mainTotal = quote.agreedMonthlyPrice * quote.contractMonths;
    const subtotal = mainTotal + specialTotal;
    const tax = Math.round(subtotal * 0.16);

    setQuote({
      ...quote,
      specialServices: updatedSpecials,
      subtotal,
      tax,
      totalContractValue: subtotal + tax,
    });
  };

  const handleAddFollowUp = () => {
    if (!newFollowUp.notes) return;
    const follow: QuoteFollowUp = {
      id: `f-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      contactType: (newFollowUp.contactType as any) || 'Llamada',
      result: newFollowUp.result || 'Interesado',
      notes: newFollowUp.notes || '',
      nextAction: newFollowUp.nextAction || 'Seguimiento',
      nextDate: newFollowUp.nextDate || '2026-10-05',
      executive: newFollowUp.executive || 'Ana López',
    };
    setQuote({
      ...quote,
      followUps: [...quote.followUps, follow],
    });
    setShowNewFollowUpModal(false);
    setNewFollowUp({
      contactType: 'Llamada',
      result: 'Interesado',
      notes: '',
      nextAction: 'Llamar para cierre',
      nextDate: '2026-10-04',
      executive: 'Ana López',
    });
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5 text-slate-200">
      {/* Top Banner: Información del cliente (precargada) exactly matching screenshot */}
      <div className="bg-[#10131d] border border-[#2d2516] rounded-xl p-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#241c12] pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4a34b]">
              Información del cliente (precargada)
            </span>
            <span className="text-[10px] text-slate-500">· Sin recaptura</span>
          </div>

          <button
            onClick={() => setShowFullDossierModal(true)}
            className="flex items-center gap-1.5 text-xs text-[#d4a34b] hover:text-white bg-[#19150d] hover:bg-[#2c2212] border border-[#423418] px-3 py-1 rounded-lg transition-colors font-semibold"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>Ver expediente completo</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">ID Prospecto:</span>
            <span className="font-mono-tabular font-bold text-[#f59e0b]">{prospect.id}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Tipo:</span>
            <span className="font-semibold text-white">{prospect.prospectType}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-500 block text-[10px]">Nombre / Razón social:</span>
            <span className="font-bold text-white truncate block">{prospect.businessName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Giro:</span>
            <span className="font-semibold text-white truncate block">{prospect.industry}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Contacto:</span>
            <span className="font-semibold text-white">{prospect.contactName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Teléfono:</span>
            <span className="font-mono-tabular text-slate-300">{prospect.phone}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-500 block text-[10px]">Dirección:</span>
            <span className="text-slate-300 truncate block">
              {prospect.street} {prospect.exteriorNo}, {prospect.colony}, {prospect.city}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Zona operativa:</span>
            <span className="inline-block bg-[#f59e0b] text-black font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
              {prospect.zone}
            </span>
          </div>
        </div>
      </div>

      {/* Main Split: Left (Cotización & Motor Oculto) + Right (Condiciones Comerciales) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: 8 cols */}
        <div className="lg:col-span-8 space-y-4">
          {/* Section 1: Cotización de servicios (mensual) */}
          <div className="bg-[#10131d] border border-[#282115] rounded-xl p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#d4a34b]" />
                  1. Cotización de servicios (mensual)
                </span>
                <span className="text-[10px] text-slate-400 bg-[#151924] px-2 py-0.5 rounded">
                  Motor de precio v9
                </span>
              </div>
            </div>

            {/* Factores operativos visibles para cálculo automático */}
            <div>
              <div className="text-xs font-bold text-[#d4a34b] mb-2">
                Factores operativos del servicio (para cálculo automático)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Tipo de servicio <span className="text-[#f59e0b]">*</span>
                  </label>
                  <select
                    value={quote.serviceType}
                    onChange={(e) => {
                      setQuote({ ...quote, serviceType: e.target.value });
                    }}
                    className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white text-xs"
                  >
                    <option value="Control de plagas (interior)">Control de plagas (interior)</option>
                    <option value="Manejo Integral de Plagas (MIP)">Manejo Integral de Plagas (MIP)</option>
                    <option value="Control Integral Premium">Control Integral Premium</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Cantidad de pisos <span className="text-[#f59e0b]">*</span>
                  </label>
                  <select
                    value={quote.floorsCount}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      recalculatePrices(quote.propertySize, count, quote.infestationLevel, quote.complexity);
                    }}
                    className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white text-xs font-mono-tabular"
                  >
                    <option value={1}>1 piso (Planta Baja)</option>
                    <option value={2}>2 pisos (+15%)</option>
                    <option value={3}>3 pisos (+30%)</option>
                    <option value={4}>4 pisos (+45%)</option>
                    <option value={5}>5 pisos (+60%)</option>
                    <option value={6}>6 o más - Especial</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Tamaño del inmueble <span className="text-[#f59e0b]">*</span>
                  </label>
                  <select
                    value={quote.propertySize}
                    onChange={(e) => {
                      const size = e.target.value as PropertySize;
                      recalculatePrices(size, quote.floorsCount, quote.infestationLevel, quote.complexity);
                    }}
                    className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white text-xs"
                  >
                    <option value="Pequeño">Pequeño</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                    <option value="Especial">Especial</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Nivel de infestación <span className="text-[#f59e0b]">*</span>
                  </label>
                  <select
                    value={quote.infestationLevel}
                    onChange={(e) => {
                      const lvl = e.target.value as InfestationLevel;
                      recalculatePrices(quote.propertySize, quote.floorsCount, lvl, quote.complexity);
                    }}
                    className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white text-xs"
                  >
                    <option value="Bajo">Bajo</option>
                    <option value="Medio">Medio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">
                    Complejidad del servicio <span className="text-[#f59e0b]">*</span>
                  </label>
                  <select
                    value={quote.complexity}
                    onChange={(e) => {
                      const comp = e.target.value as ServiceComplexity;
                      recalculatePrices(quote.propertySize, quote.floorsCount, quote.infestationLevel, comp);
                    }}
                    className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white text-xs"
                  >
                    <option value="Estándar">Estándar</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Especial">Especial</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Frecuencia</label>
                  <div className="bg-[#0e1118] border border-[#292215] rounded-lg px-2.5 py-1.5 text-slate-300 text-xs">
                    Mensual
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-[10px] text-slate-400 block mb-1">Zona operativa</label>
                  <div className="bg-[#0e1118] border border-[#292215] rounded-lg px-2.5 py-1.5 text-[#f59e0b] font-bold text-xs flex items-center justify-between">
                    <span>{quote.zone}</span>
                    <span className="text-[10px] text-slate-500 font-normal">No editable en Ventas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resultado del cálculo (mensual) - Blindado con Candados */}
            <div className="bg-[#0d1017] border border-[#382b16] rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                  Resultado del cálculo (mensual)
                </span>
                <span className="text-[10px] text-slate-400">
                  Calculado automáticamente con base en los factores seleccionados
                </span>
              </div>

              {/* Radio Selector of the 2 allowed prices + Locked Final Price */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* Option 1: Precio Sugerido Titan */}
                <button
                  type="button"
                  onClick={() => handlePriceTypeToggle('sugerido')}
                  className={`sm:col-span-4 p-3 rounded-lg border text-left transition-all relative ${
                    quote.chosenPriceType === 'sugerido'
                      ? 'bg-[#2a200f] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-[#131620] border-[#292217] hover:border-[#d4a34b]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-1">
                      <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        quote.chosenPriceType === 'sugerido' ? 'border-[#f59e0b] bg-[#f59e0b]' : 'border-slate-500'
                      }`}>
                        {quote.chosenPriceType === 'sugerido' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </span>
                      Precio sugerido Titan
                    </span>
                    <Lock className="w-3 h-3 text-[#d4a34b]" />
                  </div>
                  <div className="mt-1 text-xl font-bold font-mono-tabular text-[#f59e0b]">
                    ${quote.suggestedPriceTitan.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">por servicio (mensual)</span>
                </button>

                {/* Option 2: Precio Mínimo Autorizado */}
                <button
                  type="button"
                  onClick={() => handlePriceTypeToggle('minimo')}
                  className={`sm:col-span-4 p-3 rounded-lg border text-left transition-all relative ${
                    quote.chosenPriceType === 'minimo'
                      ? 'bg-[#2a200f] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-[#131620] border-[#292217] hover:border-[#d4a34b]/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-1">
                      <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                        quote.chosenPriceType === 'minimo' ? 'border-[#f59e0b] bg-[#f59e0b]' : 'border-slate-500'
                      }`}>
                        {quote.chosenPriceType === 'minimo' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </span>
                      Precio mínimo autorizado
                    </span>
                    <Lock className="w-3 h-3 text-[#d4a34b]" />
                  </div>
                  <div className="mt-1 text-xl font-bold font-mono-tabular text-slate-100">
                    ${quote.minAuthorizedPrice.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">por servicio (mensual)</span>
                </button>

                {/* Locked Output: Precio de Venta */}
                <div className="sm:col-span-4 p-3 rounded-lg border border-[#3c2f16] bg-[#161a25] text-right">
                  <div className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                    <span>Precio de venta mensual</span>
                    <Lock className="w-3 h-3 text-[#f59e0b]" />
                  </div>
                  <div className="text-xl font-extrabold font-mono-tabular text-[#f59e0b]">
                    ${quote.agreedMonthlyPrice.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Bloqueado / No editable</span>
                </div>
              </div>
            </div>

            {/* Breakdown Table: Conceptos del Contrato */}
            <div className="border border-[#262015] rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#241c12] text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Servicio / Concepto</th>
                    <th className="py-2.5 px-3">Frecuencia</th>
                    <th className="py-2.5 px-3 text-center">Cantidad (meses)</th>
                    <th className="py-2.5 px-3 text-right">Precio unitario</th>
                    <th className="py-2.5 px-3 text-right">Total del contrato</th>
                    <th className="py-2.5 px-2 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e170f]">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {quote.serviceType}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">Mensual</td>
                    <td className="py-2.5 px-3 text-center font-mono-tabular">{quote.contractMonths}</td>
                    <td className="py-2.5 px-3 text-right font-mono-tabular font-bold text-white">
                      ${quote.agreedMonthlyPrice.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono-tabular font-bold text-white">
                      ${(quote.agreedMonthlyPrice * quote.contractMonths).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-center text-slate-600">
                      <Lock className="w-3 h-3 mx-auto" />
                    </td>
                  </tr>

                  {quote.specialServices.map((special) => (
                    <tr key={special.id}>
                      <td className="py-2.5 px-3 text-[#d4a34b] font-medium">
                        {special.name}
                      </td>
                      <td className="py-2.5 px-3 text-slate-300">{special.frequency}</td>
                      <td className="py-2.5 px-3 text-center font-mono-tabular">{special.months}</td>
                      <td className="py-2.5 px-3 text-right font-mono-tabular">
                        ${special.unitPrice.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono-tabular font-semibold text-white">
                        ${special.total.toLocaleString()}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveSpecialService(special.id)}
                          className="text-slate-500 hover:text-red-400 p-0.5"
                          title="Eliminar concepto especial"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Totals & Commercial Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
              <div className="sm:col-span-7">
                <span className="text-[10px] text-slate-400 block mb-1">Notas comerciales:</span>
                <textarea
                  rows={3}
                  value={quote.commercialNotes}
                  onChange={(e) => setQuote({ ...quote, commercialNotes: e.target.value })}
                  className="w-full bg-[#131620] border border-[#2b2316] rounded-lg p-2 text-xs text-slate-300 focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-5 bg-[#0c0e15] border border-[#262015] rounded-lg p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono-tabular font-bold text-white">
                    ${quote.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IVA (16%):</span>
                  <span className="font-mono-tabular text-white">
                    ${quote.tax.toLocaleString()}
                  </span>
                </div>
                <div className="h-[1px] bg-[#292115] my-1" />
                <div className="flex justify-between text-sm font-black text-[#f59e0b]">
                  <span>Total Contrato ({quote.contractMonths} meses):</span>
                  <span className="font-mono-tabular">
                    ${quote.totalContractValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 cols (Condiciones comerciales & Quick dispatch) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#10131d] border border-[#282115] rounded-xl p-4 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <span className="text-xs font-bold text-[#d4a34b]">
                Condiciones comerciales
              </span>
              <button
                type="button"
                onClick={() => setShowSpecialModal(true)}
                className="flex items-center gap-1 text-[10px] font-bold text-black bg-[#d4a34b] hover:bg-[#f59e0b] px-2 py-0.5 rounded transition-colors"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>+ Agregar servicio especial</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Vigencia de la cotización</label>
                <div className="relative">
                  <input
                    type="date"
                    value={quote.validityDate}
                    onChange={(e) => setQuote({ ...quote, validityDate: e.target.value })}
                    className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular text-xs focus:border-[#d4a34b] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Forma de pago</label>
                <select
                  value={quote.paymentMethod}
                  onChange={(e) => setQuote({ ...quote, paymentMethod: e.target.value })}
                  className="w-full bg-[#151924] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white text-xs"
                >
                  <option value="Transferencia bancaria">Transferencia bancaria</option>
                  <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Comentarios para el cliente</label>
                <textarea
                  rows={3}
                  value={quote.clientComments}
                  onChange={(e) => setQuote({ ...quote, clientComments: e.target.value })}
                  className="w-full bg-[#151924] border border-[#2b2316] rounded-lg p-2 text-xs text-slate-300 focus:border-[#d4a34b] focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons: PDF, WhatsApp, Email matching Screenshot */}
            <div className="space-y-2 pt-2 border-t border-[#241c12]">
              <button
                type="button"
                onClick={() => setShowPdfModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1e2b] hover:bg-[#252b3d] border border-[#3b311e] text-slate-100 font-bold py-2 rounded-lg text-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-[#d4a34b]" />
                <span>Generar cotización (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const phoneFormatted = prospect.phone.replace(/\D/g, '');
                  const message = encodeURIComponent(
                    `Hola ${prospect.contactName}, le compartimos la propuesta formal de TITAN Pest Control para ${prospect.businessName} por $${quote.agreedMonthlyPrice.toLocaleString()} MXN mensuales.`
                  );
                  window.open(`https://wa.me/52${phoneFormatted}?text=${message}`, '_blank');
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#14231b] hover:bg-[#1a3226] border border-[#1f4730] text-[#34d399] font-bold py-2 rounded-lg text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Enviar por WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(`Cotización enviada exitosamente por correo electrónico a ${prospect.email}`);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#181d2a] hover:bg-[#202738] border border-[#2e2617] text-slate-300 font-semibold py-2 rounded-lg text-xs transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Enviar por Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Seguimiento de la cotización matching Screenshot */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl p-4 space-y-3 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#211a11] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#d4a34b]" />
              2. Seguimiento de la cotización
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowNewFollowUpModal(true)}
            className="flex items-center gap-1 text-xs font-bold text-black bg-[#d4a34b] hover:bg-[#f59e0b] px-3 py-1 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Registrar seguimiento</span>
          </button>
        </div>

        <div className="border border-[#231b11] rounded-lg overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#231b11] text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Fecha</th>
                <th className="py-2.5 px-3">Tipo de contacto</th>
                <th className="py-2.5 px-3">Resultado</th>
                <th className="py-2.5 px-3">Notas</th>
                <th className="py-2.5 px-3">Próxima acción</th>
                <th className="py-2.5 px-3">Fecha próxima</th>
                <th className="py-2.5 px-3">Ejecutivo</th>
                <th className="py-2.5 px-2 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {quote.followUps.map((item) => (
                <tr key={item.id} className="hover:bg-[#151926] transition-colors">
                  <td className="py-2.5 px-3 font-mono-tabular text-slate-300">{item.date}</td>
                  <td className="py-2.5 px-3 font-medium text-white">{item.contactType}</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/30 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {item.result}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">{item.notes}</td>
                  <td className="py-2.5 px-3 text-slate-200 font-medium">{item.nextAction}</td>
                  <td className="py-2.5 px-3 font-mono-tabular text-[#d4a34b]">{item.nextDate}</td>
                  <td className="py-2.5 px-3 text-slate-400">{item.executive}</td>
                  <td className="py-2.5 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setQuote({
                          ...quote,
                          followUps: quote.followUps.filter((f) => f.id !== item.id),
                        });
                      }}
                      className="text-slate-600 hover:text-red-400 p-1"
                      title="Eliminar nota"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions matching Screenshot */}
      <div className="bg-[#0b0d13] border border-[#292215] p-3.5 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToProspect}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#332a19] text-slate-300 hover:text-white hover:bg-[#1a1f2c] text-xs font-semibold transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Cancelar</span>
          </button>

          <button
            type="button"
            onClick={() => onSaveDraft(quote)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#3e3218] text-[#d4a34b] hover:bg-[#201b11] text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar como borrador</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onProceedToClose(quote)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#d4a34b] to-[#b8862d] hover:from-[#f59e0b] hover:to-[#c79435] text-black font-extrabold px-6 py-2 rounded-xl text-xs shadow-[0_0_15px_rgba(212,163,75,0.4)] transition-all hover:scale-[1.02]"
        >
          <span>Siguiente: Cierre / Contrato</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>

      {/* Modal: Ver Expediente Completo */}
      {showFullDossierModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12151f] border border-[#423419] rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#2d2417] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#d4a34b]" />
                Expediente Maestro Completo · {prospect.id}
              </h3>
              <button
                onClick={() => setShowFullDossierModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 max-h-[70vh] overflow-y-auto pr-2">
              <div className="bg-[#0b0e14] p-3 rounded-lg border border-[#231b11]">
                <div className="font-bold text-[#f59e0b] mb-1">Empresa & Contacto</div>
                <div>{prospect.businessName} · Contacto: {prospect.contactName} ({prospect.contactRole})</div>
                <div>Tel: {prospect.phone} | Correo: {prospect.email}</div>
                <div>Giro: {prospect.industry} | Empleados: {prospect.employeesCount}</div>
              </div>

              <div className="bg-[#0b0e14] p-3 rounded-lg border border-[#231b11]">
                <div className="font-bold text-[#f59e0b] mb-1">Ubicación & Zona Operativa</div>
                <div>{prospect.street} #{prospect.exteriorNo}, {prospect.colony}, C.P. {prospect.zipCode}, {prospect.city}, {prospect.state}</div>
                <div className="mt-1 font-semibold text-[#10b981]">Zona Asignada Automáticamente: {prospect.zone}</div>
              </div>

              <div className="bg-[#0b0e14] p-3 rounded-lg border border-[#231b11]">
                <div className="font-bold text-[#f59e0b] mb-1">Plagas Reportadas en Levantamiento</div>
                <ul className="list-disc pl-4 space-y-1">
                  {prospect.reportedPests.map((p) => (
                    <li key={p.id}>
                      <strong>{p.pest}</strong> (Presencia: {p.presenceLevel}) en {p.affectedArea} - {p.observations}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0b0e14] p-3 rounded-lg border border-[#231b11]">
                <div className="font-bold text-[#f59e0b] mb-1">Notas Comerciales & Antecedentes</div>
                <p>{prospect.needDetails}</p>
                <p className="mt-1 text-slate-400">{prospect.additionalNotes}</p>
              </div>
            </div>

            <div className="text-right pt-2 border-t border-[#292014]">
              <button
                onClick={() => setShowFullDossierModal(false)}
                className="bg-[#241d11] hover:bg-[#342a17] text-[#d4a34b] font-bold px-4 py-1.5 rounded-lg text-xs"
              >
                Cerrar expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Registrar Seguimiento */}
      {showNewFollowUpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12151f] border border-[#423419] rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#292214] pb-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                Registrar Nuevo Seguimiento Comercial
              </h4>
              <button onClick={() => setShowNewFollowUpModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Tipo de contacto</label>
                <select
                  value={newFollowUp.contactType}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, contactType: e.target.value as any })}
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                >
                  <option value="Llamada">Llamada telefónica</option>
                  <option value="WhatsApp">Mensaje WhatsApp</option>
                  <option value="Reunión">Reunión presencial / Zoom</option>
                  <option value="Correo">Correo electrónico</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Resultado de la interacción</label>
                <input
                  type="text"
                  value={newFollowUp.result}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, result: e.target.value })}
                  placeholder="Ej. Interesado, En revisión, Cierre inminente"
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Notas y acuerdos</label>
                <textarea
                  rows={2}
                  value={newFollowUp.notes}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, notes: e.target.value })}
                  placeholder="Comentarios del cliente..."
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Próxima acción</label>
                  <input
                    type="text"
                    value={newFollowUp.nextAction}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, nextAction: e.target.value })}
                    className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Fecha próxima</label>
                  <input
                    type="date"
                    value={newFollowUp.nextDate}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, nextDate: e.target.value })}
                    className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white font-mono-tabular"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#292214]">
              <button
                type="button"
                onClick={() => setShowNewFollowUpModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddFollowUp}
                className="bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-bold px-4 py-1.5 rounded-lg text-xs"
              >
                Guardar seguimiento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Agregar Servicio Especial */}
      {showSpecialModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12151f] border border-[#423419] rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#292214] pb-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#f59e0b]" />
                Agregar Servicio Especial / Renglón Adicional
              </h4>
              <button onClick={() => setShowSpecialModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Concepto de servicio especial</label>
                <select
                  value={specialName}
                  onChange={(e) => setSpecialName(e.target.value)}
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                >
                  <option value="Servicio especial: Roedores (perimetral)">Servicio especial: Roedores (perimetral)</option>
                  <option value="Servicio especial: Termitas (barrera química)">Servicio especial: Termitas (barrera química)</option>
                  <option value="Servicio especial: Chinches de cama">Servicio especial: Chinches de cama</option>
                  <option value="Servicio especial: Avispas y abejas">Servicio especial: Avispas y abejas</option>
                  <option value="Desinfección de grado patógeno">Desinfección de grado patógeno</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Periodicidad</label>
                  <select
                    value={specialFreq}
                    onChange={(e) => setSpecialFreq(e.target.value)}
                    className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                  >
                    <option value="Mensual">Mensual</option>
                    <option value="Bimestral">Bimestral</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Único">Único</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Eventos en contrato</label>
                  <input
                    type="number"
                    value={specialMonths}
                    onChange={(e) => setSpecialMonths(Number(e.target.value))}
                    className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white font-mono-tabular"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Precio unitario por evento (MXN)</label>
                <input
                  type="number"
                  value={specialPrice}
                  onChange={(e) => setSpecialPrice(Number(e.target.value))}
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white font-mono-tabular font-bold"
                />
              </div>

              <div className="bg-[#0b0e14] p-2.5 rounded-lg border border-[#262015] flex justify-between text-xs">
                <span className="text-slate-400">Total acumulado del concepto:</span>
                <span className="font-mono-tabular font-bold text-[#f59e0b]">
                  ${(specialPrice * specialMonths).toLocaleString()} MXN
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#292214]">
              <button
                type="button"
                onClick={() => setShowSpecialModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddSpecialService}
                className="bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-bold px-4 py-1.5 rounded-lg text-xs"
              >
                Agregar al contrato
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Vista Previa Cotización Oficial (PDF) */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPdfModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <div className="font-brand font-black text-2xl tracking-wider text-[#a27725]">
                  TITAN PEST CONTROL GROUP
                </div>
                <div className="text-xs text-slate-600 font-semibold tracking-wide">
                  PROTEGEMOS LO QUE MÁS IMPORTA · COTIZACIÓN COMERCIAL
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Reg. Sanitario COFEPRIS: 19-NL-01-MIP · NOM-256-SSA1-2012
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="font-mono font-bold text-base text-slate-900">{quote.id}</div>
                <div className="text-slate-500">Fecha: {new Date().toLocaleDateString('es-MX')}</div>
                <div className="text-slate-500">Válida hasta: {quote.validityDate}</div>
              </div>
            </div>

            {/* Client Info */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs grid grid-cols-2 gap-2">
              <div>
                <span className="text-slate-500 block">Cliente:</span>
                <span className="font-bold text-slate-900">{prospect.businessName}</span>
                <div className="text-slate-600">{prospect.contactName} ({prospect.contactRole})</div>
              </div>
              <div>
                <span className="text-slate-500 block">Ubicación:</span>
                <span className="text-slate-800">{prospect.street} #{prospect.exteriorNo}, {prospect.colony}, {prospect.city}</span>
                <div className="font-semibold text-[#a27725]">Zona: {prospect.zone}</div>
              </div>
            </div>

            {/* Commercial Breakdown */}
            <div>
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-700">
                    <th className="py-2">Concepto</th>
                    <th className="py-2">Frecuencia</th>
                    <th className="py-2 text-right">Precio Mensual</th>
                    <th className="py-2 text-right">Total ({quote.contractMonths}m)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 font-semibold">{quote.serviceType}</td>
                    <td className="py-2.5">Mensual recurrente</td>
                    <td className="py-2.5 text-right font-mono font-bold">
                      ${quote.agreedMonthlyPrice.toLocaleString()} MXN
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold">
                      ${(quote.agreedMonthlyPrice * quote.contractMonths).toLocaleString()} MXN
                    </td>
                  </tr>
                  {quote.specialServices.map((s) => (
                    <tr key={s.id}>
                      <td className="py-2 text-slate-700">{s.name}</td>
                      <td className="py-2 text-slate-600">{s.frequency} ({s.months} eventos)</td>
                      <td className="py-2 text-right font-mono">${s.unitPrice.toLocaleString()}</td>
                      <td className="py-2 text-right font-mono font-semibold">${s.total.toLocaleString()} MXN</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 border-t pt-3 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-bold">${quote.subtotal.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>IVA (16%):</span>
                    <span className="font-mono">${quote.tax.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t pt-1">
                    <span>Total del Contrato:</span>
                    <span className="font-mono">${quote.totalContractValue.toLocaleString()} MXN</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Footnote */}
            <div className="text-[10px] text-slate-500 border-t pt-3 leading-relaxed">
              * Propuesta emitida bajo el principio de precio protegido TITAN v9. No se aplican descuentos posteriores por permanencia. Toda plaga adicional surgida durante la vigencia se facturará y cobrará por separado en el mes correspondiente.
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Guardar PDF</span>
              </button>
              <button
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
