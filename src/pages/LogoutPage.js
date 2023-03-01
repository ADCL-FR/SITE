// Description: Page de déconnexion
// react
import React, {useEffect} from 'react';

// components
import Page from './Page';

// ----------------------------------------------------------------------
import {useAuthContext} from "../auth/useAuthContext";
export default function LoginPage() {
    const {logout} = useAuthContext();
    // déconnexion
    useEffect(() => {
        logout();
        window.location.href = '/login';
    }, [logout]);
    return (
        <Page title="Se déconnecter">
            {/*déconnexiion*/}
            <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Déconnexion en cours...
                        </h2>
                    </div>
                </div>
            </div>
        </Page>
    );

}
