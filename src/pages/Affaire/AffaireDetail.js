import React, { useEffect, useState } from "react";

//components
import FichesTable from "../../components/Table/FichesTable";
import PageHeader from "../../components/Headers/PageHeader";
import Page from "../Page";

//alert
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";

import API from "../../api/api";
import FicheForm from "../../components/Form/fiche/FicheForm";

export default function AffaireDetail() {
  let { id } = useParams();

  const [affaire, setAffaire] = useState([]);

  function fetch_affaire() {
    API.affaire.get_affaire_detail(id).then((affaire) => {
      setAffaire(affaire);
    });
  }
  //Alerte
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    fetch_affaire();
  }, []);

  return (
    <Page
      title={`${affaire.num_affaire}`}
      className="flex flex-col h-full bg-blueGray-100"
    >
      <PageHeader title={`Affaire ${affaire.num_affaire}`} />
      <div className="md:px-10 mb-20" style={{ marginTop: "-8rem" }}>
        <FichesTable
          affaire={affaire}
          title={"Liste des fiches :"}
          detail={true}
        />
        {/*<Table head={tableAffaireHeaders} title={tableAffaireTitle} body={affaires} RowComponent={AffaireRow}/>*/}
      </div>
    </Page>
  );
}
