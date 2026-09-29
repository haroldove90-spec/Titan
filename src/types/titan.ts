export type UserRole = 
  | 'direccion_general'
  | 'direccion_operaciones'
  | 'ventas'
  | 'administracion'
  | 'servicios'
  | 'responsable_sanitario'
  | 'crm_clientes';

export type OperatingZone = 'NORTE' | 'CENTRO' | 'SUR';

export type PropertySize = 'Pequeño' | 'Mediano' | 'Grande' | 'Especial';

export type InfestationLevel = 'Bajo' | 'Medio' | 'Alto';

export type ServiceComplexity = 'Estándar' | 'Media' | 'Alta' | 'Especial';

export type ContractDuration = 'Bimestral' | 'Trimestral' | 'Semestral' | 'Anual';

export type PestPresence = 'No determinado' | 'Baja' | 'Media' | 'Alta';

export interface ReportedPest {
  id: string;
  pest: string;
  presenceLevel: PestPresence;
  affectedArea: string;
  observations: string;
}

export interface Prospect {
  id: string; // P-0001
  prospectType: 'Empresa' | 'Persona física' | 'Otro';
  businessName: string;
  contactName: string;
  contactRole: string;
  phone: string;
  email: string;
  // Ubicación
  street: string;
  exteriorNo: string;
  interiorNo?: string;
  colony: string;
  city: string;
  state: string;
  zipCode: string;
  zone: OperatingZone;
  // Características
  serviceType: string;
  propertySize: PropertySize;
  floorsCount: number;
  desiredFrequency: string;
  industry: string;
  employeesCount: number;
  contactReason: string;
  needDetails: string;
  additionalNotes?: string;
  reportedPests: ReportedPest[];
  photos: {
    fachada?: string;
    cocina?: string;
    comedor?: string;
    almacen?: string;
  };
  // Agenda
  visitDate: string;
  visitTime: string;
  assignedSalesExec: string;
  // Estados
  status: 'prospecto' | 'cotizado' | 'cerrado' | 'perdido';
  createdAt: string;
}

export interface SpecialServiceItem {
  id: string;
  name: string;
  frequency: string;
  months: number;
  unitPrice: number;
  total: number;
}

export interface QuoteFollowUp {
  id: string;
  date: string;
  contactType: 'WhatsApp' | 'Llamada' | 'Reunión' | 'Correo';
  result: string;
  notes: string;
  nextAction: string;
  nextDate: string;
  executive: string;
}

export interface Quote {
  id: string;
  prospectId: string;
  floorsCount: number;
  propertySize: PropertySize;
  infestationLevel: InfestationLevel;
  complexity: ServiceComplexity;
  serviceType: string;
  frequency: string;
  zone: OperatingZone;
  // Motor de Precios Oculto v9
  suggestedPriceTitan: number;
  minAuthorizedPrice: number;
  chosenPriceType: 'sugerido' | 'minimo';
  agreedMonthlyPrice: number;
  // Desglose
  specialServices: SpecialServiceItem[];
  contractType: ContractDuration;
  contractMonths: number;
  subtotal: number;
  tax: number; // 16%
  totalContractValue: number;
  // Condiciones
  validityDate: string;
  paymentMethod: string;
  clientComments: string;
  commercialNotes: string;
  followUps: QuoteFollowUp[];
  status: 'borrador' | 'enviada' | 'aceptada' | 'rechazada';
  createdAt: string;
}

export interface ContractData {
  id: string;
  contractFolio: string; // TIT-2026-00125
  clientFolio: string; // Cliente No. 1234
  quoteId: string;
  prospectId: string;
  // Datos Fiscales SAT
  rfc: string;
  fiscalBusinessName: string;
  fiscalRegime: string;
  cfdiUsage: string;
  fiscalZip: string;
  fiscalAddress: string;
  isSatValidated?: boolean;
  // Datos Bancarios
  bank: string;
  clabe: string;
  accountHolder: string;
  paymentReference: string;
  isAccountValidated?: boolean;
  // Condiciones Contrato
  contractType: ContractDuration;
  startDate: string;
  endDate: string;
  paymentMethod: string;
  paymentCondition: string;
  cutoffPaymentDay: number;
  internalNotes?: string;
  // Firmas
  clientSignature?: string; // Data URL or SVG string
  clientSignerName: string;
  salesRepSignature?: string;
  salesRepName: string;
  signedDate: string;
  status: 'activo' | 'finalizado' | 'cancelado';
}

export interface ServiceExecution {
  id: string;
  contractFolio: string;
  clientFolio: string;
  clientBusinessName: string;
  address: string;
  zone: OperatingZone;
  serviceType: string;
  frequency: string;
  assignedTechnician: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'programado' | 'en_ruta' | 'en_servicio' | 'completado' | 'reprogramado';
  // Check-in & GPS
  checkInTime?: string;
  checkOutTime?: string;
  effectiveMinutes?: number;
  transitMinutes?: number;
  // Inspección & Escala de Actividad (0 a 5)
  inspectedArea?: string;
  observedPests?: string[];
  activityLevel?: 0 | 1 | 2 | 3 | 4 | 5; // 0=Sin actividad, 5=Crítica
  criticalPoints?: string;
  findingsObservation?: string;
  // Productos aplicados (conecta a inventario químico)
  appliedChemicals?: {
    productId: string;
    productName: string;
    batchNumber: string;
    doseUsed: string; // e.g. 50 ml
    applicationMethod: string; // Aspersión, Termonebulización, Gel
  }[];
  // Firmas y NOM-256
  technicianSignature?: string;
  clientOnSiteSignature?: string;
  clientSignerName?: string;
  certificateFolio?: string;
  completedAt?: string;
}

export interface ChemicalItem {
  id: string;
  tradeName: string;
  activeIngredient: string;
  manufacturer: string;
  cofeprisReg: string;
  presentation: string;
  batchNumber: string;
  expirationDate: string;
  currentStock: number;
  stockUnit: string;
  unitCost: number;
  minThreshold: number;
}

export interface MipStation {
  id: string;
  code: string; // E-001, L-001, T-001
  type: 'Cebadera' | 'Lámpara UV' | 'Trampa de Goma' | 'Punto de Monitoreo';
  zoneArea: string;
  status: 'óptima' | 'actividad_detectada' | 'requiere_cambio';
  lastConsumptionGrams: number;
  lastCheckedDate: string;
  inspectedBy: string;
  xPercent: number;
  yPercent: number;
}

export interface AccountReceivable {
  id: string;
  contractFolio: string;
  clientFolio: string;
  clientName: string;
  invoiceFolio: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  paymentReference: string;
  status: 'por_vencer' | 'vence_hoy' | 'vencido' | 'pagado';
  cfdiStatus: 'emitido' | 'pendiente' | 'complemento_requerido';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  zone: OperatingZone;
  date: string;
  checkIn: string;
  checkOut?: string;
  scheduledTime: string;
  biometricMethod: 'huella' | 'facial' | 'incidencia_manual';
  attempts: number;
  gpsValid: boolean;
  status: 'puntual' | 'retardo' | 'falta' | 'permiso';
  incidentReason?: string;
}
