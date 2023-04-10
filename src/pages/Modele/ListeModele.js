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

export default function ListeModele() {
  let { id } = useParams();

  const [affaire, setAffaire] = useState([]);

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

  useEffect(() => {}, []);

  return (
    <Page title={"Modele"} className="flex flex-col h-full bg-blueGray-100">
      <PageHeader title={"Gestion des modèles"} />
      <div className="md:px-10 mb-20" style={{ marginTop: "-8rem" }}>
        <h1>Liste des modèles</h1>
      </div>
    </Page>
  );
}
