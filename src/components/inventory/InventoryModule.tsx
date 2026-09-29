import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Search, 
  ArrowDownLeft, 
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';
import { ChemicalItem } from '../../types/titan';

interface InventoryModuleProps {
  chemicals: ChemicalItem[];
  onAddStock?: (id: string, amount: number) => void;
}

export const InventoryModule: React.FC<InventoryModuleProps> = ({ chemicals }) => {
  const [items, setItems] = useState<ChemicalItem[]>(chemicals);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMovementModal, setShowAddMovementModal] = useState(false);
  const [selectedChemId, setSelectedChemId] = useState(chemicals[0]?.id || '');
  const [movementType, setMovementType] = useState<'entrada' | 'salida'>('entrada');
  const [movementQty, setMovementQty] = useState(5);
  const [movementBatch, setMovementBatch] = useState('L-2026-NUEVO');

  const filteredItems = items.filter((item) =>
    item.tradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.activeIngredient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyMovement = () => {
    setItems((prev) =>
      prev.map((c) => {
        if (c.id === selectedChemId) {
          const newStock = movementType === 'entrada' ? c.currentStock + movementQty : Math.max(0, c.currentStock - movementQty);
          return { ...c, currentStock: newStock };
        }
        return c;
      })
    );
    setShowAddMovementModal(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Almacén Químico Central</span>
            <span className="text-slate-600">·</span>
            <span>Trazabilidad de Plaguicidas COFEPRIS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            PRODUCTOS E INVENTARIO CONECTADO AL SERVICIO
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadena de custodia ininterrumpida: Compra → Lote → Almacén → Técnico → Servicio → Cliente. Los consumos en bitácora descuentan inventario automáticamente.
          </p>
        </div>

        <button
          onClick={() => setShowAddMovementModal(true)}
          className="flex items-center gap-2 bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md transition-colors shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Registrar Movimiento de Inventario</span>
        </button>
      </div>

      {/* Search and Table */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#211a11] flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar producto, ingrediente o lote..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#151926] border border-[#292215] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a34b]"
            />
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Total productos activos: <strong className="text-white">{items.length}</strong></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#211a11] text-[10px] uppercase">
              <tr>
                <th className="py-3 px-4">Producto Comercial</th>
                <th className="py-3 px-4">Ingrediente Activo</th>
                <th className="py-3 px-4">Laboratorio</th>
                <th className="py-3 px-4">Registro COFEPRIS</th>
                <th className="py-3 px-4">Lote / Caducidad</th>
                <th className="py-3 px-4 text-right">Existencia Actual</th>
                <th className="py-3 px-4 text-center">Ficha / MSDS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {filteredItems.map((chem) => {
                const isLowStock = chem.currentStock <= chem.minThreshold;
                return (
                  <tr key={chem.id} className="hover:bg-[#161a25] transition-colors">
                    <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#d4a34b]" />
                      <span>{chem.tradeName}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{chem.activeIngredient}</td>
                    <td className="py-3 px-4 text-slate-400">{chem.manufacturer}</td>
                    <td className="py-3 px-4 font-mono-tabular text-[11px] text-[#f59e0b]">
                      {chem.cofeprisReg}
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono-tabular">
                      <div>Lote: <strong className="text-white">{chem.batchNumber}</strong></div>
                      <div className="text-[10px] text-slate-500">Cad: {chem.expirationDate}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono-tabular">
                      <span className={`font-bold text-sm ${isLowStock ? 'text-red-400' : 'text-[#10b981]'}`}>
                        {chem.currentStock} {chem.stockUnit}
                      </span>
                      {isLowStock && (
                        <div className="text-[10px] text-red-400 font-semibold flex items-center justify-end gap-1">
                          <AlertTriangle className="w-3 h-3" /> Reorden requerida
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => alert(`Descargando Ficha Técnica y SDS para ${chem.tradeName}`)}
                        className="p-1.5 rounded-lg bg-[#191d2a] hover:bg-[#d4a34b] text-slate-300 hover:text-black transition-colors"
                        title="Ver Ficha Técnica y Hoja de Seguridad (SDS)"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Registrar Movimiento */}
      {showAddMovementModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#12151f] border border-[#423419] rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#292214] pb-2.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#f59e0b]" />
                Registrar Entrada / Salida de Inventario
              </h4>
              <button onClick={() => setShowAddMovementModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Tipo de movimiento</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMovementType('entrada')}
                    className={`py-2 rounded-lg font-bold border transition-colors ${
                      movementType === 'entrada'
                        ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]'
                        : 'bg-[#161a25] border-[#292215] text-slate-400'
                    }`}
                  >
                    Entrada (Compra)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMovementType('salida')}
                    className={`py-2 rounded-lg font-bold border transition-colors ${
                      movementType === 'salida'
                        ? 'bg-red-950 text-red-300 border-red-500'
                        : 'bg-[#161a25] border-[#292215] text-slate-400'
                    }`}
                  >
                    Salida (Servicio/Baja)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Producto</label>
                <select
                  value={selectedChemId}
                  onChange={(e) => setSelectedChemId(e.target.value)}
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white"
                >
                  {items.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.tradeName} (Lote: {i.batchNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Cantidad</label>
                <input
                  type="number"
                  value={movementQty}
                  onChange={(e) => setMovementQty(Number(e.target.value))}
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white font-mono-tabular"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Lote del fabricante</label>
                <input
                  type="text"
                  value={movementBatch}
                  onChange={(e) => setMovementBatch(e.target.value)}
                  className="w-full bg-[#181d2a] border border-[#2d2417] rounded-lg p-2 text-white font-mono-tabular"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#292214]">
              <button
                type="button"
                onClick={() => setShowAddMovementModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleApplyMovement}
                className="bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-bold px-4 py-1.5 rounded-lg text-xs"
              >
                Confirmar movimiento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
