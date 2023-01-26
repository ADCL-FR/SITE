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
export const ficheForm = {
    button: { children: "Ajouter la fiche", size: "sm", color: "lightBlue" },
    forms: [
        {
            title: "Informations générales",
            inputs: [
                {
                    label: "N° de fiche",
                    width: 6,
                    input: {
                        id: "numero_de_fiche",
                        placeholder: "num_fiche",
                        type: "text",
                        defaultValue: "",
                        maxLength: 200,
                        required: true,
                    },
                },
                {
                    label: "Nom de la pièce",
                    width: 6,
                    select: {
                        id: "nom_de_la_pièce",
                        label: "nom_de_la_piece",
                        defaultValue: "",
                    }
                },
                {
                    label: "Matière",
                    width: 6,
                    input: {
                        id: "matiere",
                        placeholder: "Matière",
                        type: "text",
                        defaultValue: "",
                        maxLength: 200,
                    },
                },
                {
                    label: "Plan",
                    width: 6,
                    input: {
                        id: "Plan",
                        placeholder: "Plan",
                        type: "text",
                        defaultValue: "",
                        maxLength: 1000,
                    },
                },
                {
                    label: "Repère",
                    width: 6,
                    input: {
                        placeholder: "Repere",
                        id: "repere",
                        type: "textarea",
                        defaultValue: "",
                    },
                },
                {
                    label: "Quantité",
                    width: 6,
                    input: {
                        id: "quantite",
                        type: "number"
                    }
                },
                {
                    label: "N° d'étape",
                    width: 6,
                    input: {
                        id: "num_etape",
                        type: "number"
                    }
                },
                {
                    label: "Machine",
                    width: 6,
                    select: {
                        id: "machine",
                        options: [ /*Les options sont à chargées ? ou options de bases ?*/
                            { value: "", label: "None" },
                            { value: "Tour12/44", label: "Tour 12/44" },
                            { value: "Aléseuse", label: "Aléseuse" },
                            { value: "Fraiseuse", label: "Fraiseuse" },
                            { value: "Ajustage", label: "Ajsutage" },
                            { value: "Démontage", label: "Démontage" },
                            { value: "Tour numérique", label: "Tour numérique" },
                        ],
                    }
                },
                {
                    label: "Action",
                    width: 12,
                    input: {
                        placeholder: "Description",
                        id: "description",
                        type: "textarea",
                        defaultValue: "",
                    },
                        
                },
                {
                    label: "Temps",
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
                    label: "Fourniture",
                    width: 6,
                    select: {
                        id: "fourniture",
                        options: [ /*Les options sont à chargées ? ou options de bases ?*/
                            { value: "", label: "None" },
                            { value: "EPI", label: "EPI" },
                            { value: "Consommable", label: "Consommable" },
                        ],
                    },
                },
                
            ],
        },
    ],
};
