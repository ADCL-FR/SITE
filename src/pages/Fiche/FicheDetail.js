// React
import React, {useEffect, useState} from "react";
import {
    useParams
} from "react-router-dom";
// components
import Page from "../Page";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from "../../components/Elements/Button";
import Dialog from '@mui/material/Dialog';
import FormCard from "../../components/Form/FormCard";

//constants
import {etapeForm} from '../../constants/forms/forms'
// sections
// ----------------------------------------------------------------------
//user
import {affaireForm} from "../../constants/forms/forms";
import {tableAffaireHeaders, tableAffaireTitle} from "../../constants/tables/affaire";
import Table from "../../components/Table/table";
import AffaireRow from "../../components/Table/AffaireRow";
import API from "../../api/api";
import PageHeader from "../../components/Headers/PageHeader";
import FichesTable from "../../components/Table/FichesTable"

// table
import DataTable from 'react-data-table-component';
const ExpandedComponent = ({ data }) => <FichesTable affaireId={data.id} />;
const columns = [
    {
        name: 'Numéro',
        selector: row => row.num_etape,
        sortable: true,
    },
    {
        name: 'Machine',
        selector: row => row.machine?.nom_machine || null,


    },
    {
        name: 'Quantité',
        selector: row => row.quantite,
        right: true,
    },
    {
        name: 'Temps',
        selector: row => row.temps ,
        right: true,
    },
    {
        name: 'Terminée',
        selector: row => row.terminee ? 'Oui' : 'Non',
        right: true,
    },

];



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});


export default function FicheDetail() {

    let {id} = useParams()
    const [etapes, setEtapes] = useState([]);
    const [infos, setInfos] = useState({});

    //form etape
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData]  = useState({});
    const [ formulaire, setFormulaire ] = useState(etapeForm);

    // table
    const [loading, setloading] = useState(false);

    //Alerte
    const [open, setOpen] =useState(false);
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // form
    const handleChange = (event) => {
        setFormData({...formData, [event.target.id]: event.target.value});
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {...formData, fiche: infos.id}
        API.etape.nouvelle_etape(form).then((response) => {
            setMessage('Étape ajoutée avec succès');
            setSuccess(true);
            setOpen(true);
            setShowModal(false)
            getEtapes(id)
        }).catch((error) => {
            setMessage('Erreur lors de la création de l\'étape');
            setSuccess(false);
            setOpen(true);
        });
    }
    const handleSelectChange = (value, id) => {
        setFormData({...formData, [id]: value});
    };
    const setMachineOptions = async () => {
        const machines = await API.machine.get_machines()
        let options = [];
        machines.results.map((machine) => {
            options.push({value: machine.id, label: machine.nom_machine})
        });
        const newForm = {...formulaire};
        newForm.forms[0].inputs.map((input) => {
            if(input.select && input.select.id === "machine"){
                input.select.options = options;
            }
        });
        setFormulaire(newForm);
    }

    //alert
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    function actions(){
        return <div><Button onClick={() => setShowModal(true)} >Ajouter une étape</Button></div>
    }

    const getEtapes = async (ficheId) => {
        setloading(true)
        API.fiche.get_fiche_etapes(ficheId).then((response) => {
            setEtapes(response.etapes);
            response.etapes = []
            setInfos(response)
            setloading(false)
        })

    };




    useEffect(() => {
        getEtapes(id);
        setMachineOptions();
    }, [id]);

    return (
        <Page title="Détail Fiche" className="flex flex-col h-full bg-blueGray-100">
            <PageHeader title={`Affaire ${infos.num_affaire}`} />
            <div className="md:px-10 mb-20" style={{"marginTop": "-8rem"}}>
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
                <DataTable
                    title={`Fiche ${infos.description}`}
                    columns={columns}
                    data={etapes}
                    progressPending={loading}
                    selectableRows={true}
                    dense
                    highlightOnHover
                    pointerOnHover
                    actions={actions()}
                />
                <Dialog open={showModal} onClose={() => setShowModal(false)}>
                    <FormCard {...etapeForm} onSubmit={handleSubmit} onChange={handleChange} onSelect={handleSelectChange}/>
                </Dialog>
            </div>



        </Page>
    );

}

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};