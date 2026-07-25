'use client';

import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

export default function ProfileForm({ admin }: { admin: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    photo: admin.photo || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update profile');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-2xl p-6 apple-shadow">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="relative w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
            {formData.photo ? (
              <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-zinc-400 dark:text-zinc-500">
                {formData.name.charAt(0)}
              </span>
            )}
            <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
              {/* Note: A real file upload would use an input type="file" here */}
            </label>
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm font-medium">Profile Image URL</label>
            <input
              type="text"
              value={formData.photo}
              onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm transition-all"
            />
            <p className="text-xs text-[var(--color-muted-foreground)]">Provide a direct link to an image to use as your avatar.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 border border-[var(--color-border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-sm transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <input
            type="text"
            disabled
            value={admin.role.replace('_', ' ')}
            className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800/80 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-muted-foreground)] cursor-not-allowed"
          />
          <p className="text-xs text-[var(--color-muted-foreground)]">Your role cannot be changed.</p>
        </div>

        {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
        {success && <div className="text-emerald-500 text-sm font-medium">Profile updated successfully!</div>}

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors apple-shadow disabled:opacity-70"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
