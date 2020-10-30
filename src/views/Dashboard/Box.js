import React, { useState } from "react";
import { useDrag } from "react-dnd";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const style = {
  position: "absolute",
  cursor: "move",
};

const Box = ({ id, left, top, name, hideSourceOnDrag, children }) => {
  const [, setShouldCrash] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, name, type: "box" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  const getInputElement = (id, left, top, name) => {
    try {
      switch (name) {
        case "TextLabel":
          return (
            <div id={id} ref={drag} style={{ ...style, left, top }}>
              {children}
            </div>
          );
        case "TextInput":
          return (
            <TextField
              id={id}
              ref={drag}
              style={{ ...style, left, top }}
              label={name}
              defaultValue="foo"
              margin="normal"
            />
          );
        case "Button":
          return (
            <Button
              id={id}
              ref={drag}
              variant="contained"
              color="primary"
              style={{ ...style, left, top }}
            >
              {name}
            </Button>
          );

        default:
          return (
            <div id={id} ref={drag} style={{ ...style, left, top }}>
              {children}
            </div>
          );
      }
    } catch (error) {
      setShouldCrash(() => {
        throw new Error("getInputElement");
      });
    }
  };

  return getInputElement(id, left, top, name);
};
export default Box;
