import React, { useState } from 'react';
import { UserRole } from './types/titan';
import { Header } from './components/Header';
import { HubNavigation } from './components/HubNavigation';
import { SalesProcessNav, SalesStep } from './components/sales/SalesProcessNav';
import { SalesDashboard } from './components/sales/SalesDashboard';
import { ProspectForm } from './components/sales/ProspectForm';
import { QuoteEngine } from './components/sales/QuoteEngine';
import { ContractClose } from './components/sales/ContractClose';
import { ServicesModule } from './components/services/ServicesModule';
import { MipModule } from './components/mip/MipModule';
import { InventoryModule } from './components/inventory/InventoryModule';
import { AdminModule } from './components/admin/AdminModule';
import { BiometricsModule } from './components/biometrics/BiometricsModule';
import { SanitaryModule } from './components/sanitary/SanitaryModule';
import { GeneralDashboard } from './components/general/GeneralDashboard';
import { CrmClientPortal } from './components/crm/CrmClientPortal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { RoleSwitchModal } from './components/RoleSwitchModal';
import { 
  INITIAL_PROSPECT, 
  INITIAL_QUOTE, 
  INITIAL_CONTRACT, 
  INITIAL_CHEMICALS, 
  INITIAL_MIP_STATIONS, 
  INITIAL_SERVICE_ORDERS, 
  INITIAL_ACCOUNTS, 
  INITIAL_ATTENDANCE 
} from './data/mockData';
import { Prospect, Quote, ContractData, ServiceExecution } from './types/titan';

