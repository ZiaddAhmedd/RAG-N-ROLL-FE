import { Field, Form, Formik } from "formik";
import "../../index.css";
import PaymentCheck from "./paymentCheck/PaymentCheck";
import classes from "./paymentForm.module.css";
// import PaymentForm from "./paymentCheck/PaymentCheck";
import { useSelector } from "react-redux";
import axios from "../../requests/axios";
import paymob from "../../requests/paymob";
import routes from "../../requests/routes";
import paymobRoutes from "../../requests/paymobRoutes";
import toast from "react-hot-toast";
import MyToaster from "../toaster/MyToaster";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useEffect } from "react";

function PaymentForm(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [payMobToken, setPayMobToken] = useState(null);
  const initialValues = {
    paymentMethod: "cash",
  };

  const paymentMethods = [
    { value: "cash", label: "Cash on Delivery" },
    { value: "credit", label: "Credit Card" },
  ];

  async function authRequest() {
    try {
      const resp = await paymob.post(paymobRoutes.auth, {
        api_key:
          "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RNNE9UUTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkucGNNbFVybHZkT2hHTTY2RG9SUkNBYnRFQUxjOTdyY0k0RHdyMm1kZDZYZVl5N0tjVEpVNDZXTFF3cWliNWpoODBTQnlraG5oMFJnRGJmangxNGNrVXc=",
      });
      setPayMobToken(resp.data.token);

      if (resp.data.token) {
        //Step 2: Create Order
        orderRequest(resp.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function orderRequest(token) {
    console.log(payMobToken);
    const items = cart.items.map((item) => {
      return {
        name: item.name,
        amount_cents: item.price,
        description: item.category,
        quantity: item.quantity,
      };
    });

    try {
      const resp = await paymob.post(paymobRoutes.order, {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: (cart.cartTotalPrice + 5 - cart.totalDiscount) * 100,
        currency: "EGP",
        items: items,
      });

      //Step 3: Create Payment Key
      paymentRequest(resp.data.id, token);
    } catch (err) {
      console.log(err);
    }
  }
  async function paymentRequest(orderId, token) {
    try {
      const resp = await paymob.post(paymobRoutes.payment, {
        auth_token: token,
        amount_cents: (cart.cartTotalPrice + 5 - cart.totalDiscount) * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: {
          apartment: "NA",
          email: user.email,
          floor: "NA",
          first_name: user.name.split(" ")[0],
          street: "NA",
          building: "NA",
          phone_number: props.phoneNo,
          shipping_method: "NA",
          postal_code: "NA",
          city: props.city,
          country: "Egypt",
          last_name: user.name.split(" ")[1],
          state: "NA",
        },
        currency: "EGP",
        integration_id: "4338680",
        lock_order_when_paid: "false",
      });

      //Step 4: Redirect to Paymob
      //redirect to https://accept.paymob.com/api/acceptance/iframes/800893?payment_token={payment_key_obtained_previously}
      window.location.href =
        "https://accept.paymob.com/api/acceptance/iframes/800893?payment_token=" +
        resp.data.token;
    } catch (err) {
      console.log(err);
    }
  }

  async function addProduct() {
    try {
      await axios.patch(routes.addOrder, {
        shop: cart.shopId,
        products: cart.products,
        totalPrice: cart.cartTotalPrice,
        address: props.address,
        city: props.city,
        government: props.government,
        phoneNO: props.phoneNo,
      });
    } catch (err) {}
  }

  const addProductToaster = () => {
    toast.promise(addProduct(), {
      loading: "Loading",
      success: () => {
        window.location.href = "/profile/"+user.id+"/orders";
      },
      error: "Error occurred",
    });
  };
  return (
    <div className={classes.container} required>
      <MyToaster />
      <div className={classes.backIcon}>
        <ArrowBackIosNewIcon
          onClick={() => props.next()}
          style={{ cursor: "pointer", fontSize: "2rem" }}
        />
      </div>
      <h1 className={classes.title}>{props.title}</h1>
      <Formik initialValues={initialValues} enableReinitialize>
        {({ values, setFieldValue }) => (
          <Form>
            <div className={classes.wrapper}>
              <div className={classes.fields}>
                <div
                  className={`${classes.radioBtn} ${
                    values.paymentMethod === "cash" ? classes.checked : ""
                  }`}
                >
                  <Field
                    className="inputField"
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    onChange={() => setFieldValue("paymentMethod", "cash")}
                  />
                  <p>Cash on Delivery</p>
                </div>
                <div
                  disabled
                  className={`${classes.radioBtn} ${
                    values.paymentMethod === "credit" ? classes.checked : ""
                  }`}
                >
                  <Field
                    className="inputField"
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    onChange={() => setFieldValue("paymentMethod", "credit")}
                    onClick={authRequest}
                  />
                  <p>Credit</p>
                </div>
              </div>
              <div className={classes.paymentSummary}>
                <PaymentCheck />
                <button
                  type="submit"
                  className={classes.saveBtn}
                  onClick={addProductToaster}
                >
                  <p>{props.textBtn}</p>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PaymentForm;
