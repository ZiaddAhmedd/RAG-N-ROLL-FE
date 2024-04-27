import React from "react";
import classes from "./buttonfilter.module.css";

const SizeButtonFilter = (props) => {

  return (
    <div className={classes.container} onClick={() => props.handleSelected()} style={props.selected ? { border: "0.2rem solid #D7FF7B" } : { backgroundColor: "transparent" }}>
      <p>{props.size}</p>
    </div>
  );
};

export default SizeButtonFilter;
