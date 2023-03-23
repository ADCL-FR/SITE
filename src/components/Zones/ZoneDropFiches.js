// React
import React, { useEffect, useState } from "react";

// drap and drop
import DropZone from "../DND/DropZone";
import AffaireDropDown from "./AffaireDropDown";
export default function ZoneDropAffaires({
  id,
  accept,
  children,
  affaires_data,
  title,
  style,
  onDrop,
  onDeleteAffectation,
  isZone = false,
  week,
}) {
  const [isOver, setIsOver] = useState(false);
  const [affaires, setAffaires] = useState([]);

  const affaire_exist = (affaire_id) => {
    return affaires.some((affaire) => affaire.id === affaire_id);
  };

  const fiche_exist = (affaire_id, fiche_id) => {
    const affaire = affaires.find((affaire) => affaire.id === affaire_id);
    return affaire.fiches.some((fiche) => fiche.id === fiche_id);
  };

  // TODO implement API call to get affaires / handle affaires state
  const handle_fiche_drop = ({ affaire, fiche }) => {
    // check if affaire exist in this zone
    if (affaire_exist(affaire.id)) {
      // if affaire exist, check if fiche exist in this affaire if not add it to affaire
      const new_affaires = affaires.map((affaire_state) => {
        if (affaire_state.id === affaire.id) {
          if (!fiche_exist(affaire.id, fiche.id)) {
            // call onDrop function to update etape
            fiche.etapes.forEach((etape) => {
              onDrop(etape.id, etape?.affectation_id);
            });
            return {
              ...affaire_state,
              fiches: [...affaire_state.fiches, fiche],
            };
          } else {
            // if fiche exist, add the etapes to the fiche wich are not already in the fiche
            const new_fiches = affaire_state.fiches.map((fiche_state) => {
              if (fiche_state.id === fiche.id) {
                const new_etapes = fiche.etapes.filter((etape) => {
                  return !fiche_state.etapes.some(
                    (etape_state) => etape_state.id === etape.id
                  );
                });
                new_etapes.forEach((etape) => {
                  // call onDrop function to update etape
                  onDrop(etape.id, etape?.affectation_id);
                });
                return {
                  ...fiche_state,
                  etapes: [...fiche_state.etapes, ...new_etapes],
                };
              } else {
                return fiche_state;
              }
            });
            return {
              ...affaire_state,
              fiches: new_fiches,
            };
          }
        } else {
          return affaire_state;
        }
      });
      setAffaires(new_affaires);
    } else {
      // if affaire not exist, create it and add fiche and etapes
      // call onDrop function to update etape
      fiche.etapes.forEach((etape) => {
        onDrop(etape.id, etape?.affectation_id);
      });
      const new_affaire = {
        id: affaire.id,
        titre: affaire.num_affaire,
        fiches: [fiche],
      };
      setAffaires([...affaires, new_affaire]);
    }
  };

  const handle_etape_drop = ({ affaire, etape }) => {
    // check if affaire exist in this zone
    onDrop(etape.id, etape?.affectation_id);

    if (affaire_exist(affaire.id)) {
      // if affaire exist, check if fiche exist in this affaire if not add it to affaire
      const current_fiche = affaire.fiches.find(
        (fiche) => fiche.id === etape.fiche
      );
      const new_affaires = affaires.map((affaire_state) => {
        if (affaire_state.id === affaire.id) {
          if (!fiche_exist(affaire.id, etape.fiche)) {
            const new_etape = {
              ...etape,
              fiche: current_fiche.id,
            };
            const new_fiche = {
              ...current_fiche,
              etapes: [new_etape],
            };
            return {
              ...affaire_state,
              fiches: [...affaire_state.fiches, new_fiche],
            };
          } else {
            // if fiche exist, add the etapes to the fiche wich are not already in the fiche
            const new_fiches = affaire_state.fiches.map((fiche_state) => {
              if (fiche_state.id === etape.fiche) {
                const new_etapes = fiche_state.etapes.filter((etape_state) => {
                  return etape_state.id !== etape.id;
                });
                return {
                  ...fiche_state,
                  etapes: [...new_etapes, etape],
                };
              } else {
                return fiche_state;
              }
            });
            return {
              ...affaire_state,
              fiches: new_fiches,
            };
          }
        } else {
          return affaire_state;
        }
      });
      setAffaires(new_affaires);
    } else {
      // if affaire not exist, create it and add fiche and etapes with only this etape
      const current_fiche = affaire.fiches.find(
        (fiche) => fiche.id === etape.fiche
      );
      const new_fiche = {
        ...current_fiche,
        etapes: [etape],
      };
      const new_affaire = {
        id: affaire.id,
        num_affaire: affaire.num_affaire,
        fiches: [new_fiche],
      };
      setAffaires([...affaires, new_affaire]);
    }
  };

  useEffect(() => {
    setAffaires(affaires_data);
  }, [affaires_data]);

  const getBackgroundColor = () => {
    if (isOver) {
      return "#ECECEC";
    } else {
      return "rgb(246, 248, 250)";
    }
  };

  const handle_drop = ({ type, parent, item }) => {
    console.log("handle_drop", type, parent, item);
    if (type === "fiche") {
      handle_fiche_drop({ affaire: parent, fiche: item });
    } else if (type === "etape") {
      handle_etape_drop({ affaire: parent, etape: item });
    }
  };
  return (
    <DropZone
      id={id}
      accept={accept}
      style={{
        ...style,
        backgroundColor: getBackgroundColor(),
        overflow: "auto",
      }}
      isOver={(e) => setIsOver(e)}
      onDrop={(e) => handle_drop(e)}
    >
      <div style={header_style}>
        <p style={title_style}>{title}</p>
      </div>

      {isZone && (
        <div style={children_style}>
          {console.log("affaires", affaires)}
          {affaires?.map((affaire, key) => {
            return (
              affaire?.fiches.length > 0 && (
                <AffaireDropDown
                  key={key}
                  extended={true}
                  affaire={affaire}
                  onDeleteAffectation={(id) => onDeleteAffectation(id)}
                  isZone={true}
                />
              )
            );
          })}

          {children}
        </div>
      )}
      {!isZone && (
        <div style={children_style}>
          {affaires?.map((affaire, key) => {
            return (
              affaire.fiches.length > 0 && (
                <AffaireDropDown
                  key={key}
                  extended={true}
                  affaire={affaire}
                  onDeleteAffectation={(id) => onDeleteAffectation(id)}
                  isZone={false}
                />
              )
            );
          })}
          {children}
        </div>
      )}
    </DropZone>
  );
}
const header_style = {
  display: "flex",
  padding: "8px 16px 4px",
};
const title_style = {
  fontSize: "16px",
  fontWeight: "600",
  overflow: "hidden",
};

const children_style = {
  "overflow-y": "auto",
  padding: "8px",
};
