import React from 'react';
import { useDrag } from "react-dnd";


export default function Droppable({ item, style, type}){
  const [{ isDragging }, dragRef] = useDrag({
    type: "any",
    item: item,
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
  })
  return (
      <div style={style} ref={dragRef}>
          heheh
          {isDragging && '🥰🤓🧐'}
          
      </div>
  )
};