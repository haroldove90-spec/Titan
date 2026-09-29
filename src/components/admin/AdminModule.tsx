import React, { useState } from 'react';
import { 
  Coins, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Building,
  RefreshCw,
  Search,
  Check
} from 'lucide-react';
import { AccountReceivable } from '../../types/titan';

interface AdminModuleProps {
  accounts: AccountReceivable[];
  onMarkPaid?: (id: string) => void;
}

export const AdminModule: React.FC<AdminModuleProps> = ({ accounts }) => {
  const [items, setItems] = useState<AccountReceivable[]>(accounts);
  const [activeTab, setActiveTab] = useState<'cxc' | 'conciliacion' | 'facturacion'>('cxc');
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const totalPorCobrar = items.reduce((acc, curr) => acc + curr.amount, 0);

  const handleConciliate = (id: string) => {
    setItems((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, status: 'pagado', cfdiStatus: 'emitido' } : acc))
    );
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Módulo Administrativo & Financiero</span>
            <span className="text-slate-600">·</span>
            <span>Ruta Administrativa de Contratos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            ADMINISTRACIÓN: CXC, BANCO Y FACTURACIÓN CFDI
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Los contratos cerrados en P04 llegan automáticamente aquí junto con sus datos fiscales SAT y bancarios para identificación de transferencias sin recaptura.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#161a25] border border-[#2d2417] px-4 py-2 rounded-xl">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Cartera Total CxC</div>
            <div className="text-lg font-bold font-mono-tabular text-[#f59e0b]">
              ${totalPorCobrar.toLocaleString()} MXN
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#241c12] pb-2 text-xs">
        <button
          onClick={() => setActiveTab('cxc')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'cxc'
              ? 'bg-[#d4a34b] text-black shadow'
              : 'text-slate-400 hover:text-white hover:bg-[#161a25]'
          }`}
        >
          18.1 Cuentas por Cobrar (CxC)
        </button>
        <button
          onClick={() => setActiveTab('conciliacion')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'conciliacion'
              ? 'bg-[#d4a34b] text-black shadow'
              : 'text-slate-400 hover:text-white hover:bg-[#161a25]'
          }`}
        >
          18.2 Banco & Conciliación
        </button>
        <button
          onClick={() => setActiveTab('facturacion')}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === 'facturacion'
              ? 'bg-[#d4a34b] text-black shadow'
              : 'text-slate-400 hover:text-white hover:bg-[#161a25]'
          }`}
        >
          18.3 Facturación CFDI 4.0
        </button>
      </div>

      {/* Main Table View */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#211a11] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Coins className="w-4 h-4 text-[#d4a34b]" />
            Cartera de Servicios Ejecutados y Facturación Recurrente
          </h3>
          <span className="text-xs text-slate-400 font-mono-tabular">
            Cadena: Servicio Efectuado → CxC → Banco → CFDI
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#211a11] text-[10px] uppercase">
              <tr>
                <th className="py-3 px-4">Folio Factura</th>
                <th className="py-3 px-4">Cliente / Razón Social</th>
                <th className="py-3 px-4">Referencia de Pago</th>
                <th className="py-3 px-4">Fecha Emisión</th>
                <th className="py-3 px-4">Vencimiento</th>
                <th className="py-3 px-4 text-right">Monto</th>
                <th className="py-3 px-4">Estado CxC</th>
                <th className="py-3 px-4 text-center">Conciliación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {items.map((acc) => (
                <tr key={acc.id} className="hover:bg-[#161a25] transition-colors">
                  <td className="py-3 px-4 font-mono-tabular font-bold text-[#d4a34b]">
                    {acc.invoiceFolio}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{acc.clientName}</div>
                    <div className="text-[10px] text-slate-500 font-mono-tabular">{acc.contractFolio}</div>
                  </td>
                  <td className="py-3 px-4 font-mono-tabular text-[#f59e0b] font-semibold">
                    {acc.paymentReference}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono-tabular">{acc.issueDate}</td>
                  <td className="py-3 px-4 font-mono-tabular text-slate-300">{acc.dueDate}</td>
                  <td className="py-3 px-4 text-right font-mono-tabular font-bold text-white text-sm">
                    ${acc.amount.toLocaleString()} MXN
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      acc.status === 'pagado'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : acc.status === 'vence_hoy'
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : 'bg-blue-950 text-blue-300 border border-blue-700'
                    }`}>
                      {acc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {acc.status === 'pagado' ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Conciliado
                      </span>
                    ) : (
                      <button
                        onClick={() => handleConciliate(acc.id)}
                        className="bg-[#1c180f] hover:bg-[#d4a34b] text-[#d4a34b] hover:text-black border border-[#3e3218] px-2.5 py-1 rounded text-[10px] font-bold transition-colors"
                      >
                        Conciliar SPEI
                      </button>
                    )}
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
