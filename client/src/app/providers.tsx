"use client";

import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";
import Auth from "./(auth)/authProvider";
import { usePathname } from "next/navigation";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    
    // Routes that require authentication
    // Add your actual protected routes here
    const publicRoutes = ['/', '/landing'];
    
    // Check if the current path doesn't need authentication
    const isPublicRoute = publicRoutes.some(route => 
        pathname === route || pathname.startsWith('/landing/')
    );
    
    return (
        <StoreProvider>
            <Authenticator.Provider>
                {!isPublicRoute ? (
                    <Auth>
                        {children}
                    </Auth>
                ) : (
                    children
                )}
            </Authenticator.Provider>
        </StoreProvider>
    );
}

export default Providers;