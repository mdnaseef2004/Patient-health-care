export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';
import { Search, Plus, UserPlus } from 'lucide-react';

export default async function DoctorsPage() {
  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      department: true,
      appointments: {
        where: { status: 'PENDING' },
        select: { id: true }
      }
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Doctors Directory</h2>
          <p className="text-[var(--color-muted-foreground)]">Manage hospital doctors and their schedules.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-muted-foreground)]" />
            <input 
              type="text"
              placeholder="Search doctors..." 
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm apple-shadow transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors apple-shadow shrink-0">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Doctor</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.length === 0 ? (
          <div className="col-span-full py-12 text-center text-[var(--color-muted-foreground)] bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl">
            No doctors found. Add a doctor to get started.
          </div>
        ) : (
          doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl p-6 apple-shadow hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl shrink-0 border-2 border-white dark:border-zinc-800 shadow-sm">
                    {doctor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Dr. {doctor.name}</h3>
                    <p className="text-[var(--color-primary)] text-sm font-medium mt-1">{doctor.speciality}</p>
                    <p className="text-xs text-[var(--color-muted-foreground)] mt-1 line-clamp-1">{doctor.qualification}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[var(--color-border)] grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-[var(--color-muted-foreground)] mb-1">Experience</div>
                  <div className="font-medium text-sm">{doctor.experience} Years</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-muted-foreground)] mb-1">Status</div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                    ${doctor.availability === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                    ${doctor.availability === 'BUSY' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                    ${doctor.availability === 'ON_LEAVE' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                  `}>
                    {doctor.availability.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-muted-foreground)] mb-1">Department</div>
                  <div className="font-medium text-sm">{doctor.department?.name || 'General'}</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-muted-foreground)] mb-1">Pending Appts</div>
                  <div className="font-medium text-sm text-[var(--color-primary)]">{doctor.appointments.length}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
