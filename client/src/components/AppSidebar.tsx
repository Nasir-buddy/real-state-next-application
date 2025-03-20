'use client';
import { usePathname } from 'next/navigation'
import React from 'react'
import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from './ui/sidebar';
import { Building, FileText, Heart, Menu, Settings, X } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar'
import Home from '@/app/page';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';

const AppSidebar = ({ userType }: AppSidebarProps) => {
    const pathname = usePathname();
    const { toggleSidebar, open } = useSidebar();

    const navLinks =
        userType === 'manager'
            ? [
                {
                    icon: Building, label: "Properties", href: "/managers/properties"
                },
                {
                    icon: FileText, label: "Applications", href: "/managers/applications"
                },
                {
                    icon: Settings, label: "Settings", href: "/managers/settings"
                }
            ]
            : [
                {
                    icon: Heart, label: "Favorites", href: "/managers/favorites"
                },
                {
                    icon: FileText, label: "Applications", href: "/managers/applications"
                },
                {
                    icon: Home, label: "Residences", href: "/tenants/settings"
                },
                {
                    icon: Settings, label: "Settings", href: "/managers/settings"
                }
            ]
    return <Sidebar
        collapsible='icon'
        className='fixed left-0 bg-white shadow-lg h-[calc(100vh-60px)]'
        style={{
            top: NAVBAR_HEIGHT,
        }}
    >
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div
                        className={cn(
                            "flex min-h-[56px] w-full items-center pt-3 mb-3",
                            open ? "justify-between px-6" : "justify-center"
                        )}
                    >
                        {
                            open ? (
                                <>
                                    <h1 className='text-xl font-bold text-gray-800'>
                                        {userType === "manager" ? "Manager View" : "Renter View"}
                                    </h1>
                                    <button
                                        className='hover:bg-gra-100 p-2 rounded-md'
                                        onClick={() => {
                                            toggleSidebar()
                                        }}
                                    >
                                        <X className='h-6 w-6 text-gray-6000' />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className='hover:bg-gra-100 p-2 rounded-md'
                                        onClick={() => {
                                            toggleSidebar()
                                        }}
                                    >
                                        <Menu className='h-6 w-6 text-gray-6000' />
                                    </button>
                                </>
                            )
                        }
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    </Sidebar>
}

export default AppSidebar