import axiosInstance from '../utils/axios';


class affaire {
    static nouvelle_affaire = async (affaire) => {
        const response = await axiosInstance.post(`/api/affaires`, {...affaire})
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }

    static get_affaires = async (page=1, perPage=10, ordering="-date_rendu") => {
        const response = await axiosInstance.get(`/api/affaires?page=${page}&per_page=${perPage}&ordering=${ordering}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
        return response;
    };

    static get_affaire_detail = async (affaireId) => {
        return await axiosInstance.get(`/api/affaires/${affaireId}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });

    }

    static get_affaire_et_fiches = async (affaireId) => {
        const response = await axiosInstance.get(`/api/affaires/${affaireId}/fiches`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }


}

class fiche {
   static get_fiche_etapes = async (ficheId) => {
       const response = await axiosInstance.get(`/api/fiches/etapes/${ficheId}`)
           .then((response) => {
               return response.data;
           })
           .catch((error) => {
               throw error;
           });
       return response;
   }

    // get fiche
    static get_fiche = async (id) => {
        return await axiosInstance.get(`/api/fiches/${id}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
   };
    // create fiche
    static create_fiche = async (fiche) => {
        return await axiosInstance.post(`/api/fiches`, {...fiche})
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });

    };
    // update fiche (patch)
    static update_fiche = async (id, fiche) => {
        return await axiosInstance.patch(`/api/fiches/${id}`, {...fiche})
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
    };

    // delete fiche
   static delete_fiche = async (ficheId) => {
       const response = await axiosInstance.delete(`/api/fiches/${ficheId}`)
           .then((response) => {
               return response.data;
           })
           .catch((error) => {
               throw error;
           });
       return response;
   }


}

class etape {
    static nouvelle_etape = async (etape) => {
        const response = await axiosInstance.post(`/api/etapes`, {...etape})
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }
}

class machine {
    static get_machines = async () => {
        const response = await axiosInstance.get(`/api/machines`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }
}
// list groupe Machines
class groupeMachine {
    static get_groupes_machines = async () => {
        const response = await axiosInstance.get(`/api/machines/groupes`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }
}
const recuperer_statuts = async () => {
    await axiosInstance.get(`/api/status`)
        .then((response) => {

            return response.data;
        })
        .catch((error) => {
            throw error;
        });
}

const recuperer_clients = async () => {
    const response = await axiosInstance.get(`/api/clients`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};

const recuperer_salaries = async () => {
    const response = await axiosInstance.get(`/api/salaries`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
};

const planning_zone = async (semaine) => {
    const response = await axiosInstance.get(`/api/planning/zone`, {params: {semaine: semaine}})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const get_zones = async () => {
    const response = await axiosInstance.get(`/api/zones`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const update_affectation = async (affectation) => {
    const response = await axiosInstance.put(`/api/affectations/${affectation.id}`, {...affectation})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const create_affectation = async (affectation) => {
    const response = await axiosInstance.post(`/api/affectations`, {...affectation})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const delete_affectation = async (affectationId) => {
    const response = await axiosInstance.delete(`/api/affectations/${affectationId}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const fiches_ajustage_a_planifier = async () => {
    const response = await axiosInstance.get(`/api/fiches/ajustage/a_planifier`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
    return response;
}

const API = {
    affaire,
    fiche,
    etape,
    machine,
    groupeMachine,
    recuperer_statuts,
    recuperer_clients,
    recuperer_salaries,
    planning_zone,
    get_zones,
    update_affectation,
    delete_affectation,
    fiches_ajustage_a_planifier,
    create_affectation
};

export default API;

