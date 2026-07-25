'use client';

import { useState } from 'react';
import { Calendar, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AppointmentTable({ appointments, doctors }: { appointments: any[], doctors: any[] }) {
  const router = useRouter();
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  
  // Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    if (newStatus === 'ACCEPTED') {
      // Open modal to assign doctor, date, and time
      setSelectedAppointmentId(appointmentId);
      setIsModalOpen(true);
      return;
    }

    // Direct status update for PENDING, REJECTED, COMPLETED
    try {
      const res = await fetch(`/api/admin/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcceptAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppointmentId || !selectedDoctorId || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/appointments/${selectedAppointmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'ACCEPTED',
          doctorId: selectedDoctorId,
          date: new Date(selectedDate).toISOString(),
          time: selectedTime,
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        setSelectedAppointmentId(null);
        setSelectedDoctorId('');
        setSelectedDate('');
        setSelectedTime('');
        router.refresh();
      } else {
        alert('Failed to assign appointment');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
                        ${apt.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : ''}
                        ${apt.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' : ''}
                        ${apt.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${apt.status === 'REJECTED' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {apt.status === 'ACCEPTED' ? 'APPROVED' : apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={apt.status}
                        onChange={(e) => handleStatusChange(apt.id, e.target.value)}
                        className="bg-transparent border border-[var(--color-border)] rounded-md text-xs py-1 px-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="ACCEPTED">Approve & Assign</option>
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

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-md p-6 apple-shadow animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Assign Appointment</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAcceptAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Doctor</label>
                <select 
                  required
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                >
                  <option value="" disabled>Choose a Doctor...</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name} ({doc.speciality})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input 
                  type="time"
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-transparent"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 mt-4 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : 'Confirm Assignment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
