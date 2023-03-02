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
import FichesTable from "../../components/Table/FichesTable"

// table
import DataTable from 'react-data-table-component';
import {PATH_DASHBOARD} from "../../routes/paths";
const ExpandedComponent = ({ data }) => <FichesTable affaireId={data.id} />;
const columns = [
    {
        name: 'Numéro',
        selector: row => row.num_affaire,
        sortable: true,
        sortField: 'num_affaire',
        cell: row => (
    		<a href={`/dashboard/affaire/${row.id}`} style={{color: "blue", textDecoration: "underline"}} >
                {row.num_affaire}
		    </a>
	    )
    },
    {
        name: 'Description',
        selector: row => row.raison || null,
        hide: "md",
        right: false,
        grow: 2,
    },
    {
        name: 'Client',
        selector: row => row.client_detail?.raison,
        hide: "md",
        center: true,
    },
    {
        name: 'Chargé d\'affaire',
        selector: row => row.charge_affaire_detail?.nom,
        hide: 'sm',
        center: true,
    },
    {
        name: 'Date de création',
        selector: row => row.date_creation,
        hide: "md",
        center: true,
        //0sortable: true,
    },
    {
        name: 'Délais',
        selector: row => row.date_rendu,
        hide: "md",
        center: true,
        sortable: true,
        sortField: 'date_rendu',
    },
    {
        name: 'Statut',
        selector: row => row.statut_detail?.description,
        center: true,
        //sortable: true,
    },

];



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function ListeAffaire() {

    const navigate = useNavigate();

    const [affaires, setAffaires] = useState([]);

    // table
    const [loading, setloading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [ordering, setOrdering] = useState("date_rendu");
    const [direction, setDirection]= useState('-')

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

    const getAffaires = async (page, perPage, ordering, direction) => {
        setloading(true)
        const response = await API.affaire.get_affaires(page, perPage, direction+ordering).then((response) => {
            setTotalRows(response.count)
            setloading(false)
           return response.results;
        })
        setAffaires(response);
    };

    const handleSort = (column, sortDirection) => {
        // simulate server sort

        setOrdering(column.sortField)
        setDirection(sortDirection === 'asc' ? '-' : '')
        // instead of setTimeout this is where you would handle your API call.

    };

    const handleAffaireClick = row => {
        navigate(PATH_DASHBOARD.affaire.view(row.id))
    }


    useEffect(() => {
        getAffaires(1, perPage, ordering, direction);
    }, [perPage, ordering, direction]);

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
                    sortServer
                    onSort={handleSort}
                    fixedHeader
                    fixedHeaderScrollHeight="500px"
                    expandOnRowClicked
                    striped
                    onRowDoubleClicked={(row) => handleAffaireClick(row)}


                />
                {/*<Table head={tableAffaireHeaders} title={tableAffaireTitle} body={affaires} RowComponent={AffaireRow}/>*/}
            </div>



        </Page>
    );

}
