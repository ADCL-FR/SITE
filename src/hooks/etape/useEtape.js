import { useState } from "react";
import API from "../../api/api";
export const useEtape = () => {
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
    return API.etape.update_etape(id, data);
  };

  const deleteEtape = async (id) => {
    // return API.etape.delete_etape(id); // non implémenté
  };

  const create_affectation_zone_etape = async (week, zoneId, etapeId) => {
    const nouvelle_affecation = {
      semaine_affectation: week,
      zone: zoneId,
      etape: etapeId,
    };
    return API.create_affectation(nouvelle_affecation);
  };

  const update_affectation_zone_etape = async (
    zoneId,
    etapeId,
    affectation_id
  ) => {
    const nouvelle_affecation = {
      zone: zoneId,
      etape: etapeId,
    };
    return API.update_affectation(affectation_id, nouvelle_affecation);
  };

  return {
    etape,
    setEtape,
    loading,
    loadEtape,
    createEtape,
    updateEtape,
    deleteEtape,
    create_affectation_zone_etape,
    update_affectation_zone_etape,
  };
};
