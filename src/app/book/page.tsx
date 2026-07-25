'use client';

import { useState } from 'react';
import { Calendar, User, Phone, FileText, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function BookAppointment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        cause: formData.get('cause')
      };

      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Failed to create appointment');

      const result = await res.json();
      setSuccessData({ id: result.id });
    } catch (error) {
      console.error(error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center p-4">
        <div className="glass max-w-md w-full p-8 rounded-3xl apple-shadow text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Appointment Requested!</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6">
            Your appointment request has been submitted successfully. Our team will contact you shortly to confirm the exact time.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-blue-900/50">
            <p className="text-sm font-medium text-[var(--color-muted-foreground)] mb-2">YOUR PATIENT ID</p>
            <p className="text-3xl font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400">
              {successData.id}
            </p>
            <p className="text-xs text-[var(--color-muted-foreground)] mt-2">
              Please save this ID to check your appointment status.
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/status"
              className="w-full py-3 bg-[var(--color-primary)] text-white rounded-xl font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              Check Status
            </Link>
            <Link 
              href="/"
              className="w-full py-3 bg-[var(--color-secondary)] text-[var(--color-foreground)] rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">Book an Appointment</h1>
          <p className="text-[var(--color-muted-foreground)]">
            Fill out the form below and we'll get back to you to confirm your schedule.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl apple-shadow space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Patient Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
              <input 
                name="name"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-zinc-900/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted-foreground)]" />
                <input 
                  name="phone"
                  required
                  type="tel"
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-zinc-900/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all" 
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <input 
                name="age"
                required
                type="number"
                min="0"
                max="120"
                className="w-full px-4 py-3 bg-white/50 dark:bg-zinc-900/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all" 
                placeholder="25"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gender</label>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="relative flex cursor-pointer">
                  <input type="radio" name="gender" value={g.toUpperCase()} className="peer sr-only" required defaultChecked={g === 'Male'} />
                  <div className="w-full text-center px-4 py-3 border border-[var(--color-border)] rounded-xl peer-checked:border-[var(--color-primary)] peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 peer-checked:text-[var(--color-primary)] font-medium transition-all">
                    {g}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cause / Symptoms</label>
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-5 h-5 text-[var(--color-muted-foreground)]" />
              <textarea 
                name="cause"
                required
                rows={4}
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-zinc-900/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all resize-none" 
                placeholder="Please describe your symptoms briefly..."
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-[var(--color-primary)] text-white rounded-xl font-medium text-lg hover:bg-[var(--color-primary-hover)] transition-all apple-shadow disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Processing...</span>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                Submit Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
