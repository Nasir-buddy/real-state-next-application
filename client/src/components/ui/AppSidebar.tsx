import { usePathname } from 'next/navigation'
import React from 'react'
import { useSidebar } from './sidebar';
import { Building, FileText, Heart, Settings } from 'lucide-react';
import { Sidebar } from '@/components/ui/sidebar'
import Home from '@/app/page';

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
    return <Sidebar>

    </Sidebar>
}

export default AppSidebar