// React
import React, {useEffect, useState} from "react";

// drap and drop
import { useDrop } from 'react-dnd'
import Droppable from "../DND/Droppable";


export default function Zone  ({ id, accept, children,fiches, title, style, onDrop, onDeleteFiche}) {

    const [{ isOver, canDrop }, drop] = useDrop({
      accept: accept,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      }),
    });
    
  
    const getBackgroundColor = () => {
      if (isOver) {
        if (canDrop) {
          return "rgb(188,251,255)";
        } else if (!canDrop) {
          return "rgb(255,188,188)";
        }
      } else {
        return "";
      }
    };
    console.log(fiches)
    return (
      <div
        key ={id}
        ref={drop}
        style={{ ...style, backgroundColor: getBackgroundColor() }}
      >
        <p style={title_style}>{title}</p>
        <div style={children_style}>
          {fiches?.map(fiche => { return (
            <div>
              <Droppable  draggable item={fiche} type="fiche" >
                <button onClick={() => onDeleteFiche(fiche)}> Supprimer</button>
              </Droppable>
              
            </div>
            )
          
          })}
          {children}
        </div>
        
      </div>
    );
  };



const title_style = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  "border-bottom": "1px solid #000000"
  }

const children_style = {
  padding: "10px",
}
  