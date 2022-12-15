export const loginForm = {
    title: "Se connecter",
    button: {
        fullWidth: true,
        color: "dark",
        children: "Se connecter",
    },
    forgotPassword: {
        label: "Mot de passe oublié ?",
        href: "/test",
    },
    createAccount: {
        label: "Mot de passe oublié ?",
        href: "#pablo",
    },
    checkbox: {
        label: "Se souvenir de moi",
    },
    username: {
        label: "Nom d'utilisateur",
        input: {
            placeholder: "Nom d'utilisateur",
            type: "text",
            required: true,
        }

    },
    password: {
        label: "Mot de passe",
        input: {
            placeholder: "Mot de passe",
            type: "password",
            required: true,
        }

    },
    inputs: [
        {
            label: "Nom d'utilisateur",
            input: {
                type: "text",
                placeholder: "Nom d'utilisateur",
            },
        },
        {
            label: "Mot de passe",
            input: {
                type: "password",
                placeholder: "Mot de passe",
            },
        },

    ],
};