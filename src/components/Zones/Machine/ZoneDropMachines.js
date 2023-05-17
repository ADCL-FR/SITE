// React
import React, {useEffect, useState} from "react";

// drap and drop
import DropZone from "../../DND/DropZone";

export default function ZoneDropMachines({
    id,
    isZone = false,
    accept,
    children,
    style,
    title,
    week,
                                         }) {
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
            console.log("handle_fiche_drop");
        } else if (type === "etape") {
            console.log("handle_etape_drop");
        }
    };
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
    minWidth: "100px",
    padding: "8px",
};