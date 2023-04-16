
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, {useEffect, useMemo, useState} from "react";
import { useForm } from "react-hook-form";
import Button from "../../Elements/Button";
import { useFicheModele } from "../../../hooks/modeles/useFicheModele";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'


import API from "../../../api/api";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function CopieToForm({ ficheId }) {
    const { copyToAffaire } =
        useFicheModele();

    const [searchedNum, setSearchedNum] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const loadOptions = async (inputValue) => {
        return new Promise(async (resolve) =>  {
            const options = await API.affaire.search_numero_affaire(inputValue);
            console.log("options",options);
            const filteredOptions = options.results.map((option) => ({
                name: option.num_affaire,
                value: option.id,
            }));
            resolve(filteredOptions);
        });
    };


    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields, touchedFields },
    } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        copyToAffaire(ficheId, searchedNum).then(
            (response) => {
                setSuccess(true);
                setMessage("Fiche copiée avec succès");
                setShowAlert(true);
            }
        );
    };
    useEffect(() => {

    }, [ficheId]);
    const widths = {
        1: "lg:w-1/12",
        2: "lg:w-2/12",
        3: "lg:w-3/12",
        4: "lg:w-4/12",
        5: "lg:w-5/12",
        6: "lg:w-6/12",
        7: "lg:w-7/12",
        8: "lg:w-8/12",
        9: "lg:w-9/12",
        10: "lg:w-10/12",
        11: "lg:w-11/12",
        12: "lg:w-12/12",
    };
    return (
        <>
            <div className="flex h-full min-h-330-px flex-col bg-white w-full shadow-lg rounded-lg z-1" style={{ zIndex: 1, overflow: "visible"}}>
                <div className="px-4 py-5 flex-auto" style={{overflow: "visible"}}>
                    {/*<form onSubmit={handleSubmit((data) => {update ? onCreateFiche({...data, affaire: fiche.affaire}) : onUpdateFiche({...data, id: fiche.id})})}>*/}
                    <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
                        <div className="container mx-auto px-4" style={{overflow: "visible"}}>
                            <div style={{overflow: "visible"}}>
                                <h4 className="text-2xl font-semibold mt-4 mb-6">
                                    Copier le modèle.
                                </h4>
                                <div className="flex flex-wrap -mx-4 " style={{overflow: "visible"}}>
                                    <div className={"px-4 pb-2  h-full w-full " + widths[6]} style={{overflow: "visible"}}>
                                        <label
                                            className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1 z-9999"
                                            id="titre"
                                        >
                                            N° Affaire
                                        </label>
                                        <div className="z-10" style={{overflow: "visible"}}>
                                            <SelectSearch
                                                search={true}
                                                name="affaire"
                                                autoFocus={true}
                                                getOptions={loadOptions}
                                                debounce={200}
                                                placeholder="Choisir affaire"
                                                onChange={(value) => setSearchedNum(value)}
                                                value={searchedNum}
                                                onFocus={() => setSearchedNum(null)}

                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type={"submit"}
                                {...{
                                    children: "Copier la fiche",
                                    size: "sm",
                                    color: "emerald",
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar
                open={showAlert}
                autoHideDuration={4000}
                message=""
                onClose={() => setShowAlert(false)}
            >
                <Alert
                    onClose={() => setShowAlert(false)}
                    severity={success ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}
