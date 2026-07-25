import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import * as jose from 'jose';
import { redirect } from 'next/navigation';
import ProfileForm from './ProfileForm';
import AdminManagement from './AdminManagement';

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production');
    const { payload } = await jose.jwtVerify(token, secret);
    
    // Fetch current user profile
    const currentAdmin = await prisma.admin.findUnique({
      where: { id: payload.id as string },
      select: { id: true, email: true, name: true, role: true, photo: true }
    });

    if (!currentAdmin) {
      redirect('/admin/login');
    }

    // Fetch all admins if SUPER_ADMIN
    let allAdmins = null;
    if (currentAdmin.role === 'SUPER_ADMIN') {
      allAdmins = await prisma.admin.findMany({
        select: { id: true, name: true, email: true, role: true, photo: true, createdAt: true },
        orderBy: { createdAt: 'asc' }
      });
    }

    return (
      <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-[var(--color-muted-foreground)]">Manage your profile and system settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg">Profile Information</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
              Update your account details and profile picture.
            </p>
          </div>
          <div className="lg:col-span-2">
            <ProfileForm admin={currentAdmin} />
          </div>
        </div>

        {currentAdmin.role === 'SUPER_ADMIN' && allAdmins && (
          <>
            <div className="h-px bg-[var(--color-border)] my-8" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-lg">Admin Management</h3>
                <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
                  View and manage Super Admins and Sub Admins.
                </p>
              </div>
              <div className="lg:col-span-2">
                <AdminManagement admins={allAdmins} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    redirect('/admin/login');
  }
}
