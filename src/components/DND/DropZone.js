// React
import React, { useEffect } from "react";

// drap and drop
import { useDrop } from "react-dnd";

export default function DropZone({
  children,
  id,
  accept = [],
  style = {},
  onDrop,
  isOver = () => {},
  canDrop = () => {},
}) {
  const [{ over, allowedDrop }, drop] = useDrop({
    accept: accept,
    drop: onDrop,
    collect: (monitor) => ({
      over: monitor.isOver(),
      allowedDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    isOver(over);
    canDrop(allowedDrop);
  }, [over, allowedDrop]);

  return (
    <div key={id} ref={drop} style={style}>
      {children}
    </div>
  );
}
