import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Cities from "../../assets/data/Cities";
import classes from "./collapsiveOrder.module.css";
import "../../index.css";
import Cart from "../cart/cart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import moment from "moment";
import axios from "../../requests/axios";
import routes from "../../requests/routes";

const CollapsiveOrders = (props) => {
  const statusOptions = ["placed", "processing", "delivered"];
  const initialValues = {
    status: props.order.status,
  };

  const [status, setStatus] = useState(props.order.status);
  const [expanded, setExpanded] = useState(false);

  function handleClick() {
    setExpanded(!expanded);
    updateOrder(props.order._id, status);
  }

  async function updateOrder(id, status) {
    try {
      await axios.patch(routes.changeOrderStatus + "/" + id, {
        newStatus: status,
      });
    } catch (err) { }
  }

  function updateStatus(status) {
    setStatus(status);
    updateOrder(props.order._id, status);
  }

  useEffect(() => {
    console.log(props.order.status);
    if (props.order.status === "Awaiting confirmation") {
      setStatus("Placed");
    } else if (props.order.status === "Shipped") {
      setStatus("Delivered");
    } else {
      setStatus("Processing");
    }
  }, []);

  return (
    <details
      className={`${classes.wrapper} ${expanded ? classes.expanded : ""}`}
    >
      <summary onClick={handleClick} className={classes.mainHeader}>
        <div
          className={`${classes.header} ${props.admin && classes.adminHeader}`}
        >
          <div className={classes.id}>ID: {props.order._id}</div>
          {props.admin ? (
            <>
              <p><span>By:</span> {props.order.user.name.split(" ")[0]}</p>
              <p>
                {props.order.phoneNO ? props.order.phoneNO : <>XXXXXXXXX</>}
              </p>
              <p><span>On:</span> {moment(props.order.created_at).format("L")}</p>
              <p>
                <span>Total: </span>{props.order.totalPrice} EGP
              </p>
              <Formik initialValues={initialValues} enableReinitialize>
                {({ values, setValues }) => (
                  <Form>
                    <div className={classes.selector}>
                      <Field
                        as="select"
                        name="status"
                        className={classes.dropList}
                        value={status}
                        onClick={(e) => { e.stopPropagation(); }}
                        onChange={(e) => {
                          updateStatus(e.target.value);
                        }}
                      >
                        {statusOptions.map((state) => {
                          return (
                            <option value={state} className={classes.dropItem}>
                              {state}
                            </option>
                          );
                        })}
                      </Field>
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          ) : (
            <>
              <p className={classes.date}>
                Placed On:{" "}
                <span>{moment(props.order.created_at).format("L")}</span>
              </p>
              {!props.admin && (
                <div
                  className={`${classes.status} 
                    ${status === "Placed"
                      ? classes.placed
                      : status === "Shipping"
                        ? classes.shipping
                        : classes.delivered
                    }`}
                >
                  {status}
                </div>
              )}
              <div className={classes.total}>
                Total: <span>{props.order.totalPrice} EGP</span>
              </div>
            </>
          )}
        </div>

        <KeyboardArrowDownIcon
          className={`${classes.downArrow} ${expanded ? classes.rotate : ""}`}
        />
      </summary>
      <div className={classes.content}>
        {props.admin && (
          <div className={classes.adminDetails}>
            <p>
              <span>User email: </span>
              {props.order.user.email}
            </p>

            <p>
              <span>Address: </span> {props.order.address}
            </p>
            <p>
              <span>City: </span> {Cities[props.order.city].city_name_en}
            </p>
            <p>
              <span>Items: </span>
            </p>
          </div>
        )}
        <Cart
          includeCheckout={false}
          inOrder={true}
          items={props.order.products}
        />
      </div>
    </details>
  );
};

export default CollapsiveOrders;
