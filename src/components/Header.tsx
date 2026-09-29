import React from 'react';
import { UserRole } from '../types/titan';
import { 
  Bell, 
  Search, 
  Shield, 
  Home, 
  Clock, 
  LogOut 
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeModuleTitle?: string;
  activeModuleSubtitle?: string;
  onGoHome: () => void;
  onSearch?: (query: string) => void;
  onOpenRoleModal?: () => void;
}

export const ROLE_LABELS: Record<UserRole, { title: string; user: string; badge: string }> = {
  direccion_general: { title: 'Dirección General', user: 'Francisco Valenzuela', badge: 'Director General' },
  direccion_operaciones: { title: 'Dirección Operaciones', user: 'Ing. Rodrigo Serna', badge: 'Dir. Operaciones' },
  ventas: { title: 'Ventas Comercial', user: 'Ana López', badge: 'Ejecutiva Senior' },
  administracion: { title: 'Administración & Finanzas', user: 'Lic. Sofía Garza', badge: 'Jefa de Finanzas' },
  servicios: { title: 'Servicios de Zona', user: 'Carlos Mendoza', badge: 'Técnico Especialista' },
  responsable_sanitario: { title: 'Responsable Sanitario', user: 'Dr. Manuel H. Rivas', badge: 'Reg. SSA NOM-256' },
  crm_clientes: { title: 'Portal CRM Clientes', user: 'Restaurante El Roble', badge: 'Cliente Activo' },
};

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeModuleTitle = 'Sistema Integral de Operaciones',
  activeModuleSubtitle,
  onGoHome,
  onOpenRoleModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [time, setTime] = React.useState('20:45');
  const roleInfo = ROLE_LABELS[currentRole];

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0d0f15] border-b border-[#2a2415] px-2.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 flex items-center justify-between text-slate-200 shadow-xl w-full max-w-full overflow-hidden">
      {/* Brand & Module Indicator */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none shrink-0"
          title="Ir a Pantalla Principal"
        >
          {/* Spartan Gold Shield Emblem */}
          <div className="relative w-8 h-9 sm:w-10 sm:h-11 flex items-center justify-center bg-gradient-to-b from-[#d4a34b] via-[#8f6d28] to-[#42310d] rounded-t-lg rounded-b-xl p-[1.5px] shadow-lg group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-[#0a0c10] rounded-t-[6px] rounded-b-[10px] flex items-center justify-center relative overflow-hidden">
              <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#f59e0b]/10 to-transparent" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-brand font-black text-base sm:text-xl tracking-wider text-[#d4a34b] drop-shadow-sm">
                TITAN
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-slate-400 hidden xs:inline sm:inline truncate">
                Pest Control
              </span>
            </div>
            <p className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#9d834a] font-medium hidden md:block">
              Protegemos lo que más importa
            </p>
          </div>
        </button>

        {/* Section Divider */}
        <div className="h-6 w-[1px] bg-[#2d2516] hidden md:block" />

        {/* Dynamic Context Header */}
        <div className="hidden md:block min-w-0">
          <div className="flex items-center gap-1.5 truncate">
            <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
              {activeModuleTitle}
            </h1>
            {activeModuleSubtitle && (
              <>
                <span className="text-slate-600">/</span>
                <span className="text-[11px] sm:text-xs font-medium text-[#d4a34b] truncate">
                  {activeModuleSubtitle}
                </span>
              </>
            )}
          </div>
          <p className="text-[10px] text-slate-400 truncate">
            Arquitectura Funcional 1.0 (v9) · Capturar una vez, utilizar en toda la empresa
          </p>
        </div>
      </div>

      {/* Middle: Quick Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-xs mx-4">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar prospecto, cliente, folio o servicio..."
            className="w-full bg-[#13161f] border border-[#2a2416] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a34b] focus:ring-1 focus:ring-[#d4a34b]/40 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions, Date, Notifications & Role Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Home shortcut */}
        <button
          onClick={onGoHome}
          className="p-1.5 rounded-lg bg-[#141720] border border-[#272115] hover:border-[#d4a34b] text-slate-400 hover:text-white transition-colors"
          title="Menú Principal de Módulos"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* System Date & Time indicator */}
        <div className="hidden xl:flex items-center gap-2 text-xs text-slate-300 bg-[#12151e] border border-[#272014] px-2.5 py-1 rounded-md">
          <Clock className="w-3.5 h-3.5 text-[#d4a34b]" />
          <span>29 Sep 2026</span>
          <span className="text-slate-600">|</span>
          <span className="font-mono-tabular text-[#f59e0b] font-semibold">{time}</span>
        </div>

        {/* Bell notification */}
        <div className="relative">
          <button 
            className="p-1.5 rounded-lg bg-[#141720] border border-[#272115] hover:border-[#d4a34b] text-slate-300 relative transition-colors"
            title="Notificaciones de sistema"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#dc2626] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#0d0f15]">
              1
            </span>
          </button>
        </div>

        {/* User Role Profile & Direct Logout Button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* User Profile Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-[#141722] border border-[#382d18] rounded-lg p-1 sm:px-2.5 sm:py-1 text-left">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#d4a34b] to-[#634816] flex items-center justify-center font-bold text-black text-[11px] sm:text-xs shadow-inner shrink-0">
              {roleInfo.user.charAt(0)}
            </div>
            <div className="hidden sm:block leading-tight max-w-[120px]">
              <div className="text-xs font-bold text-white truncate">
                {roleInfo.user}
              </div>
              <div className="text-[10px] text-[#d4a34b] font-medium truncate">
                {roleInfo.badge}
              </div>
            </div>
          </div>

          {/* Explicit Logout Button */}
          <button
            type="button"
            onClick={onOpenRoleModal}
            className="flex items-center gap-1 sm:gap-1.5 bg-[#1e1410] hover:bg-red-950/60 text-red-300 hover:text-red-200 border border-red-900/40 hover:border-red-600/50 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow"
            title="Cerrar sesión para alternar a otro rol"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline text-[11px]">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};
