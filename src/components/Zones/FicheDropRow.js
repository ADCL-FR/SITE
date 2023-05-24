import Droppable from "../DND/Droppable";
import { useState } from "react";

export default function FicheDropRow({
    key,
  fiche,
    affaire,
  onDeleteAffectation = () => {},
  isPlanned = false,
  extended = true,
  isZone = false,
 isZoneMachine = false,
  style = {},
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isExtended, setIsExtended] = useState(extended);
  const toggleExtended = () => {
    setIsExtended(!isExtended);
  };
  return (
      <Droppable
          item={{ type: "fiche", item: fiche, parent: affaire }}
          draggable
          type="fiche"
          key={key}
      >
        <div style={fiche_style} className="" >
          <div className="flex flex-row justify-between cursor-grab w-full items-center gap-4" >
            <p>Fiche : {fiche.titre}</p>
            {isExtended ? (
                <i className="fas fa-duotone fa-chevron-down" onClick={() => setIsExtended(!isExtended)}></i>
            ) : (
                <i className="fas fa-duotone fa-chevron-right" onClick={() => setIsExtended(!isExtended)}></i>
            )}
          </div>


          {/* <p>{affaire.charge_affaire}</p> */}
          <div style={list_etape_style}>
            {isExtended &&
                fiche.etapes.map((etape, key) => {
                  return (
                      <Droppable
                          //style={{ backgroundColor: isDragging ? "#A7A7A7" : "" }}
                          item={{ type: "etape", item: etape, parent: affaire }}
                          draggable
                          type="etape"
                          key={key}
                      >
                        <div style={etape_style}>
                          <div>
                            n°{etape.num_etape} - {etape.temps}(h) {isZoneMachine && "- " + etape.machine.nom_machine}
                          </div>

                          {/* delete button */}
                          {isZone && (
                              <button
                                  onClick={() =>
                                      onDeleteAffectation(etape.affectation_id)
                                  }
                              >
                                {" "}
                                <i
                                    className="fas fa-solid fa-trash"
                                    style={{ color: "#ff9999" }}
                                ></i>
                              </button>
                          )}
                        </div>
                      </Droppable>
                  );
                })}
          </div>
        </div>

      </Droppable>
  );
}

const fiche_style = {
  display: "flex",
  padding: "4px",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  border: "1px solid rgb(216, 222, 228)",
  borderRadius: "6px",
  // light grey bg
    backgroundColor: "rgb(247, 250, 252)",

};

const list_etape_style = {
  with: "100%",
    display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
  gap: "2px",
  transform: "translate(0, 0)"
};
const etape_style = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "4px",
  border: "1px solid rgb(216, 222, 228)",
  borderRadius: "6px",
  backgroundColor: "white",
};

const header_style = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const list_style = {
  with: "100%",
  display: "flex",
  paddingLeft: "10px",
  flexDirection: "column",
  border: "0.1px dashed #000000",
  justifyContent: "space-between",
};

const row_style = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "3px",
  paddingLeft: "10px",
  paddingRight: "10px",
  border: "1px dashed #000000",
  borderBottom: "0.1px dashed #000000",
};
