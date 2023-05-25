// React
import React, {useEffect, useState} from "react";

// drap and drop
import DropZone from "../../DND/DropZone";
import AffaireDropDown from "../AffaireDropDown";
import API from "../../../api/api";

export default function ZoneDropMachines({
     id,
     isZone = false,
     accept,
     onDrop,
     children,
     style,
     title,
     affaires_data,
     onDeleteAffectation = () => {},
 }){
    const [affaires, setAffaires] = useState([]);
    const [isOver, setIsOver] = useState(false);

    const getBackgroundColor = () => {
        if (isOver) {
            return "#ECECEC";
        } else {
            return "rgb(246, 248, 250)";
        }
    };

    const handle_drop = ({type, parent, item}) => {
        console.log("handle_drop", type, parent, item);
        if (type === "fiche") {
            console.log("fiche", item);
            item.etapes.forEach((etape) => {
                onDrop(etape.id, etape.affectation_id);
            });
        } else if (type === "etape") {
            onDrop(item.id, item?.affectation_id)
        }
    };

    useEffect(() => {
        setAffaires(affaires_data);
    }, [affaires_data]);

    return (
        <DropZone
            id={id}
            accept={accept}
            style={{
                ...style,
                backgroundColor: getBackgroundColor(),
            }}
            isOver={(e) => setIsOver(e)}
            onDrop={(e) => handle_drop(e)}
        >
            <div style={header_style}>
                <p style={title_style}>{title}</p>
            </div>

            {isZone && (
                <div style={children_style}>
                    {affaires_data.map((affaire, key) => {
                        return <AffaireDropDown key={key} isZone={true} isZoneMachine={false} affaire={affaire} onDeleteAffectation={onDeleteAffectation}/>;
                    })}
                </div>
            )}

            {!isZone && (
                <div style={children_style}>
                    {affaires.map((affaire, key) => {
                        return <AffaireDropDown key={key} isZone={false} isZoneMachine={true} affaire={affaire}/>;
                    })}
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
    minWidth: "100px",
    padding: "8px",
};
