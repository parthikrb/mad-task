import React from "react";
import { useDrag } from "react-dnd";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const style = {
  border: "1px solid gray",
  backgroundColor: "white",
  marginBottom: "0.8rem",
  marginRight: "0.3rem",
  marginLeft: "0.3rem",
  cursor: "move",
  borderRadius: "5px",
};

const DraggableListItem = ({ name, children }) => {
  let min = 1;
  let max = 100;
  let randomNumber = Math.floor(Math.random() * (+max - +min)) + +min;
  const [{ isDragging }, drag] = useDrag({
    item: {
      id: `${name}${randomNumber}`,
      left: 0,
      top: 0,
      name,
      type: "box",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      <ListItem>
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </div>
  );
};

export default DraggableListItem;
