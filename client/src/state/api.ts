import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { METHODS } from "http";
import { url } from "inspector";
import { headers } from "next/headers";

// Redux API slice bana rahe hain jo backend ke sath interact karega
export const api = createApi({
  // API base query define kar rahe hain
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // Backend API ka base URL le rahe hain environment variable se
    prepareHeaders: async (headers) => { // API request ke headers prepare kar rahe hain
      const session = await fetchAuthSession(); // Auth session fetch kar rahe hain
      const { idToken } = session.tokens ?? {}; // ID token extract kar rahe hain
      if (idToken) { 
        headers.set('Authorization', `Bearer ${idToken}`); // Agar token mila toh Authorization header set kar rahe hain
      }
      return headers; // Headers return kar rahe hain
    }
  }),
  reducerPath: "api", // Redux store me API ke liye ek unique path define kar rahe hain
  tagTypes: ["Managers", "Tenants"], // Data caching aur invalidation ke liye tags define kar rahe hain
  endpoints: (build) => ({
    
    // Authenticated user ka data fetch karne ka endpoint define kar rahe hain
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          // Auth session fetch kar rahe hain
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {}; // ID token extract kar rahe hain
          const user = await getCurrentUser(); // Current user ka data fetch kar rahe hain
          const userRole = idToken?.payload["custom:role"] as string; // User ka role fetch kar rahe hain

          // Role ke hisaab se API endpoint set kar rahe hain
          const endpoint =
            userRole === "manager"
              ? `/managers/${user.userId}` // Manager ke liye endpoint
              : `/tenants/${user.userId}` // Tenant ke liye endpoint

          let userDetailsResponse = await fetchWithBQ(endpoint); // API request bhej rahe hain

          // Agar user database me nahi hai toh naye user ka entry create kar rahe hain
          if (userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            )
          }

          // Response return kar rahe hain
          return {
            data: {
              cognitoInfo: { ...user }, // Cognito user info
              userInfo: userDetailsResponse.data as Tenant | Manager, // User details API se
              userRole, // User ka role
            }
          }
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data." } // Error handle kar rahe hain
        }
      }
    }),

    // Tenant settings update karne ka mutation define kar rahe hain
    updateTenantSettings: build.mutation<Tenant, { cognitoId: string } & Partial<Tenant>>({
      query: ({ cognitoId, ...updateTenant }) => ({
        url: `tenants/${cognitoId}`, // Tenant update ka API endpoint
        method: "PUT", // PUT request use kar rahe hain
        body: updateTenant // Updated data bhej rahe hain
      }),
      invalidatesTags: (result) => [{ type: "Tenants", id: result?.id }], // Data cache invalidate kar rahe hain
    }),

    // Manager settings update karne ka mutation define kar rahe hain
    updateManagerSettings: build.mutation<Manager, { cognitoId: string } & Partial<Manager>>({
      query: ({ cognitoId, ...updateManager }) => ({
        url: `managers/${cognitoId}`, // Manager update ka API endpoint
        method: "PUT", // PUT request use kar rahe hain
        body: updateManager // Updated data bhej rahe hain
      }),
      invalidatesTags: (result) => [{ type: "Managers", id: result?.id }], // Data cache invalidate kar rahe hain
    })
  })
});

// API hooks export kar rahe hain taaki components me use kar sakein
export const {
  useGetAuthUserQuery, // User data fetch karne ke liye hook
  useUpdateTenantSettingsMutation, // Tenant settings update karne ke liye hook
  useUpdateManagerSettingsMutation // Manager settings update karne ke liye hook
} = api;