export default function App() {
  // Navigation & Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('direccion_general');
  const [activeModule, setActiveModule] = useState<string>('hub');
  const [salesStep, setSalesStep] = useState<SalesStep>('dashboard');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Master Shared State (The Single Master Record / Expediente Único)
  const [prospect, setProspect] = useState<Prospect>(INITIAL_PROSPECT);
  const [quote, setQuote] = useState<Quote>(INITIAL_QUOTE);
  const [contract, setContract] = useState<ContractData>(INITIAL_CONTRACT);
  const [services, setServices] = useState<ServiceExecution[]>(INITIAL_SERVICE_ORDERS);
  const [chemicals, setChemicals] = useState(INITIAL_CHEMICALS);
  const [mipStations, setMipStations] = useState(INITIAL_MIP_STATIONS);
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);

  // Handlers for Commercial Process
  const handleProceedToQuote = (updatedProspect: Prospect) => {
    setProspect(updatedProspect);
    setQuote((prev) => ({
      ...prev,
      prospectId: updatedProspect.id,
      zone: updatedProspect.zone,
      propertySize: updatedProspect.propertySize,
      serviceType: updatedProspect.serviceType,
    }));
    setSalesStep('cotizacion');
  };

  const handleProceedToClose = (updatedQuote: Quote) => {
    setQuote(updatedQuote);
    setContract((prev) => ({
      ...prev,
      quoteId: updatedQuote.id,
      contractType: updatedQuote.contractType,
    }));
    setSalesStep('cierre');
  };

  const handleFinalizeContract = (updatedContract: ContractData) => {
    setContract(updatedContract);

    // BIFURCACIÓN INTELIGENTE:
    // 1. Canalizar a Servicios / Técnico de Zona (sin datos fiscales/bancarios)
    const newServiceOrder: ServiceExecution = {
      id: `SRV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      contractFolio: updatedContract.contractFolio,
      clientFolio: updatedContract.clientFolio,
      clientBusinessName: updatedContract.fiscalBusinessName,
      address: updatedContract.fiscalAddress,
      zone: prospect.zone,
      serviceType: quote.serviceType,
      frequency: quote.frequency,
      assignedTechnician: prospect.zone === 'NORTE' ? 'Roberto Garza' : prospect.zone === 'CENTRO' ? 'Carlos Mendoza' : 'Javier Villarreal',
      scheduledDate: updatedContract.startDate,
      scheduledTime: '09:00',
      status: 'programado',
      inspectedArea: 'Inmueble completo según levantamiento comercial',
      observedPests: prospect.reportedPests.map((p) => p.pest),
      activityLevel: 1,
    };
    setServices((prev) => [newServiceOrder, ...prev]);

    // 2. Canalizar a Administración / CxC (contrato firmado, fiscales SAT, bancarios)
    const newAccount: any = {
      id: `cxc-${Date.now()}`,
      contractFolio: updatedContract.contractFolio,
      clientFolio: updatedContract.clientFolio,
      clientName: updatedContract.fiscalBusinessName,
      invoiceFolio: `FAC-2026-${Math.floor(4000 + Math.random() * 900)}`,
      amount: Math.round(quote.agreedMonthlyPrice * 1.16),
      issueDate: updatedContract.startDate,
      dueDate: '2026-10-20',
      paymentReference: updatedContract.paymentReference,
      status: 'por_vencer',
      cfdiStatus: 'emitido',
    };
    setAccounts((prev) => [newAccount, ...prev]);

    // Return to Sales Dashboard
    setSalesStep('dashboard');
  };

  const handleCompleteService = (completedOrder: ServiceExecution) => {
    setServices((prev) =>
      prev.map((s) => (s.id === completedOrder.id ? completedOrder : s))
    );

    // Automatic chemical discount from inventory
    if (completedOrder.appliedChemicals && completedOrder.appliedChemicals.length > 0) {
      const chemUsed = completedOrder.appliedChemicals[0];
      setChemicals((prev) =>
        prev.map((c) =>
          c.id === chemUsed.productId
            ? { ...c, currentStock: Math.max(0, c.currentStock - 1) }
            : c
        )
      );
    }
  };

  // Determine Title and Subtitle based on module & sub-step
  const getContextualHeaders = () => {
    if (activeModule === 'hub') {
      return { title: 'Pantalla Principal', subtitle: 'Sistema Integral de Operaciones' };
    }
    if (activeModule === 'ventas') {
      const stepNames: Record<SalesStep, string> = {
        dashboard: 'Dashboard de Ventas (P01)',
        prospecto: 'Prospecto / Levantamiento (P02)',
        cotizacion: 'Cotización / Seguimiento (P03)',
        cierre: 'Cierre / Contrato (P04)',
      };
      return { title: 'Ventas', subtitle: stepNames[salesStep] };
    }
    if (activeModule === 'servicios') {
      return { title: 'Servicios', subtitle: 'Agenda, Rutas GPS y Ejecución en Campo' };
    }
    if (activeModule === 'administracion') {
      return { title: 'Administración', subtitle: 'CxC, Conciliación Bancaria y Facturación CFDI' };
    }
    if (activeModule === 'responsable_sanitario') {
      return { title: 'Responsable Sanitario', subtitle: 'NOM-256-SSA1-2012 y COFEPRIS' };
    }
    if (activeModule === 'crm_clientes') {
      return { title: 'Portal CRM Clientes', subtitle: 'Expediente y Constancias Digitales' };
    }
    if (activeModule === 'direccion_general' || activeModule === 'direccion_operaciones') {
      return { title: 'Dirección General', subtitle: 'Dashboard Ejecutivo y Rentabilidad Real' };
    }
    if (activeModule === 'mip') {
      return { title: 'MIP', subtitle: 'Mapas, Estaciones y Monitoreo' };
    }
    if (activeModule === 'inventario') {
      return { title: 'Inventario', subtitle: 'Almacén Químico y Trazabilidad de Lotes' };
    }
    if (activeModule === 'biometria') {
      return { title: 'Control de Personal', subtitle: 'Asistencia Biométrica y Prenómina' };
    }
    return { title: 'TITAN Pest Control Group', subtitle: '' };
  };

  const { title: activeTitle, subtitle: activeSubtitle } = getContextualHeaders();

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-[#f59e0b] selection:text-black">
      {/* Institutional Titan Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          // Optional sync of module when switching role
          if (role === 'ventas') {
            setActiveModule('ventas');
            setSalesStep('dashboard');
          } else if (role === 'servicios') {
            setActiveModule('servicios');
          } else if (role === 'administracion') {
            setActiveModule('administracion');
          } else if (role === 'responsable_sanitario') {
            setActiveModule('responsable_sanitario');
          } else if (role === 'crm_clientes') {
            setActiveModule('crm_clientes');
          } else if (role === 'direccion_general' || role === 'direccion_operaciones') {
            setActiveModule('direccion_general');
          }
        }}
        activeModuleTitle={activeTitle}
        activeModuleSubtitle={activeSubtitle}
        onGoHome={() => setActiveModule('hub')}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Secondary Subnav for Quick Cross-Module Switching: Desktop only (hidden on tablet & mobile) */}
      {activeModule !== 'hub' && (
        <div className="hidden lg:flex bg-[#0b0e15] border-b border-[#211a11] px-4 lg:px-8 py-1.5 items-center justify-between text-xs text-slate-400 overflow-x-auto whitespace-nowrap gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveModule('hub')}
              className="text-[#d4a34b] hover:underline font-bold mr-2"
            >
              ‹ Menú Principal
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setActiveModule('direccion_general')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'direccion_general' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Dirección
            </button>
            <button
              onClick={() => {
                setActiveModule('ventas');
                setSalesStep('dashboard');
              }}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'ventas' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Ventas
            </button>
            <button
              onClick={() => setActiveModule('servicios')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'servicios' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Servicios / Rutas
            </button>
            <button
              onClick={() => setActiveModule('mip')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'mip' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              MIP Estaciones
            </button>
            <button
              onClick={() => setActiveModule('inventario')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'inventario' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Inventario Químico
            </button>
            <button
              onClick={() => setActiveModule('administracion')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'administracion' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Administración / CxC
            </button>
            <button
              onClick={() => setActiveModule('biometria')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'biometria' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Biometría
            </button>
            <button
              onClick={() => setActiveModule('responsable_sanitario')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'responsable_sanitario' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Sanitario NOM-256
            </button>
            <button
              onClick={() => setActiveModule('crm_clientes')}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModule === 'crm_clientes' ? 'text-[#f59e0b] font-bold bg-[#1d170d]' : 'hover:text-white'
              }`}
            >
              Portal Cliente
            </button>
          </div>

          <div className="text-[11px] text-[#937b46] hidden md:block">
            Expediente Activo: <strong className="text-white">{prospect.businessName}</strong> ({contract.contractFolio})
          </div>
        </div>
      )}

      {/* Main View Area with Bottom Padding on Tablet/Mobile */}
      <main className="flex-1 pb-24 lg:pb-6">
        {/* Hub / Pantalla Principal */}
        {activeModule === 'hub' && (
          <HubNavigation
            currentRole={currentRole}
            onSelectModule={(key) => {
              if (key === 'ventas') {
                setActiveModule('ventas');
                setSalesStep('dashboard');
              } else {
                setActiveModule(key);
              }
            }}
          />
        )}

        {/* Módulo Ventas (Las 4 vistas definitivas) */}
        {activeModule === 'ventas' && (
          <div className="flex flex-col min-h-full">
            {/* Upper Linear Process Stepper */}
            <SalesProcessNav
              currentStep={salesStep}
              onSelectStep={(step) => setSalesStep(step)}
            />

            {/* P01: Dashboard de Ventas */}
            {salesStep === 'dashboard' && (
              <SalesDashboard
                onStartNewProspect={() => setSalesStep('prospecto')}
                onOpenProspect={() => setSalesStep('prospecto')}
                onOpenQuote={() => setSalesStep('cotizacion')}
                onOpenContract={() => setSalesStep('cierre')}
              />
            )}

            {/* P02: Prospecto / Levantamiento */}
            {salesStep === 'prospecto' && (
              <ProspectForm
                initialData={prospect}
                onSaveDraft={(saved) => {
                  setProspect(saved);
                  alert('Borrador de Prospecto / Levantamiento guardado con éxito.');
                }}
                onProceedToQuote={handleProceedToQuote}
                onCancel={() => setSalesStep('dashboard')}
              />
            )}

            {/* P03: Cotización / Seguimiento */}
            {salesStep === 'cotizacion' && (
              <QuoteEngine
                prospect={prospect}
                initialQuote={quote}
                onSaveDraft={(savedQuote) => {
                  setQuote(savedQuote);
                  alert('Borrador de Cotización guardado.');
                }}
                onProceedToClose={handleProceedToClose}
                onBackToProspect={() => setSalesStep('prospecto')}
              />
            )}

            {/* P04: Cierre / Contrato */}
            {salesStep === 'cierre' && (
              <ContractClose
                prospect={prospect}
                quote={quote}
                initialContract={contract}
                onSaveDraft={(savedContract) => {
                  setContract(savedContract);
                  alert('Borrador de Cierre / Contrato guardado.');
                }}
                onFinalizeContract={handleFinalizeContract}
                onCancel={() => setSalesStep('cotizacion')}
              />
            )}
          </div>
        )}

        {/* Servicios, Rutas GPS y Técnicos */}
        {activeModule === 'servicios' && (
          <ServicesModule
            orders={services}
            chemicals={chemicals}
            onCompleteService={handleCompleteService}
          />
        )}

        {/* Manejo Integral de Plagas (MIP) */}
        {activeModule === 'mip' && (
          <MipModule
            stations={mipStations}
            onUpdateStation={(updated) => {
              setMipStations((prev) =>
                prev.map((s) => (s.id === updated.id ? updated : s))
              );
            }}
          />
        )}

        {/* Inventario Químico */}
        {activeModule === 'inventario' && (
          <InventoryModule chemicals={chemicals} />
        )}

        {/* Administración, CxC y Bancos */}
        {activeModule === 'administracion' && (
          <AdminModule accounts={accounts} />
        )}

        {/* Asistencia Biométrica y Nómina */}
        {activeModule === 'biometria' && (
          <BiometricsModule attendanceRecords={attendance} />
        )}

        {/* Responsable Sanitario NOM-256 */}
        {activeModule === 'responsable_sanitario' && (
          <SanitaryModule
            completedOrders={services.filter((s) => s.status === 'completado')}
            chemicals={chemicals}
          />
        )}

        {/* Dirección General & Rentabilidad */}
        {(activeModule === 'direccion_general' || activeModule === 'direccion_operaciones') && (
          <GeneralDashboard
            onNavigateToModule={(mod) => {
              if (mod === 'ventas') {
                setActiveModule('ventas');
                setSalesStep('dashboard');
              } else {
                setActiveModule(mod);
              }
            }}
          />
        )}

        {/* Portal Cliente CRM */}
        {activeModule === 'crm_clientes' && (
          <CrmClientPortal
            contract={contract}
            services={services}
            mipStations={mipStations}
          />
        )}
      </main>

      {/* Mobile and Tablet Bottom Navigation Bar (App-like experience) */}
      <MobileBottomNav
        activeModule={activeModule}
        currentRole={currentRole}
        onNavigate={(mod) => {
          if (mod === 'ventas') {
            setActiveModule('ventas');
            setSalesStep('dashboard');
          } else {
            setActiveModule(mod);
          }
        }}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
      />

      {/* Master Role Switcher and Logout Modal */}
      <RoleSwitchModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={(role) => {
          setCurrentRole(role);
          if (role === 'ventas') {
            setActiveModule('ventas');
            setSalesStep('dashboard');
          } else if (role === 'servicios') {
            setActiveModule('servicios');
          } else if (role === 'administracion') {
            setActiveModule('administracion');
          } else if (role === 'responsable_sanitario') {
            setActiveModule('responsable_sanitario');
          } else if (role === 'crm_clientes') {
            setActiveModule('crm_clientes');
          } else {
            setActiveModule('direccion_general');
          }
        }}
      />

      {/* Global Footer Note (hidden on mobile/tablet to give room to bottom bar) */}
      <footer className="hidden lg:block bg-[#07080b] border-t border-[#1f190e] py-3 px-6 text-center text-[11px] text-slate-500">
        TITAN PEST CONTROL GROUP · Arquitectura Funcional 1.0 (v9) · Todos los derechos reservados · NOM-256-SSA1-2012 / COFEPRIS
      </footer>
    </div>
  );
}
