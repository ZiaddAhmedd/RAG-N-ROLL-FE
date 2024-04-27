import React from 'react'
import classes from '../filter.module.css'

const FilterHeader = (props) => {
    return (
      <div className={classes.filterHeader}>
        <h1 className={classes.filterTitle}>{props.title}</h1>
      </div>
    )
  }
  
  export default FilterHeader