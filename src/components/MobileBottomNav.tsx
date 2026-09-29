import React, { useState } from 'react';
import { 
  Home, 
  LayoutGrid, 
  UserCircle2, 
  Handshake, 
  Bug, 
  Coins, 
  FlaskConical, 
  Building2, 
  Settings2, 
  Package, 
  Fingerprint, 
  Users, 
  LogOut, 
  X,
  ShieldAlert,
  ChevronUp
} from 'lucide-react';
import { UserRole } from '../types/titan';
import { ROLE_LABELS } from './Header';

interface MobileBottomNavProps {
  activeModule: string;
  currentRole: UserRole;
  onNavigate: (moduleKey: string) => void;
  onOpenRoleModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModule,
  currentRole,
  onNavigate,
  onOpenRoleModal,
}) => {
  const [showModulesSheet, setShowModulesSheet] = useState(false);
  const currentRoleInfo = ROLE_LABELS[currentRole];

  // Helper to get icon for active module or current role
  const getRoleModuleIcon = () => {
    switch (currentRole) {
      case 'ventas':
        return <Handshake className="w-5 h-5" />;
      case 'servicios':
        return <Bug className="w-5 h-5" />;
      case 'administracion':
        return <Coins className="w-5 h-5" />;
      case 'responsable_sanitario':
        return <FlaskConical className="w-5 h-5" />;
      case 'crm_clientes':
        return <Users className="w-5 h-5" />;
      case 'direccion_operaciones':
        return <Settings2 className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const allModulesList = [
    { key: 'direccion_general', label: 'Dirección General', icon: <Building2 className="w-5 h-5 text-[#f59e0b]" />, desc: 'KPIs y margen' },
    { key: 'direccion_operaciones', label: 'Operaciones', icon: <Settings2 className="w-5 h-5 text-[#f59e0b]" />, desc: 'Rutas y técnicos' },
    { key: 'ventas', label: 'Ventas Comercial', icon: <Handshake className="w-5 h-5 text-[#f59e0b]" />, desc: 'P01 a P04' },
    { key: 'servicios', label: 'Servicios de Campo', icon: <Bug className="w-5 h-5 text-[#f59e0b]" />, desc: 'Check-in y bitácoras' },
    { key: 'mip', label: 'MIP Estaciones', icon: <ShieldAlert className="w-5 h-5 text-[#f59e0b]" />, desc: 'Croquis y monitoreo' },
    { key: 'inventario', label: 'Inventario Químico', icon: <Package className="w-5 h-5 text-[#f59e0b]" />, desc: 'Lotes y COFEPRIS' },
    { key: 'administracion', label: 'Administración / CxC', icon: <Coins className="w-5 h-5 text-[#f59e0b]" />, desc: 'Facturación y banco' },
    { key: 'biometria', label: 'Biometría & Personal', icon: <Fingerprint className="w-5 h-5 text-[#f59e0b]" />, desc: 'Huella y nómina' },
    { key: 'responsable_sanitario', label: 'Sanitario NOM-256', icon: <FlaskConical className="w-5 h-5 text-[#f59e0b]" />, desc: 'Certificados oficiales' },
    { key: 'crm_clientes', label: 'Portal Cliente', icon: <Users className="w-5 h-5 text-[#f59e0b]" />, desc: 'Expediente digital' },
  ];

  return (
    <>
      {/* Bottom Sheet Drawer for All Modules */}
      {showModulesSheet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden flex flex-col justify-end">
          <div className="bg-[#10131d] border-t-2 border-[#d4a34b] rounded-t-3xl p-5 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between border-b border-[#292214] pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#f59e0b]">
                  Sistema TITAN Mobile
                </span>
                <h3 className="text-base font-bold text-white">
                  Módulos del Sistema por Rol
                </h3>
              </div>
              <button
                onClick={() => setShowModulesSheet(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-[#191d29] rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of All Role Modules */}
            <div className="grid grid-cols-2 gap-2.5">
              {allModulesList.map((m) => {
                const isCurrent = activeModule === m.key;
                return (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => {
                      onNavigate(m.key);
                      setShowModulesSheet(false);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                      isCurrent
                        ? 'bg-[#291f0d] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'bg-[#151926] border-[#292215] hover:bg-[#1a2030]'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-[#0e1017] border border-[#2d2417] shrink-0">
                      {m.icon}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">
                        {m.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {m.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Role switch button inside sheet */}
            <div className="pt-2 border-t border-[#292214] flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowModulesSheet(false);
                  onOpenRoleModal();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1b170e] hover:bg-[#2c2211] border border-[#423418] text-[#d4a34b] font-bold py-2.5 rounded-xl text-xs"
              >
                <UserCircle2 className="w-4 h-4" />
                <span>Cambiar Rol / Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Sticky Bottom Navigation Bar for Mobile and Tablet (lg:hidden) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0f16]/95 backdrop-blur-xl border-t border-[#2e2617] px-3 py-1.5 flex items-center justify-around lg:hidden shadow-[0_-8px_20px_rgba(0,0,0,0.6)]">
        {/* Tab 1: Hub / Inicio */}
        <button
          onClick={() => onNavigate('hub')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[64px] min-h-[44px] transition-colors ${
            activeModule === 'hub'
              ? 'text-[#f59e0b]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold">Inicio</span>
          {activeModule === 'hub' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-0.5" />
          )}
        </button>

        {/* Tab 2: Mi Rol / Módulo Principal */}
        <button
          onClick={() => {
            if (currentRole === 'ventas') onNavigate('ventas');
            else if (currentRole === 'servicios') onNavigate('servicios');
            else if (currentRole === 'administracion') onNavigate('administracion');
            else if (currentRole === 'responsable_sanitario') onNavigate('responsable_sanitario');
            else if (currentRole === 'crm_clientes') onNavigate('crm_clientes');
            else onNavigate('direccion_general');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[64px] min-h-[44px] transition-colors ${
            activeModule !== 'hub' && (activeModule === currentRole || activeModule === 'ventas' || activeModule === 'servicios')
              ? 'text-[#f59e0b]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            {getRoleModuleIcon()}
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#f59e0b]" />
          </div>
          <span className="text-[10px] font-semibold truncate max-w-[70px]">
            {currentRole === 'ventas' ? 'Ventas' : currentRole === 'servicios' ? 'Servicios' : 'Mi Rol'}
          </span>
        </button>

        {/* Tab 3: Módulos (Grid Launcher) */}
        <button
          onClick={() => setShowModulesSheet(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[64px] min-h-[44px] transition-colors ${
            showModulesSheet
              ? 'text-[#f59e0b]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="w-6 h-6 rounded-lg bg-[#1f190e] border border-[#d4a34b]/40 flex items-center justify-center text-[#f59e0b] shadow-inner mb-0.5">
            <LayoutGrid className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-bold text-[#d4a34b]">Módulos</span>
        </button>

        {/* Tab 4: Roles / Cerrar Sesión */}
        <button
          onClick={onOpenRoleModal}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl min-w-[64px] min-h-[44px] text-slate-400 hover:text-slate-200 transition-colors"
        >
          <UserCircle2 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold">Roles / Salir</span>
        </button>
      </nav>
    </>
  );
};
