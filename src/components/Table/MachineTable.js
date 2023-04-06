// React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// drap and drop

// ----------------------------------------------------------------------
//user

import useMachine from "../../hooks/machine/useMachine.js"
import DataTable from "react-data-table-component";
import { PATH_DASHBOARD } from "../../routes/paths";
import Button from "../../components/Elements/Button";
import FicheForm from "../Form/fiche/FicheForm";
import Dialog from "@mui/material/Dialog";

const columns = [
    {
        name: "Machine",
        selector: (row) => row.nom_machine,
        sortable: true,
    },
    {
        name: "Description",
        selector: (row) => row.description,
        grow: 2,
        hide: "md",
        //right: true
    },
    {
        name: "Fonctionnelle",
        selector: (row) => row.fonctionnelle,
        center: true,
        sortable: false,
        format: (row) => (row.fonctionnelle ? "Oui" : "Non"),
    },
];

const conditionalRowStyles = [
    {
        when: (row) => !row.fonctionnelle,
        style: {
            backgroundColor: "rgba(253,196,196,0.4)",
            color: "black",
        },
    }
]

export default function MachineTable() {
    const navigate = useNavigate();

    const { machines } = useMachine();
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    function actions() {
        return (
            <div>
                <Button onClick={() => setOpenDialog(true)}>Ajouter une Machine</Button>
            </div>
            );
    }
    

    useEffect(() => {
        }, []);
    // change state of zones, move fiches from one zone to another with affaire infos

    return (
        <>
        <DataTable
            style={{ marginLeft: "15px" }}
            title={"Gestion des machines"}
            columns={columns}
            data={machines}
            progressPending={loading}
            selectableRows={true}
            conditionalRowStyles={conditionalRowStyles}
            dense
            highlightOnHover
            pointerOnHover
            onRowDoubleClicked={(row) =>{}}
            actions={actions()}
        />
        </>
        );
}
