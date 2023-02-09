// React
import React, { useState } from "react";

// drap and drop

import DropZone from "../DND/DropZone";
import FicheDropRow from "./FicheDropRow";
import AffaireDropDown from "./AffaireDropDown";
export default function ZoneDropAffaires({
  id,
  accept,
  children,
  affaires,
  title,
  style,
  onDrop,
  onDeleteFiche,
  isZone = false,
}) {
  const [isOver, setIsOver] = useState(false);
  //const [isDragging, setIsDragging] = useState(false);
  const getBackgroundColor = () => {
    if (isOver) {
      return "#ECECEC";
    } else {
      return "";
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
      onDrop={(e) => onDrop(e)}
    >
      <p style={title_style}>{title}</p>
      {isZone && (
        <div style={children_style}>
          {affaires?.map((affaire) => {
            return (
              <AffaireDropDown
                extended={false}
                affaire={affaire}
                onDeleteFiche={(item) => onDeleteFiche(item)}
                isZone={true}
              />
            );
          })}
          {/* {affaires?.fiches?.map((fiche) => {
            return (
              <FicheDropRow
                fiche={fiche}
                onDeleteFiche={(item) => onDeleteFiche(item)}
                isPlanned={true}
              />
            );
          })} */}
          {children}
        </div>
      )}
      {!isZone && (
        <div style={children_style}>
          {affaires?.map((affaire) => {
            return (
              <AffaireDropDown
                extended={false}
                affaire={affaire}
                onDeleteFiche={(item) => onDeleteFiche(item)}
              />
            );
          })}
          {children}
        </div>
      )}
    </DropZone>
  );
}

const title_style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  "border-bottom": "1px solid #000000",
};

const children_style = {
  padding: "0px",
};
