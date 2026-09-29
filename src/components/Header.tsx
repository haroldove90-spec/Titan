import React from 'react';
import { UserRole } from '../types/titan';
import { 
  Bell, 
  Search, 
  Shield, 
  ChevronDown, 
  Home, 
  UserCheck, 
  Clock, 
  SlidersHorizontal 
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeModuleTitle?: string;
  activeModuleSubtitle?: string;
  onGoHome: () => void;
  onSearch?: (query: string) => void;
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
    <header className="sticky top-0 z-50 bg-[#0d0f15] border-b border-[#2a2415] px-4 lg:px-6 py-2.5 flex items-center justify-between text-slate-200 shadow-xl">
      {/* Brand & Module Indicator */}
      <div className="flex items-center gap-4">
        <button
          onClick={onGoHome}
          className="flex items-center gap-3 text-left group focus:outline-none"
          title="Ir a Pantalla Principal"
        >
          {/* Spartan Gold Shield Emblem */}
          <div className="relative w-10 h-11 flex items-center justify-center bg-gradient-to-b from-[#d4a34b] via-[#8f6d28] to-[#42310d] rounded-t-lg rounded-b-2xl p-[1.5px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0a0c10] rounded-t-[7px] rounded-b-[14px] flex items-center justify-center relative overflow-hidden">
              <Shield className="w-6 h-6 text-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#f59e0b]/10 to-transparent" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-brand font-black text-xl tracking-wider text-[#d4a34b] drop-shadow-sm">
                TITAN
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                Pest Control Group
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-wider text-[#9d834a] font-medium hidden sm:block">
              Protegemos lo que más importa
            </p>
          </div>
        </button>

        {/* Section Divider */}
        <div className="h-7 w-[1px] bg-[#2d2516] hidden md:block" />

        {/* Dynamic Context Header */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-white tracking-wide">
              {activeModuleTitle}
            </h1>
            {activeModuleSubtitle && (
              <>
                <span className="text-slate-600">/</span>
                <span className="text-xs font-medium text-[#d4a34b]">
                  {activeModuleSubtitle}
                </span>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-400">
            Arquitectura Funcional 1.0 (v9) · Capturar una vez, utilizar en toda la empresa
          </p>
        </div>
      </div>

      {/* Middle: Quick Search */}
      <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar prospecto, cliente, folio o servicio..."
            className="w-full bg-[#13161f] border border-[#2a2416] rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#d4a34b] focus:ring-1 focus:ring-[#d4a34b]/40 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions, Date, Notifications & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Home shortcut */}
        <button
          onClick={onGoHome}
          className="p-1.5 rounded-lg bg-[#141720] border border-[#272115] hover:border-[#d4a34b] text-slate-400 hover:text-white transition-colors"
          title="Menú Principal de Módulos"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* System Date & Time indicator */}
        <div className="hidden xl:flex items-center gap-2 text-xs text-slate-300 bg-[#12151e] border border-[#272014] px-3 py-1 rounded-md">
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
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#dc2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#0d0f15]">
              1
            </span>
          </button>
        </div>

        {/* User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 bg-[#141722] hover:bg-[#1a1f2e] border border-[#382d18] rounded-lg px-2.5 py-1 text-left transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4a34b] to-[#634816] flex items-center justify-center font-bold text-black text-xs shadow-inner">
              {roleInfo.user.charAt(0)}
            </div>
            <div className="hidden md:block leading-tight">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{roleInfo.user}</span>
              </div>
              <div className="text-[10px] text-[#d4a34b] font-medium">
                {roleInfo.badge}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {dropdownOpen && (
            <div 
              className="absolute right-0 mt-2 w-72 bg-[#12151e] border border-[#423319] rounded-xl shadow-2xl p-2 z-50 backdrop-blur-md"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="px-2 py-1.5 border-b border-[#251f14] mb-1 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4a34b] flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3" /> Cambiar Rol Activo
                </span>
                <span className="text-[9px] text-slate-400">Simulación Multi-Rol</span>
              </div>

              {(Object.keys(ROLE_LABELS) as UserRole[]).map((roleKey) => {
                const item = ROLE_LABELS[roleKey];
                const isSelected = currentRole === roleKey;
                return (
                  <button
                    key={roleKey}
                    onClick={() => {
                      onRoleChange(roleKey);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#292010] text-[#f59e0b] font-semibold border border-[#d4a34b]/30'
                        : 'text-slate-300 hover:bg-[#1a1e2b] hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div className="text-[10px] text-slate-400">{item.user} · {item.badge}</div>
                    </div>
                    {isSelected && <UserCheck className="w-4 h-4 text-[#f59e0b]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
