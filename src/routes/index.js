import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
//import CompactLayout from '../layouts/compact';
//import DashboardLayout from '../layouts/dashboard';
// config
import Config from '../config';
//
import { LoginPage, TestLog } from './elements';

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: '/',
            children: [
                { element: <Navigate to={Config.PATH_AFTER_LOGIN} replace />, index: true },
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <LoginPage />
                        </GuestGuard>
                    ),
                },
            ],
        },
        {
            path: '/adcl/affaire',
            children: [

                {
                    path: '',
                    element: (
                        <AuthGuard>
                            <TestLog />
                        </AuthGuard>
                    ),
                },
            ],
        },
      /* {
            path: '/' + Config.APP_NAME,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ),
            children: [
                { element: <Navigate to={Config.PATH_AFTER_LOGIN} replace />, index: true },
                {
                    path: 'affaire',
                    children: [
                        // { element: <AffaireList /> },
                        { path: '', element: <AffaireList /> },
                        { path: ':id', element: <AffaireDetails /> },
                        { path: ':id/edit', element: <AffaireEdit /> },

                    ]
                },
                { path: 'fiche', element: <PageTwo /> },
                { path: 'planning', element: <PageThree /> },
                // {
                //   path: 'user',
                //   children: [
                //     { element: <Navigate to="/dashboard/user/four" replace />, index: true },
                //     { path: 'four', element: <PageFour /> },
                //     { path: 'five', element: <PageFive /> },
                //     { path: 'six', element: <PageSix /> },
                //   ],
                // },
            ],
        },*/
        /*{
            element: <CompactLayout />,
            children: [{ path: '404', element: <Page404 /> }],
        },
        { path: '*', element: <Navigate to="/404" replace /> },*/
    ]);
}
