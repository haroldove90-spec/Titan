import React, { useState } from 'react';
import { 
  Fingerprint, 
  ScanFace, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Calendar,
  Users
} from 'lucide-react';
import { AttendanceRecord } from '../../types/titan';

interface BiometricsModuleProps {
  attendanceRecords: AttendanceRecord[];
  onRecordCheckIn?: (record: AttendanceRecord) => void;
}

export const BiometricsModule: React.FC<BiometricsModuleProps> = ({ attendanceRecords }) => {
  const [records, setRecords] = useState<AttendanceRecord[]>(attendanceRecords);
  const [activeStep, setActiveStep] = useState<'idle' | 'huella' | 'facial' | 'incidencia'>('idle');
  const [fingerprintAttempts, setFingerprintAttempts] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Esperando escaneo de huella...');

  const simulateFingerprintScan = (success: boolean) => {
    if (success) {
      const newRec: AttendanceRecord = {
        id: `att-${Date.now()}`,
        employeeId: 'EMP-T01',
        employeeName: 'Carlos Mendoza',
        zone: 'CENTRO',
        date: '2026-09-29',
        checkIn: '08:00',
        scheduledTime: '08:00',
        biometricMethod: 'huella',
        attempts: fingerprintAttempts + 1,
        gpsValid: true,
        status: 'puntual',
      };
      setRecords([newRec, ...records]);
      setStatusMessage('¡Huella validada con éxito! Marcaje registrado puntual.');
      setActiveStep('idle');
      setFingerprintAttempts(0);
    } else {
      const nextAtt = fingerprintAttempts + 1;
      setFingerprintAttempts(nextAtt);
      if (nextAtt >= 3) {
        setActiveStep('facial');
        setStatusMessage('3 intentos de huella fallidos. Habilitando Reconocimiento Facial con prueba de vida.');
      } else {
        setStatusMessage(`Intento ${nextAtt} de 3 fallido. Vuelva a colocar el dedo.`);
      }
    }
  };

  const simulateFacialScan = () => {
    const newRec: AttendanceRecord = {
      id: `att-${Date.now()}`,
      employeeId: 'EMP-T01',
      employeeName: 'Carlos Mendoza',
      zone: 'CENTRO',
      date: '2026-09-29',
      checkIn: '08:05',
      scheduledTime: '08:00',
      biometricMethod: 'facial',
      attempts: 4,
      gpsValid: true,
      status: 'retardo',
      incidentReason: 'Validación por prueba de vida tras fallo de huella dactilar.',
    };
    setRecords([newRec, ...records]);
    setStatusMessage('¡Rostro validado exitosamente! Prueba de vida verificada.');
    setActiveStep('idle');
    setFingerprintAttempts(0);
  };

  return (
    <div className="p-3 sm:p-5 lg:p-8 max-w-7xl mx-auto space-y-4 sm:space-y-6 text-slate-200 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Top Banner */}
      <div className="bg-[#10131d] border border-[#2b2416] p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] mb-1">
            <span>Control de Personal & Nómina</span>
            <span className="text-slate-600">·</span>
            <span>Sección 11 & 12 TITAN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-brand font-black text-white">
            ASISTENCIA BIOMÉTRICA POR ZONA Y PRENÓMINA
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Flujo de respaldo estricto: Huella (3 intentos) → Facial con prueba de vida → Incidencia manual autorizada. Alimenta automáticamente la nómina sin recaptura.
          </p>
        </div>

        {/* Live Terminal Simulation Button */}
        <button
          onClick={() => {
            setActiveStep('huella');
            setFingerprintAttempts(0);
            setStatusMessage('Coloque su huella en el lector biométrico...');
          }}
          className="flex items-center gap-2 bg-[#d4a34b] hover:bg-[#f59e0b] text-black font-extrabold px-4 py-2.5 rounded-xl text-xs shadow-md transition-colors"
        >
          <Fingerprint className="w-4 h-4 stroke-[2.5]" />
          <span>Simular Marcaje de Técnico</span>
        </button>
      </div>

      {/* Simulator Modal / Banner if active */}
      {activeStep !== 'idle' && (
        <div className="bg-[#121622] border-2 border-[#d4a34b] rounded-xl p-5 shadow-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#f59e0b]" />
              Terminal Móvil Zona Centro · Validación de Asistencia
            </span>
            <span className="text-xs text-[#d4a34b] font-mono-tabular">Técnico: Carlos Mendoza</span>
          </div>

          <div className="bg-[#0b0d13] p-4 rounded-lg border border-[#292215] flex flex-col items-center justify-center space-y-3 text-center">
            {activeStep === 'huella' ? (
              <>
                <Fingerprint className="w-12 h-12 text-[#f59e0b] animate-pulse" />
                <div className="text-sm font-bold text-white">{statusMessage}</div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => simulateFingerprintScan(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded font-bold"
                  >
                    Simular Huella Válida
                  </button>
                  <button
                    onClick={() => simulateFingerprintScan(false)}
                    className="bg-red-700 hover:bg-red-600 text-white px-3 py-1.5 rounded font-bold"
                  >
                    Simular Intento Fallido ({fingerprintAttempts}/3)
                  </button>
                </div>
              </>
            ) : (
              <>
                <ScanFace className="w-12 h-12 text-[#38bdf8] animate-bounce" />
                <div className="text-sm font-bold text-white">{statusMessage}</div>
                <button
                  onClick={simulateFacialScan}
                  className="bg-[#38bdf8] hover:bg-[#60a5fa] text-black px-4 py-1.5 rounded font-extrabold text-xs"
                >
                  Capturar Rostro con Prueba de Vida
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Table of Records */}
      <div className="bg-[#10131d] border border-[#282115] rounded-xl overflow-hidden shadow-xl w-full max-w-full">
        <div className="p-4 border-b border-[#211a11] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-[#d4a34b]" />
            Bitácora de Asistencia y Consolidación de Prenómina
          </h3>
          <span className="text-xs text-[#10b981] font-semibold">
            GPS Validado en Base Operativa
          </span>
        </div>

        <div className="w-full max-w-full overflow-x-auto block">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="bg-[#0b0e14] text-slate-400 border-b border-[#211a11] text-[10px] uppercase">
              <tr>
                <th className="py-3 px-4">Técnico / Colaborador</th>
                <th className="py-3 px-4">Zona</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Horario Programado</th>
                <th className="py-3 px-4">Entrada Real</th>
                <th className="py-3 px-4">Método Biométrico</th>
                <th className="py-3 px-4">Estatus</th>
                <th className="py-3 px-4">Observaciones / Incidencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e170f]">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-[#161a25] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{r.employeeName}</div>
                    <div className="text-[10px] text-slate-500 font-mono-tabular">{r.employeeId}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono-tabular font-bold text-[#f59e0b]">{r.zone}</span>
                  </td>
                  <td className="py-3 px-4 font-mono-tabular text-slate-300">{r.date}</td>
                  <td className="py-3 px-4 font-mono-tabular text-slate-400">{r.scheduledTime}</td>
                  <td className="py-3 px-4 font-mono-tabular font-bold text-white">{r.checkIn}</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 font-semibold text-slate-200 capitalize">
                      {r.biometricMethod === 'huella' ? (
                        <Fingerprint className="w-3.5 h-3.5 text-[#d4a34b]" />
                      ) : (
                        <ScanFace className="w-3.5 h-3.5 text-[#38bdf8]" />
                      )}
                      {r.biometricMethod} ({r.attempts} intento{r.attempts > 1 ? 's' : ''})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'puntual'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : 'bg-amber-950 text-amber-300 border border-amber-700'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px]">
                    {r.incidentReason || 'Sin incidencias · Marcaje nominal'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
