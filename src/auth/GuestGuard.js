import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// components
//import LoadingScreen from '../components/loading-screen'; //TODO: add loading screen
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------
import { PATH_AFTER_LOGIN} from "../config";

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default function GuestGuard({ children }) {
    const { isAuthenticated, isInitialized } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to={PATH_AFTER_LOGIN} />;
    }

    if (!isInitialized) {
        //return <LoadingScreen />;
        console.log('loading screen');
        return null;
    }

    return <>{children}</>;
}
