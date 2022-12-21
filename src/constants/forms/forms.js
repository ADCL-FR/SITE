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
                        options: [ /*Les options sont à chargées ? ou options de bases ?*/
                            { value: "", label: "None" },
                            { value: "uid1", label: "Client 1" },
                            { value: "uid2", label: "Client 2" },
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
                        options: [
                            { value: "uid1", label: "Chargé d'affaire 1" },
                            { value: "uid2", label: "Chargé d'affaire 2" },
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