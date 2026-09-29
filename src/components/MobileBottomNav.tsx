import React from 'react';
import { 
  Home,
  Building2, 
  Settings2, 
  Handshake, 
  Coins, 
  Bug, 
  FlaskConical, 
  Users, 
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
  Layers,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/titan';

interface MobileBottomNavProps {
  currentRole: UserRole;
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
}

interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentRole,
  activeModuleId,
  onSelectModule,
}) => {
  const getNavItemsForRole = (): BottomNavItem[] => {
    switch (currentRole) {
      case 'direccion_general':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'general_kpi',
            label: 'Dashboard',
            icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'general_rentabilidad',
            label: 'Rentabilidad',
            icon: <Coins className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'general_ventas',
            label: 'Ventas',
            icon: <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'general_finanzas',
            label: 'Finanzas',
            icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      case 'direccion_operaciones':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'op_tablero',
            label: 'Flota/Zonas',
            icon: <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'op_rutas',
            label: 'Agenda',
            icon: <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'op_almacen',
            label: 'Químicos',
            icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'op_mip',
            label: 'Red MIP',
            icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      case 'ventas':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'p01',
            label: 'P01 Dash',
            icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'p02',
            label: 'P02 Prosp',
            icon: <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'p03',
            label: 'P03 Cotiz',
            icon: <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'p04',
            label: 'P04 Cierre',
            icon: <FileCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      case 'servicios':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'srv_agenda',
            label: 'Mi Agenda',
            icon: <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'srv_ejecucion',
            label: 'NOM-256',
            icon: <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'srv_mip',
            label: 'Estaciones',
            icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'srv_quimicos',
            label: 'Químicos',
            icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      case 'administracion':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'adm_cxc',
            label: 'CxC P04',
            icon: <Coins className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'adm_bancos',
            label: 'Banco SPEI',
            icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'adm_cfdi',
            label: 'CFDI 4.0',
            icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'adm_nomina',
            label: 'Prenómina',
            icon: <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      case 'responsable_sanitario':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'san_carpetas',
            label: 'Auditoría',
            icon: <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'san_constancias',
            label: 'Constancias',
            icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'san_lotes',
            label: 'COFEPRIS',
            icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'san_mip',
            label: 'Red MIP',
            icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      case 'crm_clientes':
        return [
          {
            id: 'home',
            label: 'Inicio',
            icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'crm_expediente',
            label: 'Expediente',
            icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'crm_certificados',
            label: 'Certificados',
            icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
          {
            id: 'crm_mapa',
            label: 'Red MIP',
            icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
          },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItemsForRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0c10]/95 backdrop-blur-xl border-t border-[#332714] px-1 sm:px-4 py-1.5 flex items-center justify-around lg:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.8)] w-full max-w-full overflow-hidden select-none">
      {navItems.map((item) => {
        const isSelected = activeModuleId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectModule(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl flex-1 max-w-[85px] min-h-[44px] transition-all ${
              isSelected
                ? 'text-[#f59e0b]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${isSelected ? 'scale-110 bg-[#2b200e] text-[#f59e0b]' : ''}`}>
              {item.icon}
            </div>
            <span className={`text-[9px] sm:text-[10px] leading-tight truncate w-full text-center mt-0.5 ${isSelected ? 'font-bold text-[#f59e0b]' : 'font-medium'}`}>
              {item.label}
            </span>
            {isSelected && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-0.5 shadow-[0_0_6px_#f59e0b]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
