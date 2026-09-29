import React from 'react';
import { 
  Building2, 
  Settings2, 
  Handshake, 
  Coins, 
  Bug, 
  FlaskConical, 
  Users, 
  Check, 
  X, 
  LogOut, 
  Shield, 
  UserCheck 
} from 'lucide-react';
import { UserRole } from '../types/titan';

interface RoleSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
}

interface RoleOption {
  role: UserRole;
  name: string;
  title: string;
  zone?: string;
  icon: React.ReactNode;
  description: string;
  badge: string;
}

export const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'direccion_general',
    name: 'Francisco Valenzuela',
    title: 'Director General',
    icon: <Building2 className="w-5 h-5 text-[#f59e0b]" />,
    description: 'Control ejecutivo integral, margen real y cobranza total.',
    badge: 'Acceso Total',
  },
  {
    role: 'direccion_operaciones',
    name: 'Ing. Rodrigo Serna',
    title: 'Director de Operaciones',
    icon: <Settings2 className="w-5 h-5 text-[#f59e0b]" />,
    description: 'Supervisión en ruta, técnicos, incidencias y flota.',
    badge: 'Operaciones',
  },
  {
    role: 'ventas',
    name: 'Ana López',
    title: 'Ejecutiva Comercial Senior',
    icon: <Handshake className="w-5 h-5 text-[#f59e0b]" />,
    description: 'Prospectos, cotizaciones con motor v9 y contratos digitales.',
    badge: 'Comercial',
  },
  {
    role: 'servicios',
    name: 'Carlos Mendoza',
    title: 'Técnico Especialista de Campo',
    zone: 'Zona Centro',
    icon: <Bug className="w-5 h-5 text-[#f59e0b]" />,
    description: 'Rutas GPS, check-in, MIP y bitácoras NOM-256.',
    badge: 'Técnico en Sitio',
  },
  {
    role: 'administracion',
    name: 'Lic. Sofía Garza',
    title: 'Jefa de Finanzas y Administración',
    icon: <Coins className="w-5 h-5 text-[#f59e0b]" />,
    description: 'CxC, conciliación bancaria SPEI, nómina y facturas CFDI.',
    badge: 'Finanzas & SAT',
  },
  {
    role: 'responsable_sanitario',
    name: 'Dr. Manuel H. Rivas',
    title: 'Responsable Sanitario Autorizado',
    icon: <FlaskConical className="w-5 h-5 text-[#f59e0b]" />,
    description: 'Cumplimiento NOM-256-SSA1-2012, carpetas COFEPRIS.',
    badge: 'Reg. Sanitario',
  },
  {
    role: 'crm_clientes',
    name: 'Luis Martínez',
    title: 'Restaurante El Roble (Cliente)',
    zone: 'Zona Centro',
    icon: <Users className="w-5 h-5 text-[#f59e0b]" />,
    description: 'Portal del cliente: consulta de bitácoras y estaciones.',
    badge: 'Cliente Activo',
  },
];

export const RoleSwitchModal: React.FC<RoleSwitchModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#10131d] border border-[#423319] rounded-2xl max-w-xl w-full p-4 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#292214] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#1f190d] border border-[#d4a34b]/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Sesión y Navegación de Roles
              </h3>
              <p className="text-[11px] text-slate-400">
                Selecciona con qué colaborador o perfil deseas operar en el sistema
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1a1e2b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {ROLE_OPTIONS.map((opt) => {
            const isSelected = currentRole === opt.role;
            return (
              <button
                key={opt.role}
                type="button"
                onClick={() => {
                  onSelectRole(opt.role);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                  isSelected
                    ? 'bg-[#291f0c] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.25)] ring-1 ring-[#f59e0b]/40'
                    : 'bg-[#141723] border-[#262015] hover:border-[#d4a34b]/50 hover:bg-[#191d2c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-[#3b2d13] border-[#f59e0b]' : 'bg-[#0f1118] border-[#2d2417]'
                  }`}>
                    {opt.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white">
                        {opt.name}
                      </span>
                      <span className="text-[9px] sm:text-[10px] bg-[#1a170f] text-[#d4a34b] border border-[#3f3117] px-1.5 py-0.5 rounded font-semibold">
                        {opt.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium">
                      {opt.title} {opt.zone ? `· ${opt.zone}` : ''}
                    </div>
                    <div className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                      {opt.description}
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {isSelected ? (
                    <div className="w-7 h-7 rounded-full bg-[#f59e0b] text-black flex items-center justify-center shadow">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-[11px] text-[#8a723e] font-semibold hover:underline">
                      Cambiar ›
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Logout Action */}
        <div className="pt-3 border-t border-[#292214] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              // Reset to default role or guest
              onSelectRole('direccion_general');
              onClose();
            }}
            className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión actual</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-[#211a10] hover:bg-[#2d2315] text-[#d4a34b] font-bold px-4 py-2 rounded-xl text-xs"
          >
            Volver a la vista
          </button>
        </div>
      </div>
    </div>
  );
};
