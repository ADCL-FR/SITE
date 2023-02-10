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


// table
import DataTable from 'react-data-table-component';
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data.client_detail, null, 2)}</pre>;
const columns = [
    {
        name: 'Numéro',
        selector: row => row.num_affaire,
        sortable: true,
    },
    {
        name: 'Raison',
        selector: row => row.raison || null,
        hide: "md",
        right: false,
        grow: 2,
    },
    {
        name: 'Client',
        selector: row => row.client_detail?.raison,
        hide: "md",
        right: true,
    },
    {
        name: 'Montant',
        selector: row => row.montant,
        hide: "md",
        right: true,
        sortable: true,
    },
    {
        name: 'Chargé d\'affaire',
        selector: row => row.charge_affaire_detail?.nom,
        hide: 'sm',
        right: true,
    },
    {
        name: 'Date de création',
        selector: row => row.date_creation,
        hide: "md",
        right: true,
        //0sortable: true,
    },
    {
        name: 'Date de rendu',
        selector: row => row.date_rendu,
        hide: "md",
        right: true,
        //sortable: true,
    },
    {
        name: 'Statut',
        selector: row => row.statut_detail?.description,
        right: true,
        //sortable: true,
    },

];



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function ListeAffaire() {
    const [affaires, setAffaires] = useState([]);

    // table
    const [loading, setloading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);

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

    const getAffaires = async (page, perPage) => {
        setloading(true)
        const response = await API.get_affaires(page, perPage).then((response) => {
            setTotalRows(response.count)
            setloading(false)
            console.log(response)
           return response.results;
        })
        setAffaires(response);
    };


    useEffect(() => {
        getAffaires(1, perPage);
    }, [perPage]);

    return (
        <Page title="Liste des Affaires" className="flex flex-col h-full bg-blueGray-100">
            <PageHeader title="Affaires" />
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
                    style={{borderRadius: "15px"}}
                    title={"Liste des affaires"}
                    columns={columns}
                    data={affaires}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    pagination={true}
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangePage={(page) => getAffaires(page, perPage)}
                    onChangeRowsPerPage={(nb_page) => setPerPage(nb_page)}
                    progressPending={loading}
                />
                {/*<Table head={tableAffaireHeaders} title={tableAffaireTitle} body={affaires} RowComponent={AffaireRow}/>*/}
            </div>



        </Page>
    );

}