import React, {useEffect, useState} from "react";
import API from "../../../api/api";
import SelectSearch from "react-select-search";
import Button from "../../Elements/Button";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function CopyFromForm ({affaireId}){
    const [selectedModele, setSelectedModele] = useState(null);


    const [showAlert, setShowAlert] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    async function get_options(search) {
        return await API.ficheModele.get_options(search);
    }


    const handle_submit = (e) => {
        e.preventDefault();
        API.ficheModele.copy_fiche_modele(selectedModele, affaireId).then(
            (response) => {
                console.log("response", response);
                setSuccess(true);
                setMessage("Fiche copiée avec succès");
                setShowAlert(true);
                setSelectedModele(null)
            }
        ).catch((error) => {
            setSuccess(false);
            setMessage("Une erreur est survenue");
            setShowAlert(true);
        });
    }

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
            <div className=" flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg ">
                <div className="px-4 py-5 flex-auto">
                    <form onSubmit={( e) => handle_submit(e)} className="flex justify-between flex-col">
                        <div className="flex-grow mx-auto px-4">
                            <div>
                                <div className="flex flex-wrap -mx-4">
                                    <div className={"px-4 pb-2  h-full w-full " + widths[6]} >
                                        <label
                                            className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1 z-9999"
                                            id="modele"
                                        >
                                            Modèle
                                        </label>

                                        <SelectSearch
                                            getOptions={get_options}
                                            search={true}
                                            onChange={setSelectedModele}
                                            value={selectedModele}
                                            placeholder="Choisir modèle"
                                        />


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
    )
}