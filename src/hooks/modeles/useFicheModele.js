import { useState } from "react";
import API from "../../api/api";
export const useFicheModele = () => {
  const [fiches, setFiches] = useState([]);
  const [fiche, setFiche] = useState({});

  const { loading, setLoading } = useState(false);

  async function loadFicheModele(id) {
    return API.ficheModele.get_fiche_modele(id).then((response) => {
      setFiche(response);
      return response;
    });
  }

  const loadFichesModele = async (id) => {
    return API.ficheModele
      .get_fiches_modeles(id)
      .then((response) => {
        console.log("response", response);
        setFiches(response.results);
        return response.results;
      })
      .catch((error) => {
        throw error;
      });
  };

  const createFicheModele = async (data) => {
    return API.ficheModele
      .create_fiche_modele(data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };

  const updateFicheModele = async (id, data) => {
    return API.ficheModele
      .update_fiche_modele(id, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };

  const deleteFicheModele = (id) => {
    return API.ficheModele.delete_fiche_modele(id);
  };

  return {
    fiche,
    fiches,
    setFiches,
    loading,
    loadFichesModele,
    createFicheModele,
    updateFicheModele,
    deleteFicheModele,
    loadFicheModele,
  };
};
