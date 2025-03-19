// Import React and the useEffect hook for managing side effects in the component lifecycle.
import React, { useEffect } from 'react';

// Import the Amplify object from aws-amplify to configure and interact with AWS services.
import { Amplify } from 'aws-amplify';

// Import various UI components and hooks from AWS Amplify's UI library.
import { Authenticator, Heading, Radio, RadioGroupField, useAuthenticator, View } from '@aws-amplify/ui-react';

// Import the default styles for Amplify UI components.
import '@aws-amplify/ui-react/styles.css';

// Import a custom FormField component from the project's UI library.
import { FormField } from '@/components/ui/form';

// Import Next.js hooks for navigation and getting the current path.
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

// Configure AWS Amplify for authentication using Cognito.
// The configuration uses environment variables to set the Cognito User Pool ID and Client ID.
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!, // Your Cognito User Pool ID from env variables.
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!, // Your Cognito App Client ID from env variables.
        }
    }
});

// Define custom components to override parts of the default Authenticator UI.
const components = {
    // Custom Header component for the authentication UI.
    Header() {
        return (
            // View component provides layout styling (margin top and bottom).
            <View className='mt-4 mb-7'>
                {/* Display a heading with custom styling */}
                <Heading level={3} className='!text-2xl @font-bold'>
                    RENT
                    {/* Span styling for part of the title */}
                    <span className='text-secondary-500 font-light hover:!text-primary-300'>IFUL</span>
                </Heading>
                {/* Welcome message below the heading */}
                <p className='text-muted-foreground mt-2'>
                    <span className='font-bold '>Welcome!</span> Please sign in to continue
                </p>
            </View>
        )
    },
    // Customizations for the SignIn part of the authentication UI.
    SignIn: {
        // Custom Footer component for the SignIn screen.
        Footer() {
            // Use the useAuthenticator hook to access helper methods like toSignUp.
            const { toSignUp } = useAuthenticator();
            return (
                // Centered view for the footer with margin.
                <View className='text-center mt-4'>
                    <p className='text-muted-foreground '>
                        Don&apos;t have an account?{" "}
                        {/* Button to navigate to the Sign Up view using the toSignUp method */}
                        <button
                            onClick={toSignUp}
                            className='text-primary hover:underline bg-transparent border-none p-0'
                        >
                            Sign up here
                        </button>
                    </p>
                </View>
            )
        }
    },
    // Customizations for the SignUp part of the authentication UI.
    SignUp: {
        // Custom FormFields component for the SignUp screen.
        FormFields() {
            // Retrieve any validation errors from the authenticator context.
            const { validationErrors } = useAuthenticator();
            return (
                <>
                    {/* Render default sign-up form fields provided by the Authenticator */}
                    <Authenticator.SignUp.FormFields />
                    {/* Render a custom radio group field for selecting a user role */}
                    <RadioGroupField
                        legend="Role" // The field label
                        name="custom:role" // Name of the custom attribute
                        errorMessage={validationErrors?.['custom:role']} // Display validation error if any
                        hasError={!!validationErrors?.['custom:role']} // Flag for error state
                        isRequired // Marks this field as required
                    >
                        {/* Radio option for "Tenant" role */}
                        <Radio value='tenant'>
                            Tenant
                        </Radio>
                        {/* Radio option for "Manager" role */}
                        <Radio value='manager'>
                            Manager
                        </Radio>
                    </RadioGroupField>
                </>
            )
        },
        // Custom Footer component for the SignUp screen.
        Footer() {
            // Use the useAuthenticator hook to access the toSignIn helper method.
            const { toSignIn } = useAuthenticator();
            return (
                <View className='text-center mt-4'>
                    <p className='text-muted-foreground '>
                        Already have an account?{" "}
                        {/* Button to navigate to the SignIn view using the toSignIn method */}
                        <button
                            onClick={toSignIn}
                            className='text-primary hover:underline bg-transparent border-none p-0'
                        >
                            Sign In here
                        </button>
                    </p>
                </View>
            )
        }
    }
}

// Define custom form field configurations for both sign in and sign up screens.
const formFields = {
    // Configuration for the sign in form.
    signIn: {
        username: {
            placeholder: "Enter you email", // Placeholder text for the username field.
            label: "Email", // Label to display above the field.
            isRequired: true // Mark the field as required.
        },
        password: {
            placeholder: "Enter you password", // Placeholder text for the password field.
            label: "password", // Label for the password field.
            isRequired: true // Mark the field as required.
        }
    },
    // Configuration for the sign up form.
    signUp: {
        username: {
            order: 1, // Order in which this field appears.
            placeholder: "Choose a username", // Placeholder text for the username field.
            label: "username", // Label for the username field.
            isRequired: true // Mark as required.
        },
        email: {
            order: 2, // Order for the email field.
            placeholder: "Enter you eamil address", // Placeholder text (note: typo in "email").
            label: "Email", // Field label.
            isRequired: true // Mark as required.
        },
        password: {
            order: 3, // Order for the password field.
            placeholder: "Create a password", // Placeholder text.
            label: "password", // Label for the password field.
            isRequired: true // Mark as required.
        },
        confirm_password: {
            order: 3, // Order for the confirmation field (same as password order).
            placeholder: "Confirm your password", // Placeholder text.
            label: "Confirm Password", // Label for the confirmation field.
            isRequired: true // Mark as required.
        }
    }
}

// The main Auth component wraps children with authentication logic.
const Auth = ({ children }: { children: React.ReactNode }) => {
    // Get the current user from the authenticator context.
    const { user } = useAuthenticator((context) => [context.user]);
    // Initialize the Next.js router for navigation.
    const router = useRouter();
    // Get the current pathname from Next.js.
    const pathname = usePathname();
    // Determine if the current path is an authentication page (sign in or sign up).
    const isAuthPage = pathname.match(/^\/(signin|signup)$/);
    // Determine if the current path is a dashboard page (manager or tenants).
    const isDashboardPage = pathname.startsWith("/manager") || pathname.startsWith("/tenants");

    // Redirect authenticated users away from auth pages.
    useEffect(() => {
        if (user && isAuthPage) {
            // If a user is authenticated and is on the auth page, redirect to the home page.
            router.push('/');
        }
    }, [user, isAuthPage, router]);

    // Allow access to public pages without authentication.
    if (!isAuthPage && isDashboardPage) {
        return (
            <>
                {children}
            </>
        );
    }

    // For auth pages, render the Authenticator component with custom configuration.
    return (
        <div className='h-full'>
            <Authenticator
                // Set the initial state to signUp if the URL includes 'signup'; otherwise, use signIn.
                initialState={pathname.includes('signup') ? "signUp" : "signIn"}
                components={components} // Pass the custom UI components.
                formFields={formFields} // Pass the custom form field configurations.
            >
                {/* Render children once authentication is handled */}
                {() => <>{children}</>}
            </Authenticator>
        </div>
    );
}

// Export the Auth component as the default export.
export default Auth;
