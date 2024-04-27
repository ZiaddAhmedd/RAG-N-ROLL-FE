import classes from "./paymentCheck.module.css";
import { useSelector } from "react-redux";

function PaymentForm(props) {
  const cart = useSelector((state) => state.cart);
  
  const vals = {
    order: cart.cartTotalPrice,
    shipping: 5,
    discounts: cart.totalDiscount,
    total: cart.cartTotalPrice + 5 - cart.totalDiscount
  }
  return (
    <ul className={classes.paymentCheck}>
      {Object.entries(vals).map(([key, value]) => (
        <li key={key}>
          <label>{key}</label>
          <p>{value} EGP</p>
        </li>
      )
      )}

    </ul>
  )
}

export default PaymentForm;