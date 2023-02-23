import { useState } from 'react'
import API from "../../api/api";
const useFiche = () => {

    const [fiche, setFiche] = useState({})

    const {loading, setLoading} = useState(false)

    async function loadFiche (id) {
        setFiche({titre: "heeh"})
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

    return {
        fiche,
        setFiche,
        loading,
        loadFiche,
        onCreateFiche,
        onUpdateFiche,
        onDeleteFiche,
    }
}

export default useFiche