import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Cities from "../../assets/data/Cities";
import Governorate from "../../assets/data/Governorate";
import "../../index.css";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import classes from "./informationForm.module.css";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import toast from "react-hot-toast";
import MyToaster from "../toaster/MyToaster";

const InformationForm = (props) => {
  const user = useSelector((state) => state.user);
  const [govID, setGovId] = useState(user.governorate ? user.governorate : "1");
  const [cityID, setCityId] = useState(user.city ? user.city : "1");
  const [fromOrder, setFromOrder] = useState(props.fromOrder);
  const dispatch = useDispatch();

  const initialValues = {
    email: user.email,
    name: user.name,
    phoneNo: user.phoneNO,
    address: user.address,
    city: cityID,
    government: govID,
    // specialNotes: "", Needs to be added by backend
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
  });

  function handleSubmit(data, { setErrors }) {
    if (fromOrder) {
      props.next();
      props.setAddress(data.address);
      props.setCity(cityID);
      props.setGovernment(govID);
      props.setPhoneNO(data.phoneNo);
    } else {
      async function sendData() {
        try {
          const body = new FormData();
          body.append("name", data.name);
          body.append("phoneNO", data.phoneNo);
          body.append("address", data.address);
          body.append("city", cityID);
          body.append("government", govID);

          const resp = await axios.put(routes.updateUser, body);
          dispatch(
            userActions.updateUserForm({
              name: data.name,
              phoneNO: data.phoneNo,
              address: data.address,
              city: cityID,
              government: govID,
            })
          );
        } catch (err) {}
      }
      toast.promise(sendData(), {
        loading: "Loading",
        success: "Saved successfully",
        error: "Error while updating information",
      });
    }
  }

  return (
    <div className={classes.container}>
      <MyToaster />
      <h1 className={classes.title}>{props.title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            {setGovId(values.government)}
            {setCityId(values.city)}
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="name"
                autoComplete="off"
                placeholder="Name"
              />
            </div>
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="phoneNo"
                type="text"
                autoComplete="off"
                placeholder="Phone number"
              />
              <ErrorMessage name="phoneNo" component="span" />
            </div>
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="email"
                autoComplete="off"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="span"
                data-testid="emailError"
              />
            </div>
            <div className={classes.dropboxes}>
              <div className={classes.dropbox}>
                <Field
                  as="select"
                  name="government"
                  className={classes.dropList}
                >
                  {Governorate.map((governorate) => {
                    return (
                      <option
                        value={governorate.id}
                        className={classes.dropItem}
                      >
                        {governorate.governorate_name_en}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className={classes.dropbox}>
                <div className={classes.selector}>
                  <Field as="select" name="city" className={classes.dropList}>
                    {Cities.filter((City) => City.governorate_id === govID).map(
                      (city) => {
                        return (
                          <option value={city.id} className={classes.dropItem}>
                            {city.city_name_en}
                          </option>
                        );
                      }
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="address"
                autoComplete="off"
                placeholder="Full Address"
              />
            </div>
            {props.inCheckOut && (
              <div className={classes.boxContainer}>
                <Field
                  className="inputField"
                  name="specialNotes"
                  autoComplete="off"
                  placeholder="Special Notes (optional)"
                />
              </div>
            )}
            <button type="submit" className={classes.saveBtn}>
              <p>{props.textBtn}</p>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InformationForm;
