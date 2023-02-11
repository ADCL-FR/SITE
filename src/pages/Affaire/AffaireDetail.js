import React, {useEffect, useState} from "react";

//components
import FichesTable from "../../components/Table/FichesTable"
import PageHeader from "../../components/Headers/PageHeader";
import Page from "../Page";

//alert
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useParams} from "react-router-dom";
import API from "../../api/api";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});
export default function AffaireDetail() {

    let {id} = useParams()

    const [affaire, setAffaire] = useState([]);


    function fetch_affaire() {
        API.affaire.get_affaire_detail(id).then((affaire) => {
            setAffaire(affaire)
        })
    }
    //Alerte
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    useEffect(() => {
        fetch_affaire()
    }, [id, affaire]);

    return (
        <Page title={`${affaire.num_affaire}`} className="flex flex-col h-full bg-blueGray-100">
            <PageHeader title={`Affaire: ${affaire.num_affaire}`}/>
            <div className="md:px-10 mb-20" style={{"marginTop": "-8rem"}}>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    message=""
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={success ? 'success' : 'error'} sx={{width: '100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
                <FichesTable affaireId={id} title={"Liste des fiches :"}/>
                {/*<Table head={tableAffaireHeaders} title={tableAffaireTitle} body={affaires} RowComponent={AffaireRow}/>*/}
            </div>


        </Page>);
}