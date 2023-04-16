// React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Progress from "../Elements/Progress";
// drap and drop

// ----------------------------------------------------------------------
//user

import API from "../../api/api";
import DataTable from "react-data-table-component";
import { PATH_DASHBOARD } from "../../routes/paths";
import Button from "../../components/Elements/Button";
import FicheForm from "../Form/fiche/FicheForm";
import CopyFromForm from "../Form/modele/CopyFromForm";
import Dialog from "@mui/material/Dialog";
import useFiche from "../../hooks/fiche/useFiche";

const columns = [
  {
    name: "Titre",
    selector: (row) => row.titre,
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
    name: "Avancement",
    selector: (row) => row.avancement_fiche,
    center: true,
    sortable: false,
    cell: (row) => (
      <div className="flex items-center w-full">
        <Progress
          value={row.avancement_fiche}
          //text={row.avancement_fiche == 0 ? " " : row.avancement_fiche}
          color="indigo"
        />
      </div>
    ),
  },
  {
    name: "Fournitures",
    selector: (row) => row.fourniture,
    format: (row) => (row.fourniture ? "Livrées" : "En attente"),
    center: true,
  },
  {
    name: "Terminée",
    selector: (row) => row.terminee,
    format: (row) => (row.terminee ? "Oui" : "Non"),
    center: true,
  },
  // {
  //     name: 'Poster Button',
  //     button: true,
  //     cell: () => <div><button>Delete</button><button>Delete</button></div>
  // },
];

const conditionalRowStyles = [
  {
    when: (row) => !row.fourniture,
    style: {
      backgroundColor: "rgba(253,196,196,0.4)",
      color: "black",
    },
  },
  {
    when: (row) => row.fourniture && !row.terminee,
    style: {
      backgroundColor: "rgba(255,225,191,0.59)",
      color: "black",
    },
  },
  {
    when: (row) => row.terminee,
    style: {
      backgroundColor: "rgba(191,255,194,0.59)",
      color: "black",
    },
  },
];

export default function FichesTable({
  affaireId,
  affaire,
  title = "",
  detail = false,
}) {
  const navigate = useNavigate();

  const [fiches, setFiches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogCopy, setOpenDialogCopy] = useState(false);

  // selection
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const {deleteFiches} = useFiche();


  const handleRowSelected = React.useCallback((state) => {
    const ids = state.selectedRows.map((fiche) => fiche.id);
    setSelectedRows(ids);
  }, []);
  const contextActions = React.useMemo(() => {
    const handleDelete = async () => {
      if (window.confirm(`Etes vous sur de vouloir supprimer ces machines?`)) {

        await deleteFiches(selectedRows);
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
      }
    };

    return (
        <Button
            key="delete"
            onClick={handleDelete}
            style={{ backgroundColor: "red" }}
            icon
        >
          Supprimer
        </Button>
    );
  }, [selectedRows, toggleCleared]);

  function actions() {
    return (
      <div>
        <Button onClick={() => setOpenDialog(true)}>Ajouter Fiche</Button>
        <Button onClick={() => setOpenDialogCopy(true)}>Ajouter Fiche Modèle</Button>
      </div>
    );
  }

  function handleClick(row) {
    navigate(PATH_DASHBOARD.fiche.view(row.id));
  }

  const get_affaire_et_fiches = () => {
    API.affaire.get_affaire_et_fiches(affaireId).then((response) => {
      setFiches(response.fiches);
      setLoading(false);
    });
  };

  useEffect(() => {
    get_affaire_et_fiches();
  }, [affaireId, toggleCleared]);
  // change state of zones, move fiches from one zone to another with affaire infos

  return (
    <>
      <DataTable
        style={{ marginLeft: "15px" }}
        title={"Fiches"}
        columns={columns}
        data={fiches}
        progressPending={loading}
        selectableRows={true}
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        customStyles={customStyles}
        //conditionalRowStyles={conditionalRowStyles}
        dense
        highlightOnHover
        pointerOnHover
        onRowDoubleClicked={(row) => handleClick(row)}
        actions={actions()}
      />
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          get_affaire_et_fiches();
        }}
      >
        <FicheForm update={false} affaire={affaire} />
      </Dialog>

      <Dialog
          //classes={{root: "overflow-visible"}}
          open={openDialogCopy}
          onClose={() => {
            setOpenDialogCopy(false);
            get_affaire_et_fiches();
          }}
          sx={{ '& .MuiPaper-root': {overflow: "visible" } }}

      >
        <CopyFromForm affaireId={affaire.id} />
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
    },
  },
  tableWrapper: {
    style: {
      // ligt grey but visible
      borderBottom: "2px solid #e0e0e0",
      borderLeft: "2px solid #e0e0e0",
      borderRight: "2px solid #e0e0e0",
    },
  },
  rows: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
    },
  },
  headRow: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
    },
  },
};
