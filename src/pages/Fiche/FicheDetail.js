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
//constants
import { etapeForm } from "../../constants/forms/forms";
// sections
// ----------------------------------------------------------------------

import API from "../../api/api";
import PageHeader from "../../components/Headers/PageHeader";

// table
import DataTable from "react-data-table-component";

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
];

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

  // table
  const [loading, setloading] = useState(false);

  //Alerte
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

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

  const getEtapes = async (ficheId) => {
    setloading(true);
    API.fiche.get_fiche_etapes(ficheId).then((response) => {
      setEtapes(response.etapes);
      response.etapes = [];
      setInfos(response);
      setloading(false);
    });
  };

  useEffect(() => {
    getEtapes(id);
  }, [id]);

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
        />

        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          {/* <FormCard
            {...etapeForm}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onSelect={handleSelectChange}
          /> */}
          <EtapeForm update={false} nbEtapes={etapes.length} ficheId={id} />
        </Dialog>
        <Dialog open={showModalFiche} onClose={() => setShowModalFiche(false)}>
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

const modal_style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
