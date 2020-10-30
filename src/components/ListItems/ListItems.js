import React from "react";
import TextLabelIcon from "@material-ui/icons/Label";
import TextInputIcon from "@material-ui/icons/Input";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DraggableListItem from "./DraggableListItem";

const ListItems = (
  <div>
    <DraggableListItem name="TextLabel">
      <TextLabelIcon />
    </DraggableListItem>
    <DraggableListItem name="TextInput">
      <TextInputIcon />
    </DraggableListItem>
    <DraggableListItem name="Button">
      <DashboardIcon />
    </DraggableListItem>
  </div>
);

export default ListItems;
