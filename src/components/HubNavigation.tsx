import React from 'react';
import { 
  Building2, 
  Settings2, 
  Handshake, 
  Coins, 
  Bug, 
  FlaskConical, 
  Users, 
  ChevronRight,
  TrendingUp,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/titan';

interface HubNavigationProps {
  onSelectModule: (moduleKey: string) => void;
  currentRole: UserRole;
}

interface ModuleCardDef {
  key: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  badge?: string;
  bgGradient: string;
  accentBorder: string;
  photoUrl: string;
}

export const HubNavigation: React.FC<HubNavigationProps> = ({ onSelectModule }) => {
  const topModules: ModuleCardDef[] = [
    {
      key: 'direccion_general',
      title: 'Dirección General',
      desc: 'Visión estratégica y control total de la operación.',
      icon: <Building2 className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'Acceso Total',
      bgGradient: 'from-[#171207] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#4a3a1a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    },
    {
      key: 'direccion_operaciones',
      title: 'Dirección Operaciones',
      desc: 'Gestión operativa, técnicos, servicios, logística, rutas y resultados.',
      icon: <Settings2 className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'Control en Ruta',
      bgGradient: 'from-[#171207] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#4a3a1a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    },
    {
      key: 'ventas',
      title: 'Ventas',
      desc: 'Prospectos, cotizaciones y seguimiento comercial.',
      icon: <Handshake className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'Motor Oculto v9',
      bgGradient: 'from-[#1c1508] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#59421a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80',
    },
    {
      key: 'administracion',
      title: 'Administración',
      desc: 'Facturación, pagos, compras, inventarios y control administrativo.',
      icon: <Coins className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'SAT & Bancos',
      bgGradient: 'from-[#171207] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#4a3a1a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const bottomModules: ModuleCardDef[] = [
    {
      key: 'servicios',
      title: 'Servicios',
      desc: 'Programación, ejecución y seguimiento de servicios.',
      icon: <Bug className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'Técnicos & MIP',
      bgGradient: 'from-[#171207] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#4a3a1a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?w=800&auto=format&fit=crop&q=80',
    },
    {
      key: 'responsable_sanitario',
      title: 'Responsable Sanitario',
      desc: 'Cumplimiento normativo, documentación y control sanitario.',
      icon: <FlaskConical className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'NOM-256-SSA1',
      bgGradient: 'from-[#171207] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#4a3a1a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80',
    },
    {
      key: 'crm_clientes',
      title: 'CRM Clientes',
      desc: 'Gestión de clientes, historial de servicios y comunicación.',
      icon: <Users className="w-5 h-5 text-[#f59e0b]" />,
      badge: 'Expediente Único',
      bgGradient: 'from-[#171207] via-[#0f1118] to-[#0a0c10]',
      accentBorder: 'border-[#4a3a1a] hover:border-[#f59e0b]',
      photoUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop&q=80',
    },
  ];

  const renderCard = (card: ModuleCardDef) => (
    <button
      key={card.key}
      onClick={() => onSelectModule(card.key)}
      className={`group text-left relative overflow-hidden rounded-xl border bg-gradient-to-b ${card.bgGradient} ${card.accentBorder} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(212,163,75,0.15)] flex flex-col justify-between`}
    >
      {/* Background Photography with Scrim */}
      <div className="relative h-32 sm:h-36 w-full overflow-hidden">
        <img
          src={card.photoUrl}
          alt={card.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f15] via-[#0d0f15]/70 to-transparent" />
        
        {/* Floating Category Badge */}
        {card.badge && (
          <div className="absolute top-3 right-3 text-[10px] font-semibold text-[#f59e0b] bg-[#12141c]/90 border border-[#423319] px-2 py-0.5 rounded backdrop-blur-sm">
            {card.badge}
          </div>
        )}

        {/* Tactical Gold Icon Pill */}
        <div className="absolute bottom-2 left-4 w-9 h-9 rounded-lg bg-[#141822]/90 border border-[#d4a34b]/40 flex items-center justify-center shadow-lg group-hover:border-[#f59e0b] group-hover:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all">
          {card.icon}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 pt-1 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white group-hover:text-[#f59e0b] transition-colors flex items-center gap-1.5">
              {card.title}
            </h3>
            <ChevronRight className="w-4 h-4 text-[#8a723e] group-hover:text-[#f59e0b] group-hover:translate-x-1 transition-all" />
          </div>
          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {card.desc}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#231e13] flex items-center justify-between text-[11px] text-[#cbb27a] font-medium">
          <span>Abrir módulo</span>
          <span className="text-[10px] text-slate-500">TITAN v9</span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="min-h-[calc(100vh-58px)] bg-radial from-[#151108]/60 via-[#08090d] to-[#050608] px-4 lg:px-10 py-6">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-[#0f121a]/80 border border-[#2b2416] rounded-2xl p-5 sm:p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-[#d4a34b]/10 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#f59e0b] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Arquitectura Funcional 1.0 (v9)
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">Actualización 29 Sep 2026</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-brand font-black text-white tracking-wide">
                SISTEMA INTEGRAL TITAN PEST CONTROL
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Principio rector: <strong className="text-[#f59e0b]">Capturar una vez, utilizar en toda la empresa.</strong>{' '}
                Expediente maestro centralizado que conecta Ventas, Cierre con Contrato Digital, Operaciones de Zona, Almacén Químico y Responsable Sanitario sin recaptura.
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="flex items-center gap-4 bg-[#141722] border border-[#3b2f18] px-4 py-2.5 rounded-xl shrink-0">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Motor de Precios</div>
                <div className="text-sm font-bold text-[#f59e0b]">Margen Objetivo 55%</div>
              </div>
              <div className="h-7 w-[1px] bg-[#292214]" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Regulación</div>
                <div className="text-sm font-bold text-white">NOM-256 SSA1</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Major Modules: Exactly 4 on Top, 3 on Bottom */}
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Top 4 Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topModules.map(renderCard)}
        </div>

        {/* Bottom 3 Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bottomModules.map(renderCard)}
        </div>
      </div>

      {/* Quick Architecture Principle Footer */}
      <div className="max-w-7xl mx-auto mt-6 bg-[#0c0e14] border border-[#211a11] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#d4a34b]" />
          <span>
            <strong>Segregación Inteligente Activa:</strong> Datos fiscales y bancarios viajan a Administración. Datos operativos y fotográficos viajan a Técnicos de Servicio.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#9a8047]">
          <span>SAT CFDI 4.0</span>
          <span>·</span>
          <span>Biometría por Zona</span>
          <span>·</span>
          <span>Croquis MIP Auditable</span>
        </div>
      </div>
    </div>
  );
};
