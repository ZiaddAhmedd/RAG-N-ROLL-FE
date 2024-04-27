import React from "react";
import classes from "./buttonfilter.module.css";

const ColorButtonFilter = (props) => {
    
  return (
    <div className={classes.containerColor} onClick={() => props.handleSelected()} style={props.selected ? {border:"0.1rem solid white"}: {backgroundColor: "transparent"}}>
        <div style={{backgroundColor:props.color}} className={classes.colorBox}></div>
        <p>{props.color}</p>
    </div>
  );
};

export default ColorButtonFilter;
