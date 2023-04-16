import { useState } from "react";
import API from "../../api/api";
export const useEtapeModele = () => {
  const [etapeModele, setEtapeModele] = useState({});

  const { loading, setLoading } = useState(false);

  async function loadEtape(id) {
    // return API.etape.get_etape(id).then((response) => {
  }

  const createEtapeModele = async (etape) => {
    return API.etapeModele.create_etape_modele(etape);
  };

  const updateEtapeModele = async (id, data) => {
    return API.etapeModele.update_etape_modele(id, data);
  };

  const deleteEtapeModele = async (id) => {
    return API.etapeModele.delete_etape_modele(id);
  };

  return {
    etapeModele,
    setEtapeModele,
    loading,
    loadEtape,
    createEtapeModele,
    updateEtapeModele,
    deleteEtapeModele,
  };
};
