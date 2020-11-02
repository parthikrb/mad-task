import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import context from "../../hooks/useContext/Context";
import Box from "./Box";

const styles = {
  width: "inherit",
  height: "inherit",
  position: "relative",
};

const DraggableContainer = ({ hideSourceOnDrag }) => {
  const globalContext = useContext(context);
  const globalContextBoxes = globalContext.state
    ? globalContext.state.payload
    : {};
  const [, drop] = useDrop({
    accept: "box",
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      moveBox(item.id, left, top, item.name);
      return undefined;
    },
  });

  const moveBox = (id, left, top, name) => {
    let newBox = { id, left, top, name };
    globalContext.updateSelectedInputFieldList(newBox);
  };

  return (
    <div ref={drop} style={styles}>
      {Object.keys(globalContextBoxes).map((key) => {
        const { left, top, name } = globalContextBoxes[key];
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            name={name}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {name}
          </Box>
        );
      })}
    </div>
  );
};
export default DraggableContainer;
