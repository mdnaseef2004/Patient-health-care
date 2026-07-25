import prisma from '@/lib/prisma';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default async function PatientsPage() {
  const patients = await prisma.patient.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      appointments: {
        select: { id: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Patients Directory</h2>
          <p className="text-[var(--color-muted-foreground)]">Manage and view all registered patients.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
            <input 
              type="text"
              placeholder="Search patients..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm apple-shadow transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors apple-shadow shrink-0">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Patient</span>
          </button>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl apple-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[var(--color-muted-foreground)] font-medium border-b border-[var(--color-border)]">
              <tr>
                <th className="px-6 py-4">Patient ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Age / Gender</th>
                <th className="px-6 py-4">Appointments</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--color-muted-foreground)]">
                    No patients found. Add a patient to get started.
                  </td>
                </tr>
              ) : (
                patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-medium text-[var(--color-primary)]">
                      {patient.patientId}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 text-[var(--color-muted-foreground)]">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-4 text-[var(--color-muted-foreground)] capitalize">
                      {patient.age} / {patient.gender.toLowerCase()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-0.5 rounded-full font-medium text-xs">
                        {patient.appointments.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
