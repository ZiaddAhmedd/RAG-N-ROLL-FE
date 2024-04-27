import React from "react";
import classes from "./cart.module.css";
import CartCard from "./cartCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import emptyCart from "../../assets/imgs/empty-cart.png";
import emptyCart from "../../assets/imgs/empty-cart1.svg";

// includeCheckout = true in case of cart component
const Cart = (props) => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className={classes.cartContainer}>
      {props.items.length === 0 ? (
        <div className={classes.emptyCart}>
          <img src={emptyCart} alt="empty cart" className={classes.emptyImg} />
          <h1>Your cart is empty!</h1>
        </div>
      ) : null}

      {props.inOrder ? (
        <div className={classes.cartItems}>
          {props.items.map((card) => (
            <CartCard
              id={card.productID._id}
              key={card.productID._id + card.size}
              img={card.productID.featuredImage}
              name={card.productID.name}
              price={card.productID.price}
              size={card.variant.size}
              quantity={card.variant.quantity}
              color={card.variant.color}
              includeCheckout={props.includeCheckout}
            />
          ))}
        </div>
      ) : (
        <div className={classes.cartItems}>
          {props.items.map((card) => (
            <CartCard
              id={card._id}
              key={card._id + card.size}
              img={card.images}
              name={card.name}
              price={card.price}
              size={card.size}
              quantity={card.quantity}
              color={card.color}
              includeCheckout={props.includeCheckout}
            />
          ))}
        </div>
      )}

      {props.includeCheckout ? (
        <div className={classes.checkOut}>
          <div className={classes.totalCheck}>
            <div className={classes.totalCheckInfo}>
              <h5>Total Order</h5>
              <h6>Inclusive of VAT</h6>
            </div>
            <h4>{cart.cartTotalPrice} EGP</h4>
          </div>
          <Link to="/Information">
            <button onClick={() => props.closeOverlay(false)}>
              <p>Proceed to Checkout</p>
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
