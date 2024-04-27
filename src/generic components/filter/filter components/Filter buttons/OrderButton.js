import React from "react";
import classes from "./buttonfilter.module.css";

const OrderButtonFilter = (props) => {
    
  return (
    <div className={classes.containerOrder} onClick={() => props.handleSelected()} style={props.selected ? {border:"0.2rem solid #D7FF7B"}: {backgroundColor: "transparent"}}>
        <p>{props.order}</p>
    </div>
  );
};

export default OrderButtonFilter;
