import { useState, useEffect } from 'react'
import API from "../../api/api";
const useGroupesMachine = () => {

    const [groupes, setGroupes] = useState({})
    const [formOptions, setFormOptions] = useState([])
    const [loading, setLoading] = useState(false)

     function loadGroupes () {
            API.groupeMachine.get_groupes_machines().then((response) => {
                setGroupes(response.results)
                console.log(response.results)
                setLoading(false)
                // append options for form
                let options = []
                response.results.map((groupe) => {
                    options.push({value: groupe.id, label: groupe.nom_groupe_machine})
                })
                setFormOptions(options)

        })
    }
    // async useEffect
    useEffect(() =>  {
        loadGroupes()
    }, [])


    return {
        groupes,
        formOptions,
        loading
    }
}

export default useGroupesMachine