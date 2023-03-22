import Droppable from "../DND/Droppable";
import { useState } from "react";

export default function FicheDropRow({
  fiche,
  onDeleteFiche = () => {},
  isPlanned = false,
  extended = true,
  style = {},
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isExtended, setIsExtended] = useState(extended);
  const toggleExtended = () => {
    setIsExtended(!isExtended);
  };
  return (
    <Droppable
      style={{ backgroundColor: isDragging ? "#A7A7A7" : "" }}
      item={fiche}
      draggable
      type="fiche"
      isDragging={(val) => setIsDragging(val)}
    >
      <div style={row_style}>
        <div style={header_style} onClick={() => toggleExtended()}>
          <p>Fiche : {fiche.titre}</p>
          {isExtended ? (
            <i className="fas fa-duotone fa-chevron-down"></i>
          ) : (
            <i className="fas fa-duotone fa-chevron-right"></i>
          )}

          {/* <p>{affaire.charge_affaire}</p> */}
        </div>

        {isExtended && (
          <div style={list_style}>
            {fiche.etapes.map((etape, key) => {
              return (
                <Droppable
                  style={{ backgroundColor: isDragging ? "#A7A7A7" : "" }}
                  item={etape}
                  draggable
                  type="etape"
                  isDragging={(val) => setIsDragging(val)}
                >
                  {etape.num_etape}
                </Droppable>
              );
            })}
          </div>
        )}

        {isPlanned && (
          <button onClick={() => onDeleteFiche(fiche)}>
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
}
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
  borderBottom: "0.1px dashed #000000",
};
