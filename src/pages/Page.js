import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// settings
import Config from '../config';
// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
    <>
        <Helmet>
            <title>{`${title} | ${Config.APP_NAME}`}</title>
            {meta}
        </Helmet>

        <Box ref={ref} {...other}>
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