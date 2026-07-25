import Link from 'next/link';
import { Heart, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-[var(--color-primary)] rounded-lg text-white">
                <Heart className="w-5 h-5" />
              </div>
              <span className="font-semibold text-xl tracking-tight">MediCare</span>
            </div>
            <p className="text-[var(--color-muted-foreground)] text-sm leading-relaxed">
              Providing world-class healthcare services with modern facilities and expert professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] text-sm transition-colors">About Us</Link></li>
              <li><Link href="/#departments" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] text-sm transition-colors">Departments</Link></li>
              <li><Link href="/#doctors" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] text-sm transition-colors">Our Doctors</Link></li>
              <li><Link href="/book" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] text-sm transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-[var(--color-muted-foreground)] text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>123 Medical Drive, Health City, HC 12345</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--color-muted-foreground)] text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-[var(--color-muted-foreground)] text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <span>contact@medicare.com</span>
              </li>
            </ul>
          </div>

          {/* Availability */}
          <div>
            <h3 className="font-medium mb-4">Working Hours</h3>
            <ul className="space-y-3 text-sm text-[var(--color-muted-foreground)]">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-[var(--color-primary)] font-medium">
                <span>Emergency Services</span>
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            © {new Date().getFullYear()} MediCare Platform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
