import Link from 'next/link';
import { ArrowRight, Activity, CalendarCheck, Shield, Clock, Users, Building } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-zinc-950 -z-10" />
        
        {/* Animated background shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm mb-4">
              <Activity className="w-4 h-4" />
              <span>Modern Patient-Centered Care</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-foreground)] leading-tight">
              Healthcare that revolves around <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">You.</span>
            </h1>
            
            <p className="text-xl text-[var(--color-muted-foreground)] leading-relaxed max-w-2xl mx-auto">
              Experience a unified digital healthcare journey with seamless communication, better coordination, and full transparency.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/book"
                className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-medium text-lg hover:bg-[var(--color-primary-hover)] transition-all apple-shadow flex items-center justify-center gap-2 group"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#departments"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 text-[var(--color-foreground)] border border-[var(--color-border)] rounded-full font-medium text-lg hover:bg-[var(--color-secondary)] transition-all flex items-center justify-center"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose MediCare?</h2>
          <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            We combine state-of-the-art technology with compassionate care to provide an exceptional healthcare experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<CalendarCheck className="w-8 h-8 text-blue-500" />}
            title="Easy Booking"
            description="Book, reschedule, or cancel appointments online 24/7 with our intuitive platform."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-indigo-500" />}
            title="Secure Records"
            description="Your medical history and data are encrypted and accessible only to authorized personnel."
          />
          <FeatureCard 
            icon={<Clock className="w-8 h-8 text-purple-500" />}
            title="No Wait Times"
            description="Real-time queue tracking and precise scheduling to respect your valuable time."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 dark:bg-blue-950/20 py-20 border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[var(--color-border)]">
            <StatCard icon={<Users />} count="50k+" label="Happy Patients" />
            <StatCard icon={<Building />} count="15+" label="Departments" />
            <StatCard icon={<Stethoscope />} count="100+" label="Expert Doctors" />
            <StatCard icon={<Activity />} count="24/7" label="Emergency Care" />
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Medical Departments</h2>
            <p className="text-[var(--color-muted-foreground)] max-w-2xl">
              Comprehensive care across all major medical specialties.
            </p>
          </div>
          <Link href="/departments" className="hidden sm:flex text-blue-600 hover:text-blue-700 font-medium items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <DepartmentCard title="Cardiology" count={12} />
          <DepartmentCard title="Neurology" count={8} />
          <DepartmentCard title="Pediatrics" count={15} />
          <DepartmentCard title="Orthopedics" count={10} />
          <DepartmentCard title="Dermatology" count={6} />
          <DepartmentCard title="Psychiatry" count={9} />
          <DepartmentCard title="Oncology" count={7} />
          <DepartmentCard title="General Surgery" count={14} />
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Expert Specialists</h2>
          <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            Meet our team of highly qualified and experienced medical professionals dedicated to your well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <DoctorCard 
            name="Dr. Sarah Jenkins"
            speciality="Cardiologist"
            qualification="MD, FACC"
            experience={15}
            availability="Available Today"
            imageUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400"
          />
          <DoctorCard 
            name="Dr. Michael Chen"
            speciality="Neurologist"
            qualification="MD, PhD"
            experience={12}
            availability="Next Available: Tomorrow"
            imageUrl="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400"
          />
          <DoctorCard 
            name="Dr. Emily Rodriguez"
            speciality="Pediatrician"
            qualification="MD, FAAP"
            experience={8}
            availability="Available Today"
            imageUrl="https://images.unsplash.com/photo-1594824432258-006fc4b22340?auto=format&fit=crop&q=80&w=400&h=400"
          />
        </div>
        
        <div className="mt-12 text-center sm:hidden">
            <Link href="/doctors" className="inline-flex text-blue-600 hover:text-blue-700 font-medium items-center gap-1 group">
              View All Doctors <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl glass apple-shadow hover:scale-[1.02] transition-transform duration-300">
      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center mb-6 shadow-sm border border-[var(--color-border)]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[var(--color-muted-foreground)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatCard({ icon, count, label }: { icon: React.ReactNode, count: string, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4">
      <div className="text-blue-600 dark:text-blue-400 mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2">{count}</div>
      <div className="text-sm font-medium text-[var(--color-muted-foreground)] uppercase tracking-wider">{label}</div>
    </div>
  );
}

function DepartmentCard({ title, count }: { title: string, count: number }) {
  return (
    <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-white dark:bg-zinc-900 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer group">
      <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-[var(--color-muted-foreground)] text-sm">{count} Doctors</p>
    </div>
  );
}

function DoctorCard({ name, speciality, qualification, experience, availability, imageUrl }: any) {
  return (
    <div className="rounded-3xl glass apple-shadow overflow-hidden flex flex-col group">
      <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full text-xs font-medium text-blue-600 dark:text-blue-400">
          {experience} Yrs Exp
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold">{name}</h3>
              <p className="text-[var(--color-primary)] font-medium text-sm">{speciality}</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-muted-foreground)]">{qualification}</p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-sm text-[var(--color-muted-foreground)] mb-6">
            <Clock className="w-4 h-4 text-green-500" />
            <span className={availability.includes('Today') ? 'text-green-600 dark:text-green-400 font-medium' : ''}>{availability}</span>
          </div>
          
          <Link 
            href="/book" 
            className="w-full py-3 bg-[var(--color-secondary)] hover:bg-blue-600 hover:text-white text-[var(--color-foreground)] rounded-xl font-medium flex items-center justify-center transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

// Dummy Stethoscope component for local file
function Stethoscope(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>;
}
