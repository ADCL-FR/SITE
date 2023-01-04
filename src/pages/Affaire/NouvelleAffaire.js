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
import {useAuthContext} from "../../auth/useAuthContext"
import FormCard from "../../components/Form/FormCard";
import {affaireForm} from "../../constants/forms/forms";
import API from "../../api/api";
import PageHeader from "../../components/Headers/PageHeader";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function NouvelleAffaire() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    //Formulaire
    const [formData, setFormData]  = useState({});
    const [ formulaire, setFormulaire ] = useState(affaireForm);

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

    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    };
    const handleSelectChange = (value, id) => {
        setFormData({...formData, [id]: value});
    };
    const handleCheck = (event) => {
        setFormData({...formData, [event.target.id]: event.target.checked});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await API.nouvelle_affaire(formData).then((response) => {
            setMessage('Affaire ajoutée avec succès');
            setSuccess(true);
            setOpen(true);
            navigate('/adcl/affaire');
        }).catch((error) => {
            setMessage('Erreur lors de la création de l\'affaire');
            setSuccess(false);
            setOpen(true);
        });


    }

    const fetchClients = async () => {
        const clients = await API.recuperer_clients();
        let options = [];
        clients.results.map((client) => {
            options.push({value: client.id, label: client.raison + " - " + client.correspondant})
        });
        const newForm = {...formulaire};
        newForm.forms[0].inputs.map((input) => {
            if(input.select && input.select.id === "client"){
                input.select.options = options;
            }
        });
        setFormulaire(newForm);
    }

    /*recupère les salaries pur les mettres en options de Charge d'affaire*/
    const fetchSalaries = async () => {
        const salaries = await API.recuperer_salaries();
        let options = [];
        salaries.results.map((salarie) => {
            options.push({value: salarie.id, label: salarie.nom + " " + salarie.prenom})
        });
        const newForm = {...formulaire};
        newForm.forms[0].inputs.map((input) => {
            if(input.select && input.select.id === "charge_affaire"){
                input.select.options = options;
            }
        });
        setFormulaire(newForm);
    };
    useEffect(() => {
        fetchClients();
        fetchSalaries();
    }, []);

    return (
        <Page title="Nouvelle Affaire" className="flex flex-col bg-blueGray-100">
            <PageHeader title="Nouvelle Affaire" />
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
                <FormCard {...formulaire} onSubmit={handleSubmit} onChange={handleChange} onCheck={handleCheck} onSelect={handleSelectChange}/>
            </div>



        </Page>
    );

}