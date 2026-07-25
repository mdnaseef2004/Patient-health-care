'use client';

import { useState } from 'react';
import { Search, Activity, Clock, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AppointmentStatus() {
  const [patientId, setPatientId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [statusResult, setStatusResult] = useState<{
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED',
    date?: string,
    doctor?: string,
  } | null>(null);
  
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId.trim()) return;
    
    setIsSearching(true);
    setError('');
    setStatusResult(null);

    // Mock search API
    setTimeout(() => {
      setIsSearching(false);
      
      if (patientId.length < 5) {
        setError('Invalid Patient ID. Please check and try again.');
        return;
      }
      
      // Return a random mock status
      const statuses: ('PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED')[] = ['PENDING', 'ACCEPTED', 'COMPLETED'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setStatusResult({
        status: randomStatus,
        date: randomStatus !== 'PENDING' ? 'Oct 24, 2024 at 10:30 AM' : undefined,
        doctor: 'Dr. Sarah Jenkins',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center p-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Check Appointment Status</h1>
          <p className="text-[var(--color-muted-foreground)]">
            Enter your Patient ID to see real-time updates on your appointment.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
            <input 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all apple-shadow" 
              placeholder="e.g. JOHN-1234"
            />
          </div>
          <button 
            type="submit"
            disabled={isSearching || !patientId}
            className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-70 apple-shadow"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-center font-medium mb-8">
            {error}
          </div>
        )}

        {statusResult && (
          <div className="glass p-8 rounded-3xl apple-shadow animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--color-border)]">
              <div>
                <p className="text-sm font-medium text-[var(--color-muted-foreground)] mb-1">PATIENT ID</p>
                <p className="font-mono font-bold text-lg">{patientId.toUpperCase()}</p>
              </div>
              
              <div className="flex flex-col items-end">
                <p className="text-sm font-medium text-[var(--color-muted-foreground)] mb-1">STATUS</p>
                <div className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${
                  statusResult.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                  statusResult.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                  statusResult.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {statusResult.status === 'PENDING' && <Clock className="w-4 h-4" />}
                  {statusResult.status === 'ACCEPTED' && <CheckCircle2 className="w-4 h-4" />}
                  {statusResult.status === 'COMPLETED' && <CheckCircle2 className="w-4 h-4" />}
                  {statusResult.status === 'REJECTED' && <XCircle className="w-4 h-4" />}
                  {statusResult.status}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Assigned Doctor</p>
                <p className="font-medium text-lg">{statusResult.doctor}</p>
              </div>
              
              {statusResult.date && (
                <div>
                  <p className="text-sm text-[var(--color-muted-foreground)] mb-1">Scheduled Time</p>
                  <p className="font-medium text-lg">{statusResult.date}</p>
                </div>
              )}
              
              {statusResult.status === 'PENDING' && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Your request is currently being reviewed by our staff. You will be assigned a time shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
