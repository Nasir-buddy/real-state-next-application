import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator, components, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { FormField } from '@/components/ui/form';

// import awsExports from './aws-exports';
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        }
    }
});

const formFields = {
    signIn: {
        username: {
            placeholder: "Enter you email",
            label: "Email",
            isRequired: true
        }, 
        password: {
            placeholder: "Enter you password",
            label: "password",
            isRequired: true
        }
    }, 
    signUp: {
        username: 
        {   
            order: 1,
            placeholder: "Choose a username",
            label: "username",
            isRequired: true
        }, 
        email: {
            order: 2,
            placeholder: "Enter you eamil address",
            label: "Email",
            isRequired: true
        },
        password: {
            order: 3,
            placeholder: "Create a password",
            label: "password",
            isRequired: true
        }, 
        confirm_password: {
            order: 3,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            isRequired: true
        }
    }
}

const Auth = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthenticator((context) => [context.user])
    return (
        <div className='h-full'>
            <Authenticator
                components={components}
                formFields={FormField}
            >
                {() => <>{children}</>}
            </Authenticator>
        </div>
    );
}

export default Auth;