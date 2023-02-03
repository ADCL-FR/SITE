import React from 'react';
import { useDrag } from "react-dnd";


export default function Droppable({children, item, style, type}){
  const [{ isDragging }, dragRef] = useDrag({
    type: "any",
    item: item,
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
  })
  return (
      <div style={style} ref={dragRef} key={item.id}>

          {item.description}
          {children}
          {isDragging && '🥰🤓🧐'}
          
      </div>
  )
};