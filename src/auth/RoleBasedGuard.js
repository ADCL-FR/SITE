import PropTypes from 'prop-types';
// @mui
import { Container, Typography } from '@mui/material';

import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default function RoleBasedGuard({ hasContent, roles = [], children }) {
  // Logic here to get current user role
    const { user } = useAuthContext();

    const currentGroups = user.groups;

    // add admin as a group
    //roles.push('admin');

    function containsElement(arr1, arr2) {
        return arr2.some(function(element) {
            return arr1.includes(element);
        });
    }
    // if the user has any of the roles, then they are allowed
    const isAllowed = containsElement(currentGroups, roles);

    if (typeof roles !== 'undefined' && !isAllowed) {
    return hasContent ? (
      <Container sx={{ textAlign: 'center' }}>
        <div >
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </div>

        <div >
          <Typography sx={{ color: 'text.secondary' }}>You do not have permission to access this page</Typography>
        </div>


      </Container>
    ) : null;
    }

    return <>{children}</>;
}
