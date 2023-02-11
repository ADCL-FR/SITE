// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';


// drap and drop

// ----------------------------------------------------------------------
//user

import API from "../../api/api";
import DataTable from "react-data-table-component";
import { PATH_DASHBOARD } from "../../routes/paths";


const columns = [{
    name: 'Description',
    selector: row => row.description,
    //right: true

},
    {
        name: 'Groupe Machine',
        selector: row => row.groupe_machine,

    },
    {
        name: 'Fournitures',
        selector: row => row.fourniture,
        format: row => row.fourniture ? 'Livrées' : 'En attente'

    }, {
        name: 'Terminée',
        selector: row => row.terminee,
        format: row => row.terminee ? 'Oui' : 'Non'

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

export default function FichesTable({affaireId}) {

    const navigate = useNavigate();


    const [fiches, setFiches] = useState([]);
    const [loading, setLoading] = useState(true);


    function handleClick(row) {
        navigate(PATH_DASHBOARD.fiche.view(row.id))
    }

    useEffect(() => {
            API.affaire.get_affaire(affaireId).then((response) => {
                    setFiches(response.fiches)
                    setLoading(false)
                }
            )
        }, [affaireId]
    )
    // change state of zones, move fiches from one zone to another with affaire infos

    return (
        <DataTable
            style={{marginLeft: "15px"}}
            //title={"Liste des fiches"}
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
        />
    );
}

const customStyles = {
    rows: {
        style: {
            paddingLeft: '25px',
        },
    },
    headCells: {
        style: {
            marginLeft: '25px'
        },
    },

};


