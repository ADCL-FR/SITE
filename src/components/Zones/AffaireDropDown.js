import { useState } from "react";
import FicheDropRow from "./FicheDropRow";
export default function AffaireDropDown({
  extended,
  affaire,
  isZone = false,
  onDeleteFiche = () => {},
}) {
  const [isExtended, setIsExtended] = useState(extended);
  const toggleExtended = () => {
    setIsExtended(!isExtended);
  };
  return (
    <div style={row_style}>
      <div style={header_style} onClick={() => toggleExtended()}>
        <p>{affaire.raison}</p>
        {isExtended ? (
          <i class="fas fa-duotone fa-chevron-down"></i>
        ) : (
          <i class="fas fa-duotone fa-chevron-right"></i>
        )}

        {/* <p>{affaire.charge_affaire}</p> */}
      </div>

      {isExtended && (
        <div style={list_style}>
          {affaire.fiches.map((fiche) => {
            return (
              <FicheDropRow
                fiche={fiche}
                onDeleteFiche={(item) => onDeleteFiche(item)}
                isPlanned={isZone}
                style={{
                  with: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              />
            );
          })}
        </div>
      )}
      {/* affaire.fiches.map((fiche) => {
          return (
            <FicheDropRow
              fiche={fiche}
              onDeleteFiche={(item) => console.log(item)}
              isPlanned={false}
            />
          );
        }) */}
    </div>
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
  flexDirection: "column",

  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "3px",
  paddingLeft: "10px",
  paddingRight: "10px",
  borderBottom: "0.1px dashed #000000",
};
