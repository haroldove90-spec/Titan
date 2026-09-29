import React, { useState } from 'react';
import { UserRole } from './types/titan';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { RoleSwitchModal } from './components/RoleSwitchModal';
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

const getDefaultModuleForRole = (role: UserRole): string => {
  switch (role) {
    case 'direccion_general':
      return 'general_kpi';
    case 'direccion_operaciones':
      return 'op_tablero';
    case 'ventas':
      return 'p01';
    case 'servicios':
      return 'srv_agenda';
    case 'administracion':
      return 'adm_cxc';
    case 'responsable_sanitario':
      return 'san_carpetas';
    case 'crm_clientes':
      return 'crm_expediente';
    default:
      return 'general_kpi';
  }
};

export default function App() {
  // Navigation & Isolated Role State
  const [currentRole, setCurrentRole] = useState<UserRole>('direccion_general');
  const [activeModuleId, setActiveModuleId] = useState<string>('general_kpi');
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

  // Role Switch / Authentication Handler
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setActiveModuleId(getDefaultModuleForRole(newRole));
  };

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
    setActiveModuleId('p03');
  };

  const handleProceedToClose = (updatedQuote: Quote) => {
    setQuote(updatedQuote);
    setContract((prev) => ({
      ...prev,
      quoteId: updatedQuote.id,
      contractType: updatedQuote.contractType,
    }));
    setActiveModuleId('p04');
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
    setActiveModuleId('p01');
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

  // Determine Title and Subtitle based on active module & role
  const getContextualHeaders = () => {
    switch (activeModuleId) {
      case 'general_kpi':
        return { title: 'Dirección General', subtitle: 'Dashboard Ejecutivo y Conversión' };
      case 'general_rentabilidad':
        return { title: 'Dirección General', subtitle: 'Análisis de Rentabilidad Real por Cliente' };
      case 'general_ventas':
        return { title: 'Dirección General', subtitle: 'Supervisión de Cartera de Ventas' };
      case 'general_servicios':
        return { title: 'Dirección General', subtitle: 'Supervisión de Operaciones en Ruta' };
      case 'general_finanzas':
        return { title: 'Dirección General', subtitle: 'Supervisión Financiera y Facturación' };

      case 'op_tablero':
        return { title: 'Dirección de Operaciones', subtitle: 'Flota Activa y Zonas Operativas' };
      case 'op_rutas':
        return { title: 'Dirección de Operaciones', subtitle: 'Agenda y Servicios en Campo' };
      case 'op_almacen':
        return { title: 'Dirección de Operaciones', subtitle: 'Control de Almacén Químico' };
      case 'op_mip':
        return { title: 'Dirección de Operaciones', subtitle: 'Supervisión de Red MIP en Clientes' };
      case 'op_asistencia':
        return { title: 'Dirección de Operaciones', subtitle: 'Control de Asistencia e Incidencias' };

      case 'p01':
        return { title: 'Ventas Comercial', subtitle: 'P01 · Dashboard de Ventas y Trazabilidad' };
      case 'p02':
        return { title: 'Ventas Comercial', subtitle: 'P02 · Prospecto / Levantamiento' };
      case 'p03':
        return { title: 'Ventas Comercial', subtitle: 'P03 · Cotización con Motor v9 Protegido' };
      case 'p04':
        return { title: 'Ventas Comercial', subtitle: 'P04 · Cierre, Contrato y Firmas Digitales' };

      case 'srv_agenda':
        return { title: 'Servicios de Zona', subtitle: 'Mi Agenda del Día y Rutas GPS' };
      case 'srv_ejecucion':
        return { title: 'Servicios de Zona', subtitle: 'Ejecución y Bitácora Oficial NOM-256' };
      case 'srv_mip':
        return { title: 'Servicios de Zona', subtitle: 'Inspección de Estaciones y Croquis MIP' };
      case 'srv_quimicos':
        return { title: 'Servicios de Zona', subtitle: 'Plaguicidas y Lotes Asignados' };
      case 'srv_asistencia':
        return { title: 'Servicios de Zona', subtitle: 'Registro Biométrico de Asistencia' };

      case 'adm_cxc':
        return { title: 'Administración y Finanzas', subtitle: '18.1 Cuentas por Cobrar (CxC) de Contratos' };
      case 'adm_bancos':
        return { title: 'Administración y Finanzas', subtitle: '18.2 Conciliador Bancario Automatizado' };
      case 'adm_cfdi':
        return { title: 'Administración y Finanzas', subtitle: '18.3 Timbrado y Emisión CFDI 4.0' };
      case 'adm_nomina':
        return { title: 'Administración y Finanzas', subtitle: 'Prenómina e Incidencias de Técnicos' };
      case 'adm_contratos':
        return { title: 'Administración y Finanzas', subtitle: 'Contratos Activos y Expedientes' };

      case 'san_carpetas':
        return { title: 'Responsable Sanitario', subtitle: 'Carpeta Regulatoria NOM-256-SSA1-2012' };
      case 'san_constancias':
        return { title: 'Responsable Sanitario', subtitle: 'Constancias Oficiales de Fumigación' };
      case 'san_lotes':
        return { title: 'Responsable Sanitario', subtitle: 'Control de Lotes y Registros COFEPRIS' };
      case 'san_mip':
        return { title: 'Responsable Sanitario', subtitle: 'Auditoría de Incidencias Sanitarias MIP' };

      case 'crm_expediente':
        return { title: 'Portal CRM Clientes', subtitle: 'Expediente Único y Estado del Contrato' };
      case 'crm_certificados':
        return { title: 'Portal CRM Clientes', subtitle: 'Certificados Oficiales con Sello NOM-256' };
      case 'crm_mapa':
        return { title: 'Portal CRM Clientes', subtitle: 'Plano de Monitoreo de Trampas del Inmueble' };

      default:
        return { title: 'TITAN Pest Control Group', subtitle: 'Sistema Integral de Operaciones' };
    }
  };

  const { title: activeTitle, subtitle: activeSubtitle } = getContextualHeaders();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#08090d] text-slate-100 flex flex-row selection:bg-[#f59e0b] selection:text-black relative">
      {/* Desktop Fullscreen Sidebar: exclusive modules per role & prominent logout */}
      <Sidebar
        currentRole={currentRole}
        activeModuleId={activeModuleId}
        onSelectModule={(id) => setActiveModuleId(id)}
        onLogout={() => setIsRoleModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full max-w-full overflow-x-hidden">
        {/* Top Header */}
        <Header
          currentRole={currentRole}
          onRoleChange={handleRoleChange}
          activeModuleTitle={activeTitle}
          activeModuleSubtitle={activeSubtitle}
          onGoHome={() => setActiveModuleId(getDefaultModuleForRole(currentRole))}
          onOpenRoleModal={() => setIsRoleModalOpen(true)}
        />

        {/* View Content (with padding for mobile bottom bar) */}
        <main className="flex-1 pb-24 lg:pb-8 w-full max-w-full overflow-x-hidden min-w-0">
          {/* 1. DIRECCIÓN GENERAL */}
          {(activeModuleId === 'general_kpi' || activeModuleId === 'general_rentabilidad') && (
            <GeneralDashboard
              onNavigateToModule={(mod) => {
                if (mod === 'ventas') setActiveModuleId('general_ventas');
                else if (mod === 'servicios') setActiveModuleId('general_servicios');
                else if (mod === 'administracion') setActiveModuleId('general_finanzas');
              }}
            />
          )}

          {activeModuleId === 'general_ventas' && (
            <SalesDashboard
              onStartNewProspect={() => setActiveModuleId('p02')}
              onOpenProspect={() => setActiveModuleId('p02')}
              onOpenQuote={() => setActiveModuleId('p03')}
              onOpenContract={() => setActiveModuleId('p04')}
            />
          )}

          {activeModuleId === 'general_servicios' && (
            <ServicesModule
              orders={services}
              chemicals={chemicals}
              onCompleteService={handleCompleteService}
            />
          )}

          {activeModuleId === 'general_finanzas' && (
            <AdminModule accounts={accounts} />
          )}

          {/* 2. DIRECCIÓN DE OPERACIONES */}
          {(activeModuleId === 'op_tablero' || activeModuleId === 'op_rutas') && (
            <ServicesModule
              orders={services}
              chemicals={chemicals}
              onCompleteService={handleCompleteService}
            />
          )}

          {activeModuleId === 'op_almacen' && (
            <InventoryModule chemicals={chemicals} />
          )}

          {activeModuleId === 'op_mip' && (
            <MipModule
              stations={mipStations}
              onUpdateStation={(updated) => {
                setMipStations((prev) =>
                  prev.map((s) => (s.id === updated.id ? updated : s))
                );
              }}
            />
          )}

          {activeModuleId === 'op_asistencia' && (
            <BiometricsModule attendanceRecords={attendance} />
          )}

          {/* 3. VENTAS COMERCIAL (4 Vistas P01-P04) */}
          {activeModuleId === 'p01' && (
            <div className="flex flex-col min-h-full">
              <SalesProcessNav
                currentStep="dashboard"
                onSelectStep={(step) => {
                  if (step === 'dashboard') setActiveModuleId('p01');
                  else if (step === 'prospecto') setActiveModuleId('p02');
                  else if (step === 'cotizacion') setActiveModuleId('p03');
                  else if (step === 'cierre') setActiveModuleId('p04');
                }}
              />
              <SalesDashboard
                onStartNewProspect={() => setActiveModuleId('p02')}
                onOpenProspect={() => setActiveModuleId('p02')}
                onOpenQuote={() => setActiveModuleId('p03')}
                onOpenContract={() => setActiveModuleId('p04')}
              />
            </div>
          )}

          {activeModuleId === 'p02' && (
            <div className="flex flex-col min-h-full">
              <SalesProcessNav
                currentStep="prospecto"
                onSelectStep={(step) => {
                  if (step === 'dashboard') setActiveModuleId('p01');
                  else if (step === 'prospecto') setActiveModuleId('p02');
                  else if (step === 'cotizacion') setActiveModuleId('p03');
                  else if (step === 'cierre') setActiveModuleId('p04');
                }}
              />
              <ProspectForm
                initialData={prospect}
                onSaveDraft={(saved) => {
                  setProspect(saved);
                  alert('Borrador de Prospecto / Levantamiento guardado con éxito.');
                }}
                onProceedToQuote={handleProceedToQuote}
                onCancel={() => setActiveModuleId('p01')}
              />
            </div>
          )}

          {activeModuleId === 'p03' && (
            <div className="flex flex-col min-h-full">
              <SalesProcessNav
                currentStep="cotizacion"
                onSelectStep={(step) => {
                  if (step === 'dashboard') setActiveModuleId('p01');
                  else if (step === 'prospecto') setActiveModuleId('p02');
                  else if (step === 'cotizacion') setActiveModuleId('p03');
                  else if (step === 'cierre') setActiveModuleId('p04');
                }}
              />
              <QuoteEngine
                prospect={prospect}
                initialQuote={quote}
                onSaveDraft={(savedQuote) => {
                  setQuote(savedQuote);
                  alert('Borrador de Cotización guardado.');
                }}
                onProceedToClose={handleProceedToClose}
                onBackToProspect={() => setActiveModuleId('p02')}
              />
            </div>
          )}

          {activeModuleId === 'p04' && (
            <div className="flex flex-col min-h-full">
              <SalesProcessNav
                currentStep="cierre"
                onSelectStep={(step) => {
                  if (step === 'dashboard') setActiveModuleId('p01');
                  else if (step === 'prospecto') setActiveModuleId('p02');
                  else if (step === 'cotizacion') setActiveModuleId('p03');
                  else if (step === 'cierre') setActiveModuleId('p04');
                }}
              />
              <ContractClose
                prospect={prospect}
                quote={quote}
                initialContract={contract}
                onSaveDraft={(savedContract) => {
                  setContract(savedContract);
                  alert('Borrador de Cierre / Contrato guardado.');
                }}
                onFinalizeContract={handleFinalizeContract}
                onCancel={() => setActiveModuleId('p03')}
              />
            </div>
          )}

          {/* 4. SERVICIOS DE ZONA (TÉCNICO) */}
          {(activeModuleId === 'srv_agenda' || activeModuleId === 'srv_ejecucion') && (
            <ServicesModule
              orders={services}
              chemicals={chemicals}
              onCompleteService={handleCompleteService}
            />
          )}

          {activeModuleId === 'srv_mip' && (
            <MipModule
              stations={mipStations}
              onUpdateStation={(updated) => {
                setMipStations((prev) =>
                  prev.map((s) => (s.id === updated.id ? updated : s))
                );
              }}
            />
          )}

          {activeModuleId === 'srv_quimicos' && (
            <InventoryModule chemicals={chemicals} />
          )}

          {activeModuleId === 'srv_asistencia' && (
            <BiometricsModule attendanceRecords={attendance} />
          )}

          {/* 5. ADMINISTRACIÓN Y FINANZAS */}
          {(activeModuleId === 'adm_cxc' || activeModuleId === 'adm_bancos' || activeModuleId === 'adm_cfdi') && (
            <AdminModule accounts={accounts} />
          )}

          {activeModuleId === 'adm_nomina' && (
            <BiometricsModule attendanceRecords={attendance} />
          )}

          {activeModuleId === 'adm_contratos' && (
            <SalesDashboard
              onStartNewProspect={() => setActiveModuleId('p02')}
              onOpenProspect={() => setActiveModuleId('p02')}
              onOpenQuote={() => setActiveModuleId('p03')}
              onOpenContract={() => setActiveModuleId('p04')}
            />
          )}

          {/* 6. RESPONSABLE SANITARIO */}
          {(activeModuleId === 'san_carpetas' || activeModuleId === 'san_constancias') && (
            <SanitaryModule
              completedOrders={services.filter((s) => s.status === 'completado')}
              chemicals={chemicals}
            />
          )}

          {activeModuleId === 'san_lotes' && (
            <InventoryModule chemicals={chemicals} />
          )}

          {activeModuleId === 'san_mip' && (
            <MipModule
              stations={mipStations}
              onUpdateStation={(updated) => {
                setMipStations((prev) =>
                  prev.map((s) => (s.id === updated.id ? updated : s))
                );
              }}
            />
          )}

          {/* 7. PORTAL CRM CLIENTES */}
          {(activeModuleId === 'crm_expediente' || activeModuleId === 'crm_certificados') && (
            <CrmClientPortal
              contract={contract}
              services={services}
              mipStations={mipStations}
            />
          )}

          {activeModuleId === 'crm_mapa' && (
            <MipModule
              stations={mipStations}
              onUpdateStation={(updated) => {
                setMipStations((prev) =>
                  prev.map((s) => (s.id === updated.id ? updated : s))
                );
              }}
            />
          )}
        </main>

        {/* Tablet and Mobile Bottom Navigation Bar */}
        <MobileBottomNav
          currentRole={currentRole}
          activeModuleId={activeModuleId}
          onSelectModule={(id) => setActiveModuleId(id)}
        />
      </div>

      {/* Role Switcher and Login Modal (Appears upon "Cerrar sesión") */}
      <RoleSwitchModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentRole={currentRole}
        onSelectRole={handleRoleChange}
      />
    </div>
  );
}
