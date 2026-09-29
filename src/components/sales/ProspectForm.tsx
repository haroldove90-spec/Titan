import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  User, 
  Camera, 
  Check, 
  Save, 
  ArrowRight, 
  X, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { Prospect, OperatingZone, PropertySize, ReportedPest } from '../../types/titan';

interface ProspectFormProps {
  initialData: Prospect;
  onSaveDraft: (prospect: Prospect) => void;
  onProceedToQuote: (prospect: Prospect) => void;
  onCancel: () => void;
}

export const ProspectForm: React.FC<ProspectFormProps> = ({
  initialData,
  onSaveDraft,
  onProceedToQuote,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Prospect>(initialData);
  const [activeZone, setActiveZone] = useState<OperatingZone>(initialData.zone);

  // Automatic zone determination simulator based on address/zip
  const handleAddressChange = (field: keyof Prospect, value: any) => {
    const updated = { ...formData, [field]: value };
    // Example auto-logic: zip code or city determines zone
    if (field === 'zipCode' || field === 'colony') {
      const zip = String(value);
      if (zip.startsWith('64')) updated.zone = 'CENTRO';
      else if (zip.startsWith('66')) updated.zone = 'NORTE';
      else updated.zone = 'SUR';
      setActiveZone(updated.zone);
    }
    setFormData(updated);
  };

  const handleAddPest = () => {
    const newPest: ReportedPest = {
      id: `pest-${Date.now()}`,
      pest: 'Moscas',
      presenceLevel: 'Baja',
      affectedArea: 'Comedor',
      observations: '',
    };
    setFormData({
      ...formData,
      reportedPests: [...formData.reportedPests, newPest],
    });
  };

  const handleRemovePest = (id: string) => {
    setFormData({
      ...formData,
      reportedPests: formData.reportedPests.filter((p) => p.id !== id),
    });
  };

  const handlePestChange = (id: string, field: keyof ReportedPest, value: any) => {
    setFormData({
      ...formData,
      reportedPests: formData.reportedPests.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    });
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto space-y-5 text-slate-200">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between bg-[#11141e] border border-[#2d2516] px-5 py-3 rounded-xl shadow-md">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4a34b]">
            Pantalla 02 · Módulo Comercial
          </span>
          <h2 className="text-lg font-bold text-white">
            Prospecto / Levantamiento Comercial
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-[#1b170e] border border-[#3e3016] px-3 py-1.5 rounded-lg">
          <span className="text-xs text-slate-400">ID Prospecto:</span>
          <span className="font-mono-tabular font-bold text-[#f59e0b] text-sm">
            {formData.id}
          </span>
        </div>
      </div>

      {/* Main 2-Column Grid matching Screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT COLUMN: 6 or 7 cols */}
        <div className="lg:col-span-6 space-y-4">
          {/* Bloque 1: Datos generales del prospecto */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4a34b] border-b border-[#211a11] pb-2">
              <User className="w-3.5 h-3.5" />
              <span>Datos generales del prospecto</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Tipo de prospecto <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.prospectType}
                  onChange={(e) => setFormData({ ...formData, prospectType: e.target.value as any })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Empresa">Empresa</option>
                  <option value="Persona física">Persona física</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Nombre / Razón social <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Ej. Restaurante El Roble"
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Nombre de contacto <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Ej. Luis Martínez"
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Puesto / Cargo <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.contactRole}
                  onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Gerente">Gerente</option>
                  <option value="Subgerente">Subgerente</option>
                  <option value="Encargado">Encargado</option>
                  <option value="Compras">Compras</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Propietario">Propietario</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Teléfono <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="81 1234 5678"
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Correo electrónico <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="luis@elroble.com"
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bloque 2: Características del servicio */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4a34b] border-b border-[#211a11] pb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Características del servicio</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Tipo de servicio <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Control de plagas urbanas">Control de plagas urbanas</option>
                  <option value="Manejo Integral de Plagas (MIP)">Manejo Integral de Plagas (MIP)</option>
                  <option value="Servicio especial">Servicio especial</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Tamaño del inmueble <span className="text-[#f59e0b]">*</span>
                </label>
                <select
                  value={formData.propertySize}
                  onChange={(e) => setFormData({ ...formData, propertySize: e.target.value as PropertySize })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                  <option value="Especial">Especial</option>
                </select>
                <span className="text-[10px] text-slate-500 italic mt-0.5 block">
                  Regla v9: Sin metros cuadrados en venta comercial.
                </span>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Frecuencia deseada <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.desiredFrequency}
                  onChange={(e) => setFormData({ ...formData, desiredFrequency: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Mensual">Mensual</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Único">Único</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Giro comercial <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Restaurante / alimentos y bebidas">Restaurante / alimentos y bebidas</option>
                  <option value="Hotel / hospedaje">Hotel / hospedaje</option>
                  <option value="Hospital / clínica">Hospital / clínica</option>
                  <option value="Escuela / institución educativa">Escuela / institución educativa</option>
                  <option value="Oficina / corporativo">Oficina / corporativo</option>
                  <option value="Industria / fábrica">Industria / fábrica</option>
                  <option value="Almacén / bodega">Almacén / bodega</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">No. de colaboradores</label>
                <input
                  type="number"
                  value={formData.employeesCount}
                  onChange={(e) => setFormData({ ...formData, employeesCount: Number(e.target.value) })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Motivo de contacto <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.contactReason}
                  onChange={(e) => setFormData({ ...formData, contactReason: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                >
                  <option value="Prevención">Prevención</option>
                  <option value="Presencia de plaga">Presencia de plaga</option>
                  <option value="Auditoría / requisito">Auditoría / requisito</option>
                  <option value="Solicitud de cotización">Solicitud de cotización</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 text-xs mb-1">
                <span>Detalle de la necesidad:</span>
                <span className="text-slate-500">{formData.needDetails.length}/500</span>
              </div>
              <textarea
                rows={2}
                value={formData.needDetails}
                onChange={(e) => setFormData({ ...formData, needDetails: e.target.value })}
                className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg p-2 text-xs text-slate-200 focus:border-[#d4a34b] focus:outline-none"
                placeholder="Describa la necesidad y antecedentes..."
              />
            </div>
          </div>

          {/* Bloque 4: Fotografías del inmueble (Referencia comercial) */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#d4a34b]">
                <Camera className="w-3.5 h-3.5" />
                <span>Fotografías del inmueble (Levantamiento comercial)</span>
              </div>
              <span className="text-[10px] text-slate-500">4 capturas</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { title: 'Fachada', src: formData.photos.fachada },
                { title: 'Cocina', src: formData.photos.cocina },
                { title: 'Comedor / Salón', src: formData.photos.comedor },
                { title: 'Almacén', src: formData.photos.almacen },
              ].map((item, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-[#2a2215] bg-[#090b10] aspect-video">
                  {item.src ? (
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px]">
                      Sin foto
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                    <span className="text-[10px] font-semibold text-slate-200 truncate">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 italic">
              * Estas fotos sirven para conocer físicamente el inmueble. No sustituyen la evidencia técnica que se genera durante el servicio.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: 6 cols */}
        <div className="lg:col-span-6 space-y-4">
          {/* Bloque 5 & 6: Dirección, Mapa y Zona Operativa Automática */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4a34b] border-b border-[#211a11] pb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Dirección y ubicación geográfica</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="col-span-2">
                <label className="block text-slate-400 mb-1">Calle <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">No. exterior <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={formData.exteriorNo}
                  onChange={(e) => handleAddressChange('exteriorNo', e.target.value)}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Colonia</label>
                <input
                  type="text"
                  value={formData.colony}
                  onChange={(e) => handleAddressChange('colony', e.target.value)}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Ciudad</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">C.P. <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white font-mono-tabular focus:border-[#d4a34b] focus:outline-none"
                />
              </div>
            </div>

            {/* Map Preview & Automatic Operating Zone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Map Preview */}
              <div className="relative rounded-lg overflow-hidden border border-[#2a2215] bg-[#0c0e14] h-28 flex items-center justify-center">
                {/* Tactical Map Mockup */}
                <div className="absolute inset-0 bg-[#0e121a] opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center z-10">
                  <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] flex items-center justify-center animate-pulse">
                    <MapPin className="w-4 h-4 text-[#f59e0b]" />
                  </div>
                  <span className="text-[11px] font-bold text-white mt-1">Av. Constitución 123</span>
                  <span className="text-[9px] text-[#d4a34b]">Centro, Monterrey · 25.6690° N, 100.3099° W</span>
                </div>
              </div>

              {/* Automatic Operating Zone Banner */}
              <div className="bg-[#121622] border border-[#2a2215] rounded-lg p-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Zona Operativa (Automática)
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {(['NORTE', 'CENTRO', 'SUR'] as OperatingZone[]).map((zone) => {
                      const isSelected = activeZone === zone;
                      return (
                        <div
                          key={zone}
                          className={`text-center py-1.5 rounded text-xs font-black transition-all ${
                            isSelected
                              ? 'bg-[#d4a34b] text-black shadow-[0_0_12px_rgba(212,163,75,0.6)] ring-1 ring-[#f59e0b]'
                              : 'bg-[#181d2a] text-slate-500 border border-[#262117]'
                          }`}
                        >
                          {zone}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[#10b981] font-semibold mt-2">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Zona determinada por geolocalización</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque 7: Plagas reportadas (información inicial) */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#211a11] pb-2">
              <span className="text-xs font-bold text-[#d4a34b] flex items-center gap-1.5">
                Plagas reportadas (información inicial)
              </span>
              <button
                type="button"
                onClick={handleAddPest}
                className="flex items-center gap-1 text-[11px] font-bold text-black bg-[#d4a34b] hover:bg-[#f59e0b] px-2.5 py-1 rounded transition-colors"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>+ Agregar plaga</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.reportedPests.map((pestItem) => (
                <div 
                  key={pestItem.id} 
                  className="bg-[#141722] border border-[#272115] rounded-lg p-2.5 grid grid-cols-12 gap-2 text-xs items-center"
                >
                  <div className="col-span-3">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Plaga</label>
                    <select
                      value={pestItem.pest}
                      onChange={(e) => handlePestChange(pestItem.id, 'pest', e.target.value)}
                      className="w-full bg-[#0d0f15] border border-[#2a2215] rounded px-2 py-1 text-white text-[11px]"
                    >
                      <option value="Cucarachas">Cucarachas</option>
                      <option value="Roedores">Roedores</option>
                      <option value="Moscas">Moscas</option>
                      <option value="Mosquitos">Mosquitos</option>
                      <option value="Hormigas">Hormigas</option>
                      <option value="Chinches">Chinches</option>
                      <option value="Termitas">Termitas</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="col-span-3">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Presencia</label>
                    <select
                      value={pestItem.presenceLevel}
                      onChange={(e) => handlePestChange(pestItem.id, 'presenceLevel', e.target.value as any)}
                      className="w-full bg-[#0d0f15] border border-[#2a2215] rounded px-2 py-1 text-white text-[11px]"
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                      <option value="No determinado">No determinado</option>
                    </select>
                  </div>

                  <div className="col-span-3">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Área afectada</label>
                    <select
                      value={pestItem.affectedArea}
                      onChange={(e) => handlePestChange(pestItem.id, 'affectedArea', e.target.value)}
                      className="w-full bg-[#0d0f15] border border-[#2a2215] rounded px-2 py-1 text-white text-[11px]"
                    >
                      <option value="Cocina">Cocina</option>
                      <option value="Almacén / bodega">Almacén / bodega</option>
                      <option value="Comedor">Comedor</option>
                      <option value="Oficinas">Oficinas</option>
                      <option value="Exterior / jardín">Exterior / jardín</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Observación</label>
                    <input
                      type="text"
                      value={pestItem.observations}
                      onChange={(e) => handlePestChange(pestItem.id, 'observations', e.target.value)}
                      placeholder="Notas..."
                      className="w-full bg-[#0d0f15] border border-[#2a2215] rounded px-2 py-1 text-white text-[11px]"
                    />
                  </div>

                  <div className="col-span-1 text-right pt-4">
                    <button
                      type="button"
                      onClick={() => handleRemovePest(pestItem.id)}
                      className="p-1 text-slate-500 hover:text-[#ef4444] transition-colors"
                      title="Eliminar plaga"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque 9: Agendar visita */}
          <div className="bg-[#10131d] border border-[#262015] rounded-xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d4a34b] border-b border-[#211a11] pb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Agenda de visita de levantamiento</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Fecha de visita <span className="text-[#f59e0b]">*</span></label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none font-mono-tabular"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Hora <span className="text-[#f59e0b]">*</span></label>
                <input
                  type="time"
                  value={formData.visitTime}
                  onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none font-mono-tabular"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Ejecutivo de ventas <span className="text-[#f59e0b]">*</span></label>
                <select
                  value={formData.assignedSalesExec}
                  onChange={(e) => setFormData({ ...formData, assignedSalesExec: e.target.value })}
                  className="w-full bg-[#161a25] border border-[#2b2316] rounded-lg px-2.5 py-1.5 text-white focus:border-[#d4a34b] focus:outline-none font-semibold text-[#f59e0b]"
                >
                  <option value="Ana López">Ana López</option>
                  <option value="Javier Ramos">Javier Ramos</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions matching Screenshot */}
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
            onClick={() => onSaveDraft(formData)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#3e3218] text-[#d4a34b] hover:bg-[#201b11] text-xs font-semibold transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Guardar como borrador</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onProceedToQuote(formData)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#d4a34b] to-[#b8862d] hover:from-[#f59e0b] hover:to-[#c79435] text-black font-extrabold px-6 py-2 rounded-xl text-xs shadow-[0_0_15px_rgba(212,163,75,0.4)] transition-all hover:scale-[1.02]"
        >
          <span>Agendar visita / Continuar a Cotización</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
