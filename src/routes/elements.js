import { Suspense, lazy } from 'react';
// components
//import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<p>Chargement</p>}>
            <Component {...props} />
        </Suspense>
    );

// ----------------------------------------------------------------------

export const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
export const TestLog = Loadable(lazy(() => import('../pages/TestLog')));
