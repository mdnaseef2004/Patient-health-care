'use client';

import { useState } from 'react';
import { MoreHorizontal, Plus, Shield, User } from 'lucide-react';

export default function AdminManagement({ admins }: { admins: any[] }) {
  // We receive the initial admins from the server component
  // In a real app, we would add "Add Admin" modal state here.

  return (
    <div className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl apple-shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-[var(--color-border)]">
        <h4 className="font-semibold">Registered Admins</h4>
        <button className="flex items-center gap-2 text-sm text-[var(--color-primary)] font-medium hover:text-[var(--color-primary-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[var(--color-muted-foreground)] font-medium border-b border-[var(--color-border)]">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Added</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden border border-[var(--color-border)]">
                      {admin.photo ? (
                        <img src={admin.photo} alt={admin.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-bold text-[var(--color-primary)]">{admin.name.charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-xs text-[var(--color-muted-foreground)]">{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5">
                    {admin.role === 'SUPER_ADMIN' ? (
                      <>
                        <Shield className="w-4 h-4 text-purple-500" />
                        <span className="font-medium text-purple-700 dark:text-purple-400">Super Admin</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-blue-700 dark:text-blue-400">Sub Admin</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-[var(--color-muted-foreground)] text-xs">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
