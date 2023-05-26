import { useState } from "react";
import FicheDropRow from "./FicheDropRow";

export default function AffaireDropDown({
  extended = true,
  affaire,
  isZone = false,
  isZoneMachine = false,
  onDeleteAffectation = () => {},
  salarieOptions = [],
}) {
  const [isExtendedAffaire, setIsExtendedAffaire] = useState(extended);
  const toggleExtendedAffaire = () => {
    setIsExtendedAffaire(!isExtendedAffaire);
  };


  return (
    <div style={row_style}>
      <div style={affaire_style} onClick={() => toggleExtendedAffaire()}>
        <a
          style={affaire_title_style}
          href={`/dashboard/affaire/${affaire.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <p> Affaire : {affaire.num_affaire}</p>
        </a>
        {isExtendedAffaire ? (
          <i className="fas fa-duotone fa-chevron-down"></i>
        ) : (
          <i className="fas fa-duotone fa-chevron-right"></i>
        )}

        {/* <p>{affaire.charge_affaire}</p> */}
      </div>

      {isExtendedAffaire && (
        <div style={list_style}>
          {affaire.fiches.map((fiche, key) => {
             return <FicheDropRow
                 affaire={affaire}
                 fiche={fiche}
                 isZone={isZone}
                 isZoneMachine={isZoneMachine}
                 onDeleteAffectation={onDeleteAffectation}
                 salarieOptions={salarieOptions}
             />
          })}
        </div>
      )}
    </div>
  );
}
const affaire_style = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
};

const affaire_title_style = {
  // link style blue on hover
  color: "#0056b3",
  textDecoration: "underline",
  backgroundColor: "transparent",
  cursor: "pointer",
};
const fiche_style = {
  display: "flex",
  padding: "4px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  border: "1px solid #0056b3x@",
  borderRadius: "6px",
};
const list_style = {
  transform: "translate(0, 0)",
  with: "100%",
  display: "flex",
  paddingLeft: "10px",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "5px",
};

const row_style = {
  width: "100%",
  "borderRadius": "6px",
  border: "1px solid rgb(216, 222, 228)",
  "boxShadow": "rgba(140, 149, 159, 0.15) 0px 3px 6px",
  "backgroundColor": "rgb(255, 255, 255)",
  padding: "10px",
  "marginBottom": "8px",
};
