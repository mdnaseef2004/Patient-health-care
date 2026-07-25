import { Users, CalendarCheck, Activity, TrendingUp } from 'lucide-react';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production');
    await jose.jwtVerify(token, secret);
  } catch (error) {
    redirect('/admin/login');
  }

  // Fetch real counts from the database
  const totalAppointments = await prisma.appointment.count();
  const totalPatients = await prisma.patient.count();
  const activeDoctors = await prisma.doctor.count();
  
  // Recent Appointments
  const recentAppointments = await prisma.appointment.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      patient: true,
      doctor: true,
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Appointments" 
          value={totalAppointments.toString()} 
          trend="Real-time data" 
          icon={<CalendarCheck className="w-5 h-5" />} 
          trendUp={true}
        />
        <DashboardCard 
          title="Total Patients" 
          value={totalPatients.toString()} 
          trend="Real-time data" 
          icon={<Users className="w-5 h-5" />} 
          trendUp={true}
        />
        <DashboardCard 
          title="Active Doctors" 
          value={activeDoctors.toString()} 
          trend="Real-time data" 
          icon={<Activity className="w-5 h-5" />} 
          trendUp={true}
        />
        <DashboardCard 
          title="Monthly Revenue" 
          value="Calculated soon" 
          trend="Pending billing logic" 
          icon={<TrendingUp className="w-5 h-5" />} 
          trendUp={true}
        />
      </div>

      {/* Recent Activity & Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl p-6 apple-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-semibold text-lg">Appointment Trends</h2>
            <select className="text-sm border border-[var(--color-border)] rounded-lg px-2 py-1 bg-zinc-50 dark:bg-zinc-800">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {/* Mock Bar Chart */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="w-full bg-blue-100 dark:bg-blue-900/30 rounded-t-md relative group">
                <div 
                  className="absolute bottom-0 w-full bg-[var(--color-primary)] rounded-t-md transition-all duration-500 group-hover:opacity-80"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-[var(--color-muted-foreground)] px-4">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl p-6 apple-shadow flex flex-col">
          <h2 className="font-semibold text-lg mb-6">Recent Appointments</h2>
          <div className="space-y-4 flex-1">
            {recentAppointments.length === 0 ? (
              <p className="text-sm text-[var(--color-muted-foreground)]">No appointments yet.</p>
            ) : (
              recentAppointments.map((apt) => (
                <RecentAppointment 
                  key={apt.id}
                  name={apt.patient?.name || 'Unknown'} 
                  doctor={apt.doctor?.name || 'Unassigned'} 
                  time={`${apt.date ? apt.date.toLocaleDateString() : ''} ${apt.time || ''}`} 
                  status={apt.status.charAt(0) + apt.status.slice(1).toLowerCase()} 
                />
              ))
            )}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-[var(--color-primary)] font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, trend, icon, trendUp }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl p-6 apple-shadow hover:scale-[1.02] transition-transform">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-[var(--color-primary)] rounded-lg">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-[var(--color-muted-foreground)] font-medium text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold mb-2">{value}</p>
        <p className={`text-xs font-medium ${trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}

function RecentAppointment({ name, doctor, time, status }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-[var(--color-border)] cursor-pointer">
      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-[var(--color-muted-foreground)]">{doctor} • {time}</p>
      </div>
      <div className={`text-xs px-2.5 py-1 rounded-full font-medium ${
        status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
        status === 'Completed' ? 'bg-blue-100 text-blue-700' :
        status === 'Rejected' ? 'bg-red-100 text-red-700' :
        'bg-green-100 text-green-700'
      }`}>
        {status}
      </div>
    </div>
  );
}
