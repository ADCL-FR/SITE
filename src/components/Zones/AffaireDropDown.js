import { useEffect, useState } from "react";
import FicheDropRow from "./FicheDropRow";
import Droppable from "../DND/Droppable";

export default function AffaireDropDown({
  extended = true,
  affaire,
  isZone = false,
  onDeleteFiche = () => {},
}) {
  const [isExtendedAffaire, setIsExtendedAffaire] = useState(extended);
  const [isExtendedFiche, setIsExtendedFiche] = useState(extended);
  const toggleExtendedAffaire = () => {
    setIsExtendedAffaire(!isExtendedAffaire);
  };

  const toggleExtendedFiche = () => {
    setIsExtendedFiche(!isExtendedFiche);
  };

  useEffect(() => {
    console.log("AffaireDropDown");
  }, [affaire]);
  return (
    <div style={row_style}>
      <div style={header_style} onClick={() => toggleExtendedAffaire()}>
        <p>Affaire : {affaire.num_affaire}</p>
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
            return (
              <Droppable
                item={{ type: "fiche", item: fiche, parent: affaire }}
                draggable
                type="fiche"
                key={key}
              >
                <div style={header_style} onClick={() => toggleExtendedFiche()}>
                  <p>Fiche : {fiche.titre}</p>
                  {isExtendedFiche ? (
                    <i className="fas fa-duotone fa-chevron-down"></i>
                  ) : (
                    <i className="fas fa-duotone fa-chevron-right"></i>
                  )}

                  {/* <p>{affaire.charge_affaire}</p> */}
                </div>
                <div style={list_style}>
                  {isExtendedFiche &&
                    fiche.etapes.map((etape, key) => {
                      return (
                        <Droppable
                          //style={{ backgroundColor: isDragging ? "#A7A7A7" : "" }}
                          item={{ type: "etape", item: etape, parent: affaire }}
                          draggable
                          type="etape"
                          key={key}
                        >
                          {etape.num_etape}
                        </Droppable>
                      );
                    })}
                </div>
              </Droppable>
            );
            // return (
            //   <FicheDropRow
            //     key={key}
            //     fiche={fiche}
            //     onDeleteFiche={(item) => onDeleteFiche(item)}
            //     isPlanned={isZone}
            //     style={{
            //       with: "100%",
            //       display: "flex",
            //       flexDirection: "row",
            //       justifyContent: "space-between",
            //     }}
            //   />
            // );
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
