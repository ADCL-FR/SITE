// React
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// components
import Page from "../Page";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "../../components/Elements/Button";
import Dialog from "@mui/material/Dialog";
import FicheForm from "../../components/Form/fiche/FicheForm";
import EtapeForm from "../../components/Form/etape/EtapeForm";
import Input from "../../components/Elements/Input";

// sections
// ----------------------------------------------------------------------

import API from "../../api/api";
import PageHeader from "../../components/Headers/PageHeader";

// table
import DataTable from "react-data-table-component";
import {useEtape} from "../../hooks/etape/useEtape";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

const ExpandedEtape = ({ data }) => (
  <div style={syle_expanded_container}>
    <Input disabled type={"textarea"} value={data.description} />
  </div>
);

const syle_expanded_container = {
  width: "100%",
};
export default function FicheDetail() {
  let { id } = useParams();
  const [etapes, setEtapes] = useState([]);
  const [infos, setInfos] = useState({});

  //form etape
  const [showModal, setShowModal] = useState(false);
  const [showModalFiche, setShowModalFiche] = useState(false);
  const [showModalEtapeUpdate, setShowModalEtapeUpdate] = useState({
    show: false,
    data: {},
  });
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const {deleteEtapes} = useEtape()

  // selected rows
  const handleRowSelected = React.useCallback((state) => {
    const ids = state.selectedRows.map((machine) => machine.id);
    setSelectedRows(ids);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (window.confirm(`Etes vous sur de vouloir supprimer ces étapes ?`)) {
        deleteEtapes(selectedRows);
        setToggleCleared(!toggleCleared);
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

  // table
  const [loading, setloading] = useState(false);

  //Alerte
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const columns = [
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
            onClick={() => setShowModalEtapeUpdate({ show: true, data: row })}
            style={{ all: "unset" }}
          >
            <i className="fas fa-edit" style={{ color: "orange" }}></i>
          </button>
        </div>
      ),
    },
  ];

  // alert fiche
  const handleFicheSubmitResponse = async (succes, message) => {
    if (succes) {
      setMessage("Action réalisée avec succès");
      setSuccess(true);
      setOpen(true);
      setShowModalFiche(false);
      getEtapes(id);
    } else {
      setMessage("Erreur lors de l'action");
      setSuccess(false);
      setOpen(true);
    }
  };

  //alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function actions() {
    return (
      <div>
        <Button color="orange" onClick={() => setShowModalFiche(true)}>
          éditer fiche
        </Button>
        <Button onClick={() => setShowModal(true)}>+ étape</Button>
      </div>
    );
  }

  const getEtapes = async () => {
    API.fiche.get_fiche_etapes(id).then((response) => {
      setEtapes(response.etapes);
      response.etapes = [];
      setInfos(response);
    });
  };

  useEffect(() => {
    setloading(true);
    getEtapes();
    setloading(false);
  }, [id, toggleCleared]);

  return (
    <Page title="Détail Fiche" className="flex flex-col h-full bg-blueGray-100">
      <PageHeader title={`Affaire ${infos.num_affaire}`} />
      <div className="md:px-10 mb-20" style={{ marginTop: "-8rem" }}>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          message=""
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
        <DataTable
          title={`Étapes de ${infos.titre}`}
          columns={columns}
          data={etapes}
          progressPending={loading}
          expandableRows
          expandableRowsComponent={ExpandedEtape}
          expandableRowExpanded={() => true}
          expandOnRowClicked
          selectableRows={true}
          dense
          highlightOnHover
          pointerOnHover
          actions={actions()}
          contextActions={contextActions}
          onSelectedRowsChange={handleRowSelected}
          clearSelectedRows={toggleCleared}
        />

        <Dialog
          open={showModal}
          onClose={() => {
            setShowModal(false);
            getEtapes();
          }}
        >
          <EtapeForm update={false} nbEtapes={etapes.length} ficheId={id} />
        </Dialog>
        <Dialog
          open={showModalEtapeUpdate.show}
          onClose={() => {
            setShowModalEtapeUpdate({ show: false, data: {} });
            getEtapes();
          }}
        >
          <EtapeForm
            update={true}
            ficheId={showModalEtapeUpdate.data?.id}
            etapeData={showModalEtapeUpdate.data}
          />
        </Dialog>
        <Dialog
          open={showModalFiche}
          onClose={() => {
            setShowModalFiche(false);
            getEtapes();
          }}
        >
          <FicheForm
            ficheData={infos}
            update={true}
            onUpdated={handleFicheSubmitResponse}
            onCreated={handleFicheSubmitResponse}
          />
        </Dialog>
      </div>
    </Page>
  );
}
