'use client'
import Navbar from '@/components/Navbar';
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser } = useGetAuthUserQuery();
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
    <div className='h-full w-full'>
      <Navbar />
      <main className={`h-full flex w-full flex-col pt-[44px]`}>
        {children}
      </main>
    </div>
  );
}

export default layout