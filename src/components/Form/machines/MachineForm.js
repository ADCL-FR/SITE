import Input from "../../Elements/Input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Elements/Button";
import useMachine from "../../../hooks/machine/useMachine";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function MachineForm({
    machineId,
    update,
}) {

    const [showAlert, setShowAlert] = useState(false);

    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const { create_machine, delete_machine, update_machine, get_machine, machine } = useMachine();

    function dirtyValues(touchedFields, allValues) {
        // If *any* item in an array was modified, the entire array must be submitted, because there's no way to indicate
        // "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
        if (touchedFields === true || Array.isArray(dirtyFields)) return allValues;
        // Here, we have an object
        return Object.fromEntries(
            Object.keys(touchedFields).map((key) => [
                key,
                dirtyValues(touchedFields[key], allValues[key]),
            ])
        );
    }
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields, touchedFields },
    } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        if (update) {
            update_machine(machineId, dirtyValues(touchedFields, data)).then((response) => {
                setMessage("Machine mise à jour avec succès");
                setSuccess(true);
                setShowAlert(true);
            })
            
        } else {
            create_machine({nom_machine: data.nom_machine, description: data.description, fonctionnelle: data.fonctionnelle}).then((response) => {
                setMessage("Machine créée avec succès");
                setSuccess(true);
                setShowAlert(true);
            })
        }
    };

    useEffect(() => {
        if (update) {
            get_machine(machineId)
        }
        reset();
    }, []);
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
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg">
            <div className="px-4 py-5 flex-auto">
                {/*<form onSubmit={handleSubmit((data) => {update ? onCreateFiche({...data, affaire: fiche.affaire}) : onUpdateFiche({...data, id: fiche.id})})}>*/}
                <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
                    <div className="container mx-auto px-4">
                        <div>
                            <h4 className="text-2xl font-semibold mt-4 mb-6">
                                {update ? "Mise à jour machine" : "Création machine"}
                            </h4>
                            <div className="flex flex-wrap -mx-4">
                                
                                
                                <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                                    <label
                                        className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                                        id="nom_machine"
                                        >
                                        Nom Machine
                                    </label>
                                    <Input
                                        type="text"
                                        required
                                        {...register("nom_machine")}
                                        defaultValue={machine?.nom_machine}
                                        placeholder="Tour"
                                    />
                                </div>
                                
                                <div className={"px-4 pb-2 relative w-full " + widths[12]}>
                                    <label
                                        className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                                        id="description"
                                        >
                                        Description
                                    </label>
                                    <Input
                                        
                                        type="textarea"
                                        {...register("description")}
                                        defaultValue={machine?.description}
                                        placeholder={"Description fiche"}
                                    />
                                </div>

                                <div
                                    className="flex items-center mb-2 ml-1 "
                                    style={{ gap: "15px" }}
                                    >
                                    
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                {...register("fonctionnelle")}
                                                type="checkbox"
                                                defaultChecked={update ? machine.fonctionnelle : true}
                                                className="mr-3"
                                            />
                                            Machine fonctionnelle ?
                                        </label>
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type={"submit"}
                            {...{
                            children: update ? "Modifier la machine" : "Créer la machine",
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
