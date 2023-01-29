import React, {useRef} from 'react';
import { useDrag, useDrop } from "react-dnd";
import { COLUMN_NAMES } from "../../constants/dragAndDrop/coloumns";


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