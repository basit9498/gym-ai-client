'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, type UserRole } from '@/modules/auth';

interface Props {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function AuthGuard({ children, requiredRole }: Props) {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace('/login');
      return;
    }
    if (requiredRole && session.role !== requiredRole) {
      router.replace(session.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [router, requiredRole]);

  return <>{children}</>;
}
