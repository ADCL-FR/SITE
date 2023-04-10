import React, { useEffect, useState } from "react";

//components
import Button from "../../components/Elements/Button";

import PageHeader from "../../components/Headers/PageHeader";
import Page from "../Page";
import DataTable from "react-data-table-component";

import { useFicheModele } from "../../hooks/modeles/useFicheModele";
//alert
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";

import API from "../../api/api";
import FicheModeleForm from "../../components/Form/modele/FicheModeleForm";

export default function ListeModele() {
  const columns_etapes = [
    {
      name: "Numéro",
      selector: (row) => row.num_etape,
      sortable: true,
    },
    {
      name: "Machine",
      selector: (row) => row.machine?.nom_machine || null,
      center: true,
    },
    {
      name: "REP",
      selector: (row) => row.rep,
      center: true,
    },
    {
      name: "Plan",
      selector: (row) => row.plan,
      center: true,
    },
    {
      name: "Quantité",
      selector: (row) => row.quantite,
      center: true,
    },
    {
      name: "Temps",
      selector: (row) => row.temps,
      center: true,
    },
    {
      name: "Terminée",
      selector: (row) => (row.terminee ? "Oui" : "Non"),
      center: true,
    },
    // edit button
    {
      name: "Editer",
      center: true,
      cell: (row) => (
        <div>
          <button
            onClick={() => console.log({ show: true, data: row })}
            style={{ all: "unset" }}
          >
            <i className="fas fa-edit" style={{ color: "orange" }}></i>
          </button>
        </div>
      ),
    },
  ];

  const columns_fiches = [
    {
      name: "Titre",
      selector: (row) => row.titre,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
      grow: 2,
      hide: "md",
    },
    {
      name: "Fournitures arrivées",
      selector: (row) => (row.fourniture ? "Oui" : "Non"),
      hide: "md",
    },
    {
      name: "Editer",
      right: true,
      cell: (row) => (
        <div>
          <button
            onClick={() => setOpenDialogUpdate({ show: true, data: row.id })}
            style={{ all: "unset" }}
          >
            <i className="fas fa-edit" style={{ color: "orange" }}></i>
          </button>
        </div>
      ),
    },
  ];

  const [selectedRow, setSelectedRow] = useState(null);
  const { fiches, loadFichesModele, deleteFicheModele } = useFicheModele();
  const [toggleCleared, setToggleCleared] = React.useState(false);
  //Alerte
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState({
    show: false,
    data: null,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function actions() {
    return (
      <div>
        <Button onClick={() => setOpenDialog(true)}>
          Ajouter un modèle de fiche
        </Button>
      </div>
    );
  }
  const handleRowSelected = React.useCallback((state) => {
    const ids = state.selectedRows.map((fihceModele) => fihceModele.id);
    setSelectedRow(ids[0]);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (window.confirm(`Etes vous sur de vouloir supprimer ces machines?`)) {
        setToggleCleared(!toggleCleared);
        deleteFicheModele(selectedRow);
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
  }, [selectedRow, toggleCleared]);

  useEffect(() => {
    loadFichesModele();
  }, [toggleCleared, openDialog, openDialogUpdate.show]);

  return (
    <Page title={"Modele"} className="flex flex-col h-full bg-blueGray-100">
      <PageHeader title={"Gestion des modèles"} />
      <div className="md:px-10 mb-20" style={{ marginTop: "-8rem" }}>
        <DataTable
          title="Liste des modèles"
          columns={columns_fiches}
          data={fiches}
          actions={actions()}
          striped
          selectableRows
          selectableRowsSingle
          onSelectedRowsChange={handleRowSelected}
          contextActions={contextActions}
        />
      </div>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <FicheModeleForm />
      </Dialog>
      <Dialog
        open={openDialogUpdate.show}
        onClose={() => {
          setOpenDialogUpdate(false);
        }}
      >
        <FicheModeleForm update={true} ficheId={openDialogUpdate.data} />
      </Dialog>
    </Page>
  );
}
