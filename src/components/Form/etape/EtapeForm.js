import useEtape from "../../../hooks/etape/useEtape";
import Input from "../../Elements/Input";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../Elements/Button";
import { DEFAULT_MACHINE } from "../../../config";
import useMachine from "../../../hooks/machine/useMachine";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function EtapeForm({
  etapeData,
  nbEtapes = 0,
  update = false,
  ficheId,
}) {
  const { etape, createEtape, updateEtape, setEtape } = useEtape();

  const [showAlert, setShowAlert] = useState(false);

  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const { formOptions } = useMachine();

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
      updateEtape(etapeData.id, dirtyValues(touchedFields, data))
        .then((response) => {
          setSuccess(true);
          setMessage("Etape modifiée avec succès");
          setShowAlert(true);
        })
        .catch((error) => {
          setSuccess(false);
          setMessage("Erreur lors de la modification de l'etape : ");
          setShowAlert(true);
        });
    } else {
      createEtape({ fiche: ficheId, ...data }).then((response) => {
        setSuccess(true);
        setMessage("Etape créée avec succès");
        setShowAlert(true);
      });
    }
  };

  useEffect(() => {
    setEtape(etapeData);
    reset();
    //reset({description: ficheData.description})
    // setValue([
    //     {description: ficheData.description}

    // ])
  }, [etapeData]);
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
                  {update ? "Mise à étape" : "Création étape"}
                </h4>
                <div className="flex flex-wrap -mx-4">
                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="num_etape"
                    >
                      Numéro d'étape
                    </label>
                    <Input
                      type="number"
                      required
                      {...register("num_etape")}
                      defaultValue={update ? etape.num_etape : nbEtapes + 1}
                    />
                  </div>

                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="quantite"
                    >
                      Quantité
                    </label>
                    <Input
                      type="number"
                      {...register("quantite")}
                      defaultValue={update ? etape.quantite : 1}
                    />
                  </div>
                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="temps"
                    >
                      Temps nécessaire
                    </label>
                    <Input
                      type="number"
                      {...register("temps")}
                      defaultValue={update ? etape.temps : 1}
                    />
                  </div>
                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="rep"
                    >
                      REP
                    </label>
                    <Input
                      type="text"
                      {...register("rep")}
                      defaultValue={update ? etape.rep : ""}
                    />
                  </div>
                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="plan"
                    >
                      Plan
                    </label>
                    <Input
                      type="text"
                      {...register("plan")}
                      defaultValue={update ? etape.plan : ""}
                    />
                  </div>
                  <div className={"px-4 pb-2 relative w-full " + widths[6]}>
                    <label
                      className="block uppercase text-blueGray-700 text-xs font-bold mb-2 ml-1"
                      id="machine"
                    >
                      Machine
                    </label>
                    <select
                      value={null}
                      required
                      placeholder="Sélectionner une machine"
                      {...register("machine")}
                    >
                      <option value={""}>Sélectionner une machine</option>
                      {formOptions.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
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
                      defaultValue={etape?.description}
                      placeholder={"Description fiche"}
                    />
                  </div>

                  <div
                    className="flex items-center mb-2 ml-1 "
                    style={{ gap: "15px" }}
                  >
                    {update && (
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          {...register("terminee")}
                          type="checkbox"
                          defaultChecked={etape?.terminee}
                          className="mr-3"
                        />
                        Étape terminée ?
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type={"submit"}
                {...{
                  children: update ? "Modifier l'étape" : "Créer l'étape",
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
