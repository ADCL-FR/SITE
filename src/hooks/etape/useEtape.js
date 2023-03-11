import { useState } from "react";
import API from "../../api/api";
const useEtape = () => {
  const [etape, setEtape] = useState({});

  const { loading, setLoading } = useState(false);

  async function loadEtape(id) {
    // setLoading(true)
  }

  const createEtape = async (etape) => {
    API.etape
      .nouvelle_etape(etape)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  };

  const updateEtape = async (id, data) => {
    // API.etape.update_etape(id, data) non implémenté
  };

  const deleteEtape = async (id) => {
    // return API.etape.delete_etape(id); // non implémenté
  };

  return {
    etape,
    setEtape,
    loading,
    loadEtape,
    createEtape,
    updateEtape,
    deleteEtape,
  };
};

export default useFiche;
