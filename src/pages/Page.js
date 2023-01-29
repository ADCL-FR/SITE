import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// settings
import { APP_NAME } from '../config';
// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
    <>
    
        <Helmet>
            <title>{`${title} | ${APP_NAME}`}</title>
            <meta http-equiv="Pragma" content="no-cache"/>
            <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate"/>
            {meta}
        </Helmet>

        <Box ref={ref} {...other} className='w-full'>
            {children}
        </Box>
    </>
));

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    meta: PropTypes.node,
};

export default Page;