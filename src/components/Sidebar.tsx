import React from 'react';
import { 
  Building2, 
  Settings2, 
  Handshake, 
  Coins, 
  Bug, 
  FlaskConical, 
  Users, 
  LogOut, 
  Shield, 
  LayoutDashboard, 
  UserPlus, 
  FileSpreadsheet, 
  FileCheck, 
  Package, 
  Fingerprint, 
  FileText, 
  CreditCard, 
  Award,
  Navigation,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/titan';
import { ROLE_LABELS } from './Header';

export interface SidebarModuleItem {
  id: string;
  label: string;
  shortDesc: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  currentRole: UserRole;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeModuleId,
  onSelectModule,
  onLogout,
}) => {
  const roleInfo = ROLE_LABELS[currentRole];

  // Specific modules for each role according to the approved checklist
  const getModulesForRole = (): SidebarModuleItem[] => {
    switch (currentRole) {
      case 'direccion_general':
        return [
          {
            id: 'general_kpi',
            label: 'Dashboard General',
            shortDesc: 'KPIs estratégicos y conversión',
            icon: <Building2 className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'Global',
          },
          {
            id: 'general_rentabilidad',
            label: 'Rentabilidad Real',
            shortDesc: 'Fórmula maestra por cliente',
            icon: <Coins className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'Margen Real',
          },
          {
            id: 'general_ventas',
            label: 'Supervisión Ventas',
            shortDesc: 'Cartera y funnel comercial',
            icon: <Handshake className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'general_servicios',
            label: 'Supervisión Operativa',
            shortDesc: 'Rutas de técnicos y estatus',
            icon: <Bug className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'general_finanzas',
            label: 'Supervisión Finanzas',
            shortDesc: 'CxC y facturación SAT',
            icon: <CreditCard className="w-4 h-4 text-[#f59e0b]" />,
          },
        ];

      case 'direccion_operaciones':
        return [
          {
            id: 'op_tablero',
            label: 'Tablero Operaciones',
            shortDesc: 'Flota activa y zonas',
            icon: <Settings2 className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'Ruta Activa',
          },
          {
            id: 'op_rutas',
            label: 'Agenda y Servicios',
            shortDesc: 'Servicios en campo y GPS',
            icon: <Navigation className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'op_almacen',
            label: 'Almacén Químico',
            shortDesc: 'Existencias y consumos',
            icon: <Package className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'op_mip',
            label: 'Supervisión Red MIP',
            shortDesc: 'Monitoreo de estaciones',
            icon: <Layers className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'op_asistencia',
            label: 'Control de Asistencia',
            shortDesc: 'Incidencias biométricas',
            icon: <Fingerprint className="w-4 h-4 text-[#f59e0b]" />,
          },
        ];

      case 'ventas':
        return [
          {
            id: 'p01',
            label: 'P01 · Dashboard Ventas',
            shortDesc: 'Filtros y trazabilidad',
            icon: <LayoutDashboard className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'P01',
          },
          {
            id: 'p02',
            label: 'P02 · Prospecto',
            shortDesc: 'Levantamiento y fotos',
            icon: <UserPlus className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'P02',
          },
          {
            id: 'p03',
            label: 'P03 · Cotización',
            shortDesc: 'Motor de precio v9 protegido',
            icon: <FileSpreadsheet className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'P03',
          },
          {
            id: 'p04',
            label: 'P04 · Cierre Contrato',
            shortDesc: 'Firmas digitales y SAT',
            icon: <FileCheck className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'P04',
          },
        ];

      case 'servicios':
        return [
          {
            id: 'srv_agenda',
            label: 'Mi Agenda de Rutas',
            shortDesc: 'Orden del día y ubicación',
            icon: <Navigation className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'En Ruta',
          },
          {
            id: 'srv_ejecucion',
            label: 'Ejecución NOM-256',
            shortDesc: 'Bitácora oficial y dosis',
            icon: <CheckCircle2 className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'srv_mip',
            label: 'Estaciones MIP',
            shortDesc: 'Inspección de cebaderas',
            icon: <Layers className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'srv_quimicos',
            label: 'Mis Químicos',
            shortDesc: 'Lotes y desabasto',
            icon: <Package className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'srv_asistencia',
            label: 'Mi Asistencia',
            shortDesc: 'Registro biométrico',
            icon: <Fingerprint className="w-4 h-4 text-[#f59e0b]" />,
          },
        ];

      case 'administracion':
        return [
          {
            id: 'adm_cxc',
            label: '18.1 Cuentas por Cobrar',
            shortDesc: 'Cartera por contratos P04',
            icon: <Coins className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'CxC',
          },
          {
            id: 'adm_bancos',
            label: '18.2 Conciliador Bancario',
            shortDesc: 'Cruce SPEI por referencia',
            icon: <CreditCard className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'adm_cfdi',
            label: '18.3 Timbrado CFDI 4.0',
            shortDesc: 'Emisión fiscal SAT',
            icon: <FileText className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'adm_nomina',
            label: 'Prenómina Personal',
            shortDesc: 'Horas e incidencias de técnicos',
            icon: <Fingerprint className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'adm_contratos',
            label: 'Contratos Activos',
            shortDesc: 'Expedientes comerciales',
            icon: <FileCheck className="w-4 h-4 text-[#f59e0b]" />,
          },
        ];

      case 'responsable_sanitario':
        return [
          {
            id: 'san_carpetas',
            label: 'Carpeta Regulatoria',
            shortDesc: 'Expediente NOM-256-SSA1',
            icon: <FlaskConical className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'SSA1',
          },
          {
            id: 'san_constancias',
            label: 'Constancias Oficiales',
            shortDesc: 'Certificados emitidos',
            icon: <Award className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'san_lotes',
            label: 'Lotes COFEPRIS',
            shortDesc: 'Caducidad y dosis trazables',
            icon: <Package className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'san_mip',
            label: 'Auditoría MIP',
            shortDesc: 'Historial de infestaciones',
            icon: <Layers className="w-4 h-4 text-[#f59e0b]" />,
          },
        ];

      case 'crm_clientes':
        return [
          {
            id: 'crm_expediente',
            label: 'Mi Expediente',
            shortDesc: 'Contrato y datos activos',
            icon: <Users className="w-4 h-4 text-[#f59e0b]" />,
            badge: 'Cliente',
          },
          {
            id: 'crm_certificados',
            label: 'Certificados NOM-256',
            shortDesc: 'Descarga en PDF con folio',
            icon: <Award className="w-4 h-4 text-[#f59e0b]" />,
          },
          {
            id: 'crm_mapa',
            label: 'Red MIP Inmueble',
            shortDesc: 'Croquis de cebaderas y trampas',
            icon: <Layers className="w-4 h-4 text-[#f59e0b]" />,
          },
        ];

      default:
        return [];
    }
  };

  const modules = getModulesForRole();

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-[#0a0c10] border-r border-[#262015] h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#241c12] flex items-center gap-3">
        <div className="w-9 h-10 flex items-center justify-center bg-gradient-to-b from-[#d4a34b] via-[#8f6d28] to-[#42310d] rounded-t-lg rounded-b-xl p-[1.5px] shadow-lg shrink-0">
          <div className="w-full h-full bg-[#0a0c10] rounded-t-[6px] rounded-b-[10px] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#f59e0b]" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="font-brand font-black text-lg tracking-wider text-[#d4a34b]">
              TITAN
            </span>
            <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 truncate">
              Pest Control
            </span>
          </div>
          <p className="text-[9px] text-[#937b46] font-medium tracking-wide truncate">
            Arquitectura v9 · 2026
          </p>
        </div>
      </div>

      {/* Active User / Role Card */}
      <div className="p-3.5 mx-3 my-3 bg-[#11141e] border border-[#2b2214] rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#d4a34b] to-[#634816] flex items-center justify-center font-bold text-black text-xs shadow shrink-0">
            {roleInfo.user.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">
              {roleInfo.user}
            </div>
            <div className="text-[10px] text-[#d4a34b] font-medium truncate">
              {roleInfo.title}
            </div>
            <span className="inline-block text-[9px] bg-[#1a170f] text-[#f59e0b] border border-[#3e3015] px-1.5 py-0.2 rounded font-semibold mt-0.5 truncate">
              {roleInfo.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Role Exclusive Modules List */}
      <div className="flex-1 px-3 py-1 space-y-1.5 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 flex items-center justify-between">
          <span>Módulos de tu Rol</span>
          <span className="text-[#d4a34b] font-mono-tabular">{modules.length}</span>
        </div>

        {modules.map((mod) => {
          const isSelected = activeModuleId === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onSelectModule(mod.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group ${
                isSelected
                  ? 'bg-gradient-to-r from-[#2a1f0d] to-[#1c160b] text-[#f59e0b] border border-[#d4a34b]/40 shadow-[0_0_12px_rgba(212,163,75,0.2)] font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-[#131722] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`p-1.5 rounded-lg shrink-0 transition-transform ${
                  isSelected ? 'bg-[#3d2e13] text-[#f59e0b] scale-110' : 'bg-[#0f1118] text-slate-400 group-hover:text-[#d4a34b]'
                }`}>
                  {mod.icon}
                </div>
                <div className="min-w-0">
                  <div className={`text-xs truncate ${isSelected ? 'text-white font-bold' : 'group-hover:text-white'}`}>
                    {mod.label}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {mod.shortDesc}
                  </div>
                </div>
              </div>

              {mod.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                  isSelected ? 'bg-[#f59e0b] text-black' : 'bg-[#181c28] text-slate-400 border border-[#2a2315]'
                }`}>
                  {mod.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Role Segregation Security Footer & Logout */}
      <div className="p-3 border-t border-[#241c12] space-y-2 bg-[#090b0e]">
        <div className="px-2 py-1 bg-[#10131d] border border-[#262015] rounded-lg text-[10px] text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#d4a34b] shrink-0" />
          <span className="truncate">Sesión aislada sin mezcla de datos</span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1b1511] hover:bg-red-950/40 text-red-300 border border-red-900/30 hover:border-red-600/50 text-xs font-bold transition-all shadow"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
