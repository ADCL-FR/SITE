export const affaireForm = {
    button: { children: "Ajouter l'affaire", size: "sm", color: "lightBlue" },
    forms: [
        {
            title: "Informations générales",
            inputs: [
                {
                    label: "Raison",
                    width: 6,
                    input: {
                        id: "raison",
                        placeholder: "Raison",
                        type: "text",
                        defaultValue: "",
                        maxLength: 200,
                        required: true,
                    },
                },
                {
                    label: "Client",
                    width: 6,
                    select: {
                        id: "client",
                        label: "Client",
                        defaultValue: "",
                        placeholder: "Sélectionner un client",
                        options: [ /*Les options sont à chargées ? ou options de bases ?*/

                        ],
                    }
                },
                {
                    label: "Reférence Document",
                    width: 6,
                    input: {
                        id: "ref_doc",
                        placeholder: "Reférence Document",
                        type: "text",
                        defaultValue: "",
                        maxLength: 200,
                    },
                },
                {
                    label: "Observation",
                    width: 6,
                    input: {
                        id: "observation",
                        placeholder: "Client",
                        type: "text",
                        defaultValue: "",
                        maxLength: 1000,
                    },
                },
                {
                    label: "Description",
                    width: 12,
                    input: {
                        placeholder: "Description",
                        id: "description",
                        type: "textarea",
                        defaultValue: "",
                    },
                },
                {
                    label: "Date de rendu",
                    width: 6,
                    input: {
                        id: "date_rendu",
                        type: "date"
                    }
                },
                {
                    label: "Date de clôture",
                    width: 6,
                    input: {
                        id: "date_cloture",
                        type: "date"
                    }
                },
                {
                    label: "Statut",
                    width: 6,
                    select: {
                        id: "statut",
                        options: [ /*Les options sont à chargées ? ou options de bases ?*/
                            { value: "", label: "None" },
                            { value: "en_cours", label: "En cours" },
                            { value: "Clôturé", label: "Clôturé" },
                        ],
                    }
                },
                {
                    label: "Etat",
                    width: 6,
                    select: {
                        id: "etat",
                        options: [ /*Les options sont à chargées ? ou options de bases ?*/
                            { value: "", label: "None" },
                            { value: "en_cours", label: "En cours" },
                            { value: "Clôturé", label: "Clôturé" },
                        ],
                    }
                },
                {
                    label: "Montant",
                    width: 6,
                    input: {

                        id: "montant",
                        placeholder: "Montant",
                        type: "number",
                        defaultValue: "",
                        required: true,
                    },
                },
                {
                    label: "Chargé d'affaire",
                    width: 6,
                    select: {
                        id: "charge_affaire",
                        placeholder: "Sélectionner un chargé d'affaire",
                        defaultValue: "",
                        options: [
                        ]
                    }
                },
                {
                    label: "Devis",
                    width: 6,
                    input: {
                        id: "devis",
                        type: "checkbox",
                    },
                },
            ],
        },
    ],
};

// {
//     "num_etape": 0,
//     "terminee": true,
//     "description": "string",
//     "ref_doc": "string",
//     "nom_piece": "string",
//     "matiere": "string",
//     "quantite": 0,
//     "temps": 0,
//     "date_cloture": "2023-02-11",
//     "fiche": 0
// }
export const etapeForm = {
    button: { children: "Ajouter l'étape", size: "sm", color: "lightBlue" },
    forms: [
        {
            title: "Ajouter une étape",
            inputs : [
                {
                    label: "Numéro d'étape",
                    width: 6,
                    input: {
                        id: "num_etape",
                        placeholder: "",
                        type: "number",
                        defaultValue: "",
                        maxLength: 200,
                        required: true,
                    },
                },
                {
                    label: "Description",
                    width: 12,
                    input: {
                        placeholder: "Description",
                        id: "description",
                        type: "textarea",
                        defaultValue: "",
                    },
                },
                {
                    label: "Quantité",
                    width: 6,
                    input: {
                        placeholder: "Quantité",
                        id: "quantite",
                        type: "number",
                        defaultValue: "",
                        required: true
                    },
                },
                {
                    label: "Temps (h)",
                    width: 6,
                    input: {
                        placeholder: "Temps nécessaire",
                        id: "temps",
                        type: "number",
                        defaultValue: "",
                        required: true
                    },
                },
                {
                    label: "Machine",
                    width: 6,
                    select: {
                        id: "machine",
                        label: "Machine",
                        defaultValue: "",
                        placeholder: "Sélectionner une machine",
                        options: [

                        ],
                    }
                },
            ]
        }
    ]
}