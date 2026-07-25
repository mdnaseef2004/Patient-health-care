import Link from 'next/link';
import { Stethoscope } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[var(--color-primary)] rounded-lg text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <Link href="/" className="font-semibold text-lg tracking-tight">
              MediCare Platform
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Home</Link>
            <Link href="#departments" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Departments</Link>
            <Link href="#doctors" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Doctors</Link>
            <Link href="/book" className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Book Appointment</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="text-sm font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors">
              Admin Login
            </Link>
            <Link 
              href="/book" 
              className="px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-full hover:bg-[var(--color-primary-hover)] transition-all apple-shadow"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
