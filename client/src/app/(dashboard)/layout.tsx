'use client';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/AppSidebar'; // Ensure you import your Sidebar component
import { SidebarProvider } from '@/components/ui/sidebar';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import React, { ReactNode, useEffect, useState } from 'react';
import { useGetAuthUserQuery } from '@/state/api';
import { useRouter, usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();

  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (userRole === "manager" && pathname.startsWith('/tenants')
        || (userRole === "tenant" && pathname.startsWith('/managers'))) {
        router.push(
          userRole === 'manager' ?
            '/managers/properties'
            : '/tenants/favorites'
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname])


   // Show loading state while fetching user data
   if (authLoading || isLoading) {
    return <div className="min-h-screen w-full bg-primary-100 flex items-center justify-center">Loading...</div>;
  }

  // If no user role is found, you might want to handle this case
  if (!authUser?.userRole) {
    return <div className="min-h-screen w-full bg-primary-100 flex items-center justify-center">User role not found</div>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-primary-100">
        <Navbar />
        <div style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <Sidebar userType={authUser.userRole.toLowerCase()} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
