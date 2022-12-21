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
import {affaireForm} from "../../constants/forms/forms";
import {tableAffaireHeaders, tableAffaireTitle} from "../../constants/tables/affaire";
import Table from "../../components/Table/table";
import AffaireRow from "../../components/Table/AffaireRow";
import API from "../../api/api";
import PageHeader from "../../components/Headers/PageHeader";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function ListeAffaire() {
    const [affaires, setAffaires] = useState([]);

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

    const getAffaires = async () => {
        const response = await API.get_affaires().then((response) => {
           return response.results;
        })
        setAffaires(response);
        console.log(response);
    };
    const body = [
        [
            "test",
            "toto"
        ]
    ]




    useEffect(() => {
        getAffaires();
    }, []);

    return (
        <Page title="Liste des Affaires" className="flex flex-col bg-blueGray-100">
            <PageHeader title="Affaires" />
            <div className="md:px-10 mb-20  h-full" style={{"margin-top": "-8rem"}}>
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
                <Table head={tableAffaireHeaders} title={tableAffaireTitle} body={affaires} RowComponent={AffaireRow}/>
            </div>



        </Page>
    );

}