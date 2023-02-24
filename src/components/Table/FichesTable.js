// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';


// drap and drop

// ----------------------------------------------------------------------
//user

import API from "../../api/api";
import DataTable from "react-data-table-component";
import { PATH_DASHBOARD } from "../../routes/paths";
import Button from "../../components/Elements/Button";
import FicheForm from "../Form/fiche/FicheForm";
import Dialog from "@mui/material/Dialog";

const columns = [{
    name: 'Description',
    selector: row => row.description,
    //right: true

},
    {
        name: 'Groupe Machine',
        selector: row => row.groupe_machine?.nom_groupe_machine,
        center: true,

    },
    {
        name: 'Fournitures',
        selector: row => row.fourniture,
        format: row => row.fourniture ? 'Livrées' : 'En attente',
        center: true,

    }, {
        name: 'Terminée',
        selector: row => row.terminee,
        format: row => row.terminee ? 'Oui' : 'Non',
        center: true,

    },
    // {
    //     name: 'Poster Button',
    //     button: true,
    //     cell: () => <div><button>Delete</button><button>Delete</button></div>
    // },

]

const conditionalRowStyles = [
    {
        when: row => !row.fourniture ,
        style: {
            backgroundColor: 'rgba(253,196,196,0.4)',
            color: 'black'

        },
    },
    {
        when: row => row.fourniture && !row.terminee,
        style: {
            backgroundColor: 'rgba(255,225,191,0.59)',
            color: 'black',

        },
    },
    {
        when: row => row.terminee,
        style: {
            backgroundColor: 'rgba(191,255,194,0.59)',
            color: 'black',

        },
    },
]

export default function FichesTable({affaireId, title="", detail= false}) {

    const navigate = useNavigate();


    const [fiches, setFiches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    function actions(){
        return <div><Button onClick={() => setOpenDialog(true)} >Ajouter une Fiche</Button></div>
    }

    function handleClick(row) {
        navigate(PATH_DASHBOARD.fiche.view(row.id))
    }

    useEffect(() => {
            API.affaire.get_affaire_et_fiches(affaireId).then((response) => {
                    setFiches(response.fiches)
                    setLoading(false)
                }
            )
        }, [affaireId]
    )
    // change state of zones, move fiches from one zone to another with affaire infos

    return (
        <>
            <DataTable
                style={{marginLeft: "15px"}}
                title={"Fiches"}
                columns={columns}
                data={fiches}
                progressPending={loading}
                selectableRows={true}
                customStyles={customStyles}
                //conditionalRowStyles={conditionalRowStyles}
                dense
                highlightOnHover
                pointerOnHover
                onRowDoubleClicked={(row) => handleClick(row)}
                actions={actions()}
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <FicheForm update={false}  affaireId={affaireId} />
            </Dialog>
        </>

    );
}

const customStyles = {
    header: {
        style: {

            // ligt grey but visible
            //borderTop: "2px solid #e0e0e0",
            borderLeft: "2px solid #e0e0e0",
            borderRight: "2px solid #e0e0e0",
        }
    },
    tableWrapper: {
        style: {

            // ligt grey but visible
            borderBottom: "2px solid #e0e0e0",
            borderLeft: "2px solid #e0e0e0",
            borderRight: "2px solid #e0e0e0",
        }
    },
    rows: {
        style: {
            paddingLeft: "8px", // override the cell padding for data cells
        }
    },
    headRow: {
        style: {
            paddingLeft: "8px", // override the cell padding for head cells
        }
    }




};


