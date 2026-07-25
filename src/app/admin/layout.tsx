'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, CalendarCheck, Settings, LogOut, Heart } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };
  
  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-[var(--color-border)] hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[var(--color-primary)] rounded-md text-white">
              <Heart className="w-4 h-4" />
            </div>
            <span className="font-semibold tracking-tight">MediCare Admin</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-1">
          <NavItem href="/admin/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === '/admin/dashboard'} />
          <NavItem href="/admin/appointments" icon={<CalendarCheck size={20} />} label="Appointments" active={pathname.includes('/admin/appointments')} />
          <NavItem href="/admin/patients" icon={<Users size={20} />} label="Patients" active={pathname.includes('/admin/patients')} />
          <NavItem href="/admin/doctors" icon={<Users size={20} />} label="Doctors" active={pathname.includes('/admin/doctors')} />
        </div>
        
        <div className="p-4 border-t border-[var(--color-border)]">
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" active={pathname === '/admin/settings'} />
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-xl text-[var(--color-destructive)] hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-[var(--color-border)] flex items-center justify-between px-6 z-10">
          <h1 className="font-semibold text-lg">
            {pathname === '/admin/dashboard' ? 'Dashboard Overview' : 
             pathname.includes('/appointments') ? 'Manage Appointments' :
             pathname.includes('/patients') ? 'Patient Directory' :
             pathname.includes('/doctors') ? 'Doctor Management' : 'Admin Portal'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Super Admin
            </div>
          </div>
        </header>
        
        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium ${
        active 
          ? 'bg-[var(--color-primary)] text-white shadow-md shadow-blue-500/20' 
          : 'text-[var(--color-muted-foreground)] hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-[var(--color-foreground)]'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
