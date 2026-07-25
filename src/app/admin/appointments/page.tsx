export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import { Search, Filter, Calendar } from 'lucide-react';

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      patient: true,
      doctor: true,
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Appointments</h2>
          <p className="text-[var(--color-muted-foreground)]">Manage patient bookings and schedules.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
            <input 
              type="text"
              placeholder="Search appointments..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm apple-shadow transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-[var(--color-border)] px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors apple-shadow shrink-0">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl apple-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[var(--color-muted-foreground)] font-medium border-b border-[var(--color-border)]">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Cause</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[var(--color-muted-foreground)]">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium">{apt.patient.name}</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">{apt.patient.patientId}</div>
                    </td>
                    <td className="px-6 py-4">
                      {apt.doctor ? (
                        <div className="font-medium">{apt.doctor.name}</div>
                      ) : (
                        <span className="text-[var(--color-muted-foreground)] italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--color-muted-foreground)]" />
                        <span>{apt.date ? new Date(apt.date).toLocaleDateString() : 'Not Set'}</span>
                      </div>
                      {apt.time && (
                        <div className="text-xs text-[var(--color-muted-foreground)] mt-1">{apt.time}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate">
                      {apt.cause}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full font-medium text-xs
                        ${apt.status === 'PENDING' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                        ${apt.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                        ${apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                        ${apt.status === 'REJECTED' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                      `}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select className="bg-transparent border border-[var(--color-border)] rounded-md text-xs py-1 px-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]">
                        <option value="PENDING">Pending</option>
                        <option value="ACCEPTED">Accept</option>
                        <option value="COMPLETED">Complete</option>
                        <option value="REJECTED">Reject</option>
                      </select>
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
