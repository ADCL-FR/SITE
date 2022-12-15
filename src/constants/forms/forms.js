export const affaireForm = {
    title: 'Ajouter une affaire',
    button: { children: "Ajouter l'affaire", size: "sm", color: "lightBlue" },
    forms: [
        {
            title: "Informations générales",
            inputs: [
                {
                    label: "Raison",
                    width: 2,
                    input: {
                        placeholder: "Raison",
                        type: "text",
                        defaultValue: "",
                    },
                },
                {
                    label: "Description",
                    width: 6,
                    input: {
                        placeholder: "Description",
                        type: "text",
                        defaultValue: "",
                    },
                },
            ],
        },
    ],
};