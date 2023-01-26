// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

// components
import Page from "../Page";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// sections
// ----------------------------------------------------------------------
//user
import {tableAffaireHeaders, tableAffaireTitle} from "../../constants/tables/affaire";
import PageHeader from "../../components/Headers/PageHeader";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function ListeAffaire() {

    //Alerte
    const [open, setOpen] =useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }


    return (
        <Page title="Planning Opérateur" className="flex flex-col bg-blueGray-100">
            <PageHeader title="Planning Opérateur" />
            <div className="md:px-10 mb-20  h-full" style={{"marginTop": "-8rem"}}>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    message=""
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={success ? 'success' : 'error' } sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>
        </Page>
    );

}