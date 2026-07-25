export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import { Search, Filter } from 'lucide-react';
import AppointmentTable from './AppointmentTable';

export default async function AppointmentsPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      patient: true,
      doctor: true,
    }
  });

  const doctors = await prisma.doctor.findMany({
    orderBy: { name: 'asc' }
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

      <AppointmentTable appointments={appointments} doctors={doctors} />
    </div>
  );
}
