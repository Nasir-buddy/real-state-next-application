// This is a client-side component
'use client'

// Importing the Navbar component
import Navbar from '@/components/Navbar';

// Importing a constant for the navbar height
import { NAVBAR_HEIGHT } from '@/lib/constants'

// Importing a custom hook to get authenticated user data
import { useGetAuthUserQuery } from '@/state/api';

// Importing hooks for navigation and path handling in Next.js
import { usePathname, useRouter } from 'next/navigation';

// Importing React and its hooks
import React, { useEffect, useState } from 'react'

// Defining a layout component that takes children as props
const layout = ({ children }: { children: React.ReactNode }) => {
  // Destructuring data and loading state from the custom hook
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();

  // Getting the router object for navigation
  const router = useRouter();

  // Getting the current pathname
  const pathname = usePathname();

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // Effect to handle user role and navigation
  useEffect(() => {
    // Check if user data is available
    if (authUser) {
      // Get the user role in lowercase
      const userRole = authUser.userRole?.toLowerCase();

      // If the user is a manager and on specific paths, redirect them
      if (userRole === "manager" && pathname.startsWith('/search')
        || (userRole === "manager" && pathname === '/')) {
        // Redirect to manager's properties page without scrolling
        router.push('/managers/properties', { scroll: false });
      } else {
        // If not redirecting, set loading to false
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]) // Dependencies for the effect

  // Show loading state while fetching user data
  if (authLoading || isLoading) {
    return <div className="min-h-screen w-full bg-primary-100 flex items-center justify-center">Loading...</div>;
  }
  
  // Render the layout with Navbar and children
  return (
    <div className='h-full w-full'>
      <Navbar />
      <main className={`h-full flex w-full flex-col pt-[44px]`}>
        {children}
      </main>
    </div>
  );
}

// Exporting the layout component as default
export default layout