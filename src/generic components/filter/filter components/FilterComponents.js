import React, { useState } from "react";
import SizeButtonFilter from "./Filter buttons/SizeButton";
import classes from "./filtercomponents.module.css";
import ColorButtonFilter from "./Filter buttons/ColorButton";
import OrderButtonFilter from "./Filter buttons/OrderButton";


const FilterComponents = (props) => {
  const [filterItems, setFilterItems] = useState([]); // array of objects [{size: "XXS"}, {color: "red"}, {price: "hightolow"}]
  const [currentSelectedSize, setCurrentSelectedSize] = useState(null);
  const [currentSelectedColor, setCurrentSelectedColor] = useState(null);
  const [currentSelectedOrder, setCurrentSelectedOrder] = useState(null);
  const sizes = [
    { size: "XXS" },
    { size: "XS" },
    { size: "S" },
    { size: "M" },
    { size: "L" },
    { size: "XL" },
  ];
  const colors = [
    { color: "red" },
    { color: "white" },
    { color: "black" },
    { color: "gray" },
    { color: "blue" },
    { color: "green" },
    { color: "pink" },
  ];
  const orderby = [
    { order: "Low To High" },
    { order: "High To Low" },
    { order: "Newest" },
    { order: "Relevence" },
    ];


  const handleClick = (index) => {
    if (index === currentSelectedSize) {
      setCurrentSelectedSize(null);
    } else {
      setCurrentSelectedSize(index);
    }
  };
  const handleClickColor = (index) => {
    if (index === currentSelectedColor) {
      setCurrentSelectedColor(null);
    } else {
      setCurrentSelectedColor(index);
    }
  };
  const handleClickOrder = (index) => {
    if (index === currentSelectedSize) {
        setCurrentSelectedOrder(null);
    } else {
        setCurrentSelectedOrder(index);
    }
  };


  return (
    <div className={classes.filterComponent}>
      <div className={classes.filterSize}>
        <h1>Size</h1>
        <div className={classes.filterSizeList}>
          {sizes.map((size, index) => (
            <SizeButtonFilter
              key={index}
              size={size.size}
              selected={index === currentSelectedSize}
              handleSelected={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div className={classes.filterColor}>
        <h1>Color</h1>
        <div className={classes.filterColorList}>
          {colors.map((color, index) => (
            <ColorButtonFilter
              key={index}
              color={color.color}
              selected={index === currentSelectedColor}
              handleSelected={() => handleClickColor(index)}
            />
          ))}
        </div>
      </div>
      <div className={classes.filterOrder}>
        <h1>Order by</h1>
        {/*Used the same component as in the sizes*/}
        <div className={classes.filterOrderList}>
          {orderby.map((order, index) => (
            <OrderButtonFilter  
              key={index}
              order={order.order}
              selected={index === currentSelectedOrder}
              handleSelected={() => handleClickOrder(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilterComponents;
