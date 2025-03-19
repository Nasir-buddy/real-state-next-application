import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { useRouter, usePathname } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import { Bell, MessageCircle, Plus, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage = pathname.includes('/managers') || pathname.includes('/tenants');

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav 
      className="fixed top-0 left-0 w-full z-50 shadow-md"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="flex justify-between items-center w-full h-full py-2 px-4 md:px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-3 md:gap-6">
            {isDashboardPage && (
                <div className='md:hidden'>
                    <SidebarTrigger />
                </div>
            )}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none transition-colors duration-200"
            scroll={false}
          >
            <div className="relative w-8 h-8">
              <Image
                src="/logo.svg"
                alt="Rentiful Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold">
              RENT
              <span className="text-secondary-500 font-light">
                IFUL
              </span>
            </span>
          </Link>
          
          {isDashboardPage && authUser && (
            <Button
              variant="secondary"
              className="ml-2 md:ml-4 bg-primary-50 text-primary-700 hover:bg-secondary-500 hover:text-primary-50 rounded-lg"
              onClick={() => {
                router.push(
                  authUser.userRole.toLowerCase() === 'manager'
                    ? '/manager/newproperty'
                    : '/search'
                );
              }}
            >
              {authUser.userRole.toLowerCase() === 'manager' ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">
                    Add New Property
                  </span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>

        {!isDashboardPage && (
          <p className="text-primary-200 hidden md:block text-center max-w-md">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}

        <div className="flex items-center gap-2 md:gap-5">
          {authUser ? (
            <>
              <button className="relative p-2 rounded-full hover:bg-primary-600 hidden md:flex">
                <MessageCircle className="w-5 h-5 text-primary-200 hover:text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </button>
              
              <button className="relative p-2 rounded-full hover:bg-primary-600 hidden md:flex">
                <Bell className="w-5 h-5 text-primary-200 hover:text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-700 rounded-full"></span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 focus:outline-none p-1 rounded-full hover:bg-primary-600">
                    <Avatar className="w-8 h-8 border-2 border-primary-600">
                      <AvatarImage
                        src={authUser.userInfo?.image}
                        alt={authUser.userInfo?.name || 'User avatar'}
                      />
                      <AvatarFallback className="bg-primary-600 text-white text-sm">
                        {authUser.userInfo?.name?.[0].toUpperCase() || authUser.userRole?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-primary-100 hidden md:block font-medium truncate max-w-[120px]">
                      {authUser.userInfo?.name}
                    </p>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="end"
                  className="bg-white text-primary-700 rounded-md shadow-lg p-1 min-w-[200px]"
                >
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-primary-700 hover:text-primary-100 px-3 py-2 rounded transition-colors"
                    onSelect={() =>
                      router.push(
                        authUser.userRole?.toLowerCase() === 'manager'
                          ? '/managers/properties'
                          : '/tenants/favorites',
                        { scroll: false }
                      )
                    }
                  >
                    Go to Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 h-px bg-primary-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-primary-700 hover:text-primary-100 px-3 py-2 rounded transition-colors"
                    onSelect={() =>
                      router.push(`/${authUser.userRole?.toLowerCase()}s/settings`, {
                        scroll: false,
                      })
                    }
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-primary-700 hover:text-primary-100 px-3 py-2 rounded transition-colors"
                    onSelect={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="secondary"
                  className="text-white border border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg transition-colors"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg transition-colors"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;