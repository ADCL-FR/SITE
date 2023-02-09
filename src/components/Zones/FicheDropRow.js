import Droppable from "../DND/Droppable";
import { useState } from "react";

export default function FicheDropRow({
  fiche,
  onDeleteFiche = () => {},
  isPlanned = false,
  style = {},
}) {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <Droppable
      style={{ backgroundColor: isDragging ? "#A7A7A7" : "" }}
      item={fiche}
      draggable
      type="fiche"
      isDragging={(val) => setIsDragging(val)}
    >
      <div style={style}>
        {fiche.description}
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
