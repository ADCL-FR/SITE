import { useState } from 'react'
import API from "../../api/api";
const useFiche = () => {

    const [fiche, setFiche] = useState({})

    const {loading, setLoading} = useState(false)

    async function loadFiche (id) {
        // setLoading(true)
    }

    const onCreateFiche = (data) => {
        return API.fiche.create_fiche(data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    }

    const onUpdateFiche = async (id, data) => {
        return API.fiche.update_fiche(id, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                throw error;
            });
    }


    const onDeleteFiche = (id) => {
        return API.fiche.delete_fiche(id)
    }

    async function deleteFiches (ids) {
        return API.fiche.delete_fiches(ids)
    }

    async function loadFichesAPlanifierMachine(){
        return API.fiche.get_fiches_a_planifier_machine()
    }

    return {
        fiche,
        setFiche,
        loading,
        loadFiche,
        onCreateFiche,
        onUpdateFiche,
        onDeleteFiche,
        deleteFiches,
        loadFichesAPlanifierMachine
    }
}

export default useFiche