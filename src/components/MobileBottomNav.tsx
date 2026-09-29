import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  UserPlus, 
  FileSpreadsheet, 
  FileCheck, 
  Navigation, 
  Bug, 
  ShieldAlert, 
  Package, 
  Coins, 
  Fingerprint, 
  FileText, 
  FlaskConical, 
  Building2, 
  Handshake, 
  Award,
  Layers
} from 'lucide-react';
import { UserRole } from '../types/titan';
import { SalesStep } from './sales/SalesProcessNav';

interface MobileBottomNavProps {
  activeModule: string;
  currentRole: UserRole;
  salesStep: SalesStep;
  onNavigateModule: (moduleKey: string) => void;
  onSelectSalesStep: (step: SalesStep) => void;
}

interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModule,
  currentRole,
  salesStep,
  onNavigateModule,
  onSelectSalesStep,
}) => {
  // If user is inside the Ventas module (or current role is Ventas):
  // Expose the 4 views of Ventas + Inicio in the bottom bar!
  const isVentasMode = activeModule === 'ventas' || currentRole === 'ventas';

  const getItemsForCurrentRole = (): BottomNavItem[] => {
    if (isVentasMode) {
      return [
        {
          id: 'hub',
          label: 'Inicio',
          icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'hub',
          onClick: () => onNavigateModule('hub'),
        },
        {
          id: 'p01',
          label: 'P01 Dash',
          icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'ventas' && salesStep === 'dashboard',
          onClick: () => {
            onNavigateModule('ventas');
            onSelectSalesStep('dashboard');
          },
        },
        {
          id: 'p02',
          label: 'P02 Prosp',
          icon: <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'ventas' && salesStep === 'prospecto',
          onClick: () => {
            onNavigateModule('ventas');
            onSelectSalesStep('prospecto');
          },
        },
        {
          id: 'p03',
          label: 'P03 Cotiz',
          icon: <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'ventas' && salesStep === 'cotizacion',
          onClick: () => {
            onNavigateModule('ventas');
            onSelectSalesStep('cotizacion');
          },
        },
        {
          id: 'p04',
          label: 'P04 Cierre',
          icon: <FileCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'ventas' && salesStep === 'cierre',
          onClick: () => {
            onNavigateModule('ventas');
            onSelectSalesStep('cierre');
          },
        },
      ];
    }

    if (currentRole === 'direccion_operaciones') {
      return [
        {
          id: 'hub',
          label: 'Inicio',
          icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'hub',
          onClick: () => onNavigateModule('hub'),
        },
        {
          id: 'servicios',
          label: 'Operaciones',
          icon: <Bug className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'servicios',
          onClick: () => onNavigateModule('servicios'),
        },
        {
          id: 'mip',
          label: 'Red MIP',
          icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'mip',
          onClick: () => onNavigateModule('mip'),
        },
        {
          id: 'inventario',
          label: 'Químicos',
          icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'inventario',
          onClick: () => onNavigateModule('inventario'),
        },
        {
          id: 'biometria',
          label: 'Asistencia',
          icon: <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'biometria',
          onClick: () => onNavigateModule('biometria'),
        },
      ];
    }

    if (currentRole === 'servicios') {
      return [
        {
          id: 'hub',
          label: 'Inicio',
          icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'hub',
          onClick: () => onNavigateModule('hub'),
        },
        {
          id: 'servicios',
          label: 'Rutas / Agenda',
          icon: <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'servicios',
          onClick: () => onNavigateModule('servicios'),
        },
        {
          id: 'mip',
          label: 'MIP Croquis',
          icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'mip',
          onClick: () => onNavigateModule('mip'),
        },
        {
          id: 'inventario',
          label: 'Químicos',
          icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'inventario',
          onClick: () => onNavigateModule('inventario'),
        },
        {
          id: 'biometria',
          label: 'Asistencia',
          icon: <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'biometria',
          onClick: () => onNavigateModule('biometria'),
        },
      ];
    }

    if (currentRole === 'administracion') {
      return [
        {
          id: 'hub',
          label: 'Inicio',
          icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'hub',
          onClick: () => onNavigateModule('hub'),
        },
        {
          id: 'administracion',
          label: 'CxC / Banco',
          icon: <Coins className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'administracion',
          onClick: () => onNavigateModule('administracion'),
        },
        {
          id: 'biometria',
          label: 'Nómina',
          icon: <Fingerprint className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'biometria',
          onClick: () => onNavigateModule('biometria'),
        },
        {
          id: 'ventas',
          label: 'Contratos',
          icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'ventas',
          onClick: () => {
            onNavigateModule('ventas');
            onSelectSalesStep('dashboard');
          },
        },
      ];
    }

    if (currentRole === 'responsable_sanitario') {
      return [
        {
          id: 'hub',
          label: 'Inicio',
          icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'hub',
          onClick: () => onNavigateModule('hub'),
        },
        {
          id: 'responsable_sanitario',
          label: 'Bitácoras NOM',
          icon: <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'responsable_sanitario',
          onClick: () => onNavigateModule('responsable_sanitario'),
        },
        {
          id: 'inventario',
          label: 'Lotes Químicos',
          icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'inventario',
          onClick: () => onNavigateModule('inventario'),
        },
        {
          id: 'mip',
          label: 'Estaciones MIP',
          icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'mip',
          onClick: () => onNavigateModule('mip'),
        },
      ];
    }

    if (currentRole === 'crm_clientes') {
      return [
        {
          id: 'hub',
          label: 'Inicio',
          icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'hub',
          onClick: () => onNavigateModule('hub'),
        },
        {
          id: 'crm_clientes',
          label: 'Certificados',
          icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'crm_clientes',
          onClick: () => onNavigateModule('crm_clientes'),
        },
        {
          id: 'mip',
          label: 'Red MIP',
          icon: <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />,
          isActive: activeModule === 'mip',
          onClick: () => onNavigateModule('mip'),
        },
      ];
    }

    // Default: Dirección General
    return [
      {
        id: 'hub',
        label: 'Inicio',
        icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
        isActive: activeModule === 'hub',
        onClick: () => onNavigateModule('hub'),
      },
      {
        id: 'direccion_general',
        label: 'Dirección',
        icon: <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />,
        isActive: activeModule === 'direccion_general',
        onClick: () => onNavigateModule('direccion_general'),
      },
      {
        id: 'ventas',
        label: 'Ventas',
        icon: <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />,
        isActive: activeModule === 'ventas',
        onClick: () => {
          onNavigateModule('ventas');
          onSelectSalesStep('dashboard');
        },
      },
      {
        id: 'servicios',
        label: 'Servicios',
        icon: <Bug className="w-4 h-4 sm:w-5 sm:h-5" />,
        isActive: activeModule === 'servicios',
        onClick: () => onNavigateModule('servicios'),
      },
      {
        id: 'administracion',
        label: 'Finanzas',
        icon: <Coins className="w-4 h-4 sm:w-5 sm:h-5" />,
        isActive: activeModule === 'administracion',
        onClick: () => onNavigateModule('administracion'),
      },
    ];
  };

  const navItems = getItemsForCurrentRole();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e15]/95 backdrop-blur-xl border-t border-[#332714] px-1 sm:px-4 py-1.5 flex items-center justify-around xl:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.7)] w-full max-w-full overflow-hidden select-none">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={item.onClick}
          className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2 rounded-xl flex-1 max-w-[85px] min-h-[44px] transition-all ${
            item.isActive
              ? 'text-[#f59e0b]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-lg transition-transform ${item.isActive ? 'scale-110 bg-[#2b200e] text-[#f59e0b]' : ''}`}>
            {item.icon}
          </div>
          <span className={`text-[9px] sm:text-[10px] leading-tight truncate w-full text-center mt-0.5 ${item.isActive ? 'font-bold text-[#f59e0b]' : 'font-medium'}`}>
            {item.label}
          </span>
          {item.isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-0.5 shadow-[0_0_6px_#f59e0b]" />
          )}
        </button>
      ))}
    </nav>
  );
};
