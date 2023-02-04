import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

export default function Droppable({
  children,
  item,
  style,
  type,
  isDragging = () => {},
}) {
  const [{ currentlyDragging }, dragRef] = useDrag({
    type: type,
    item: item,
    collect: (monitor) => ({
      currentlyDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    isDragging(currentlyDragging);
  }, [currentlyDragging]);
  return (
    <div style={style} ref={dragRef} key={item.id}>
      {children}
    </div>
  );
}

// import React from 'react';
// import { useDrag } from "react-dnd";

// export default function Droppable({children, item, style, type}){
//   const [{ isDragging }, dragRef] = useDrag({
//     type: type,
//     item: item,
//     collect: (monitor) => ({
//         isDragging: monitor.isDragging()
//     })
//   })
//   return (
//       <div style={style} ref={dragRef} key={item.id}>

//           {item.description}
//           {children}
//           {isDragging && '🥰🤓🧐'}

//       </div>
//   )
// };
