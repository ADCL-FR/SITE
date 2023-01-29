// React
import React, {useEffect, useState} from "react";

// drap and drop
import { useDrop } from 'react-dnd'


export default function Zone  ({ children, title, style, onDrop}) {

    const [{ isOver, canDrop }, drop] = useDrop({
      accept: "any",
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
  
    return (
      <div
        ref={drop}
        style={{ ...style, backgroundColor: getBackgroundColor() }}
      >
        <p style={title_style}>{title}</p>
        <div style={children_style}>
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
  