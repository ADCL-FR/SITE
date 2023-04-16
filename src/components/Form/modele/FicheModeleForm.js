import useFiche from "../../../hooks/fiche/useFiche";
import Input from "../../Elements/Input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Elements/Button";
import { useFicheModele } from "../../../hooks/modeles/useFicheModele";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function FicheModeleForm({ ficheId, update = false }) {
  const { loadFicheModele, createFicheModele, updateFicheModele } =
    useFicheModele();
  const [fiche, setFiche] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

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
      updateFicheModele(ficheId, dirtyValues(touchedFields, data)).then(
        (response) => {
          setSuccess(true);
          setMessage("Fiche modifiée avec succès");
          setShowAlert(true);
        }
      );
    } else {
      createFicheModele(dirtyValues(touchedFields, data)).then((response) => {
        setSuccess(true);
        setMessage("Fiche modifiée avec succès");
        setShowAlert(true);
      });
    }
  };
  useEffect(() => {
    if (update) loadFicheModele(ficheId).then((response) => setFiche(response));
    reset();
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
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full shadow-lg rounded-lg">
        <div className="px-4 py-5 flex-auto">
          {/*<form onSubmit={handleSubmit((data) => {update ? onCreateFiche({...data, affaire: fiche.affaire}) : onUpdateFiche({...data, id: fiche.id})})}>*/}
          <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
            <div className="container mx-auto px-4">
              <div>
                <h4 className="text-2xl font-semibold mt-4 mb-6">
                  {update
                    ? "Mise à jour fiche modèle"
                    : "Création Fiche Modèle"}
                </h4>
                <div className="flex flex-wrap -mx-4">
                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="titre"
                    >
                      Titre
                    </label>
                    <Input
                      type="text"
                      {...register("titre")}
                      placeholder={"Titre fiche"}
                      defaultValue={fiche?.titre}
                      required
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
                      defaultValue={fiche?.description}
                      placeholder={"Description fiche"}
                      required
                    />
                  </div>

                  <div
                    className="flex items-center mb-2 ml-1 "
                    style={{ gap: "15px" }}
                  >
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        {...register("fourniture")}
                        type="checkbox"
                        defaultChecked={fiche?.fourniture}
                        className="mr-3"
                      />
                      Fournitures arrivées ?
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type={"submit"}
                {...{
                  children: update ? "Modifier la fiche" : "Créer la fiche",
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
