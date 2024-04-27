import React, { useState } from "react";
import classes from "./contactUs.module.css";
import { useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../../index.css";

function ContactUs() {
  const user = useSelector((state) => state.user);
  const initialValues = {
    email: user.email,
    name: user.name,
    phoneNo: user.phoneNO,
    address: "",
    specialNotes: "",
    subject: "",
    governorateID: "1",
  };

  function handleSubmit(data, { setErrors }) {
    console.log(data);
  }

  const subject = ["subject1", "subject2", "subject3"];
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>CONTACT US</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <div className={classes.nameEmail}>
              <div className={classes.boxContainer1}>
                <Field
                  className="inputField"
                  name="name"
                  autoComplete="off"
                  placeholder="Name"
                />
              </div>
              <div className={classes.boxContainer1}>
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
            </div>

            <div className={classes.dropbox}>
              <div className={classes.selector}>
                <Field as="select" name="subject" className={classes.dropList}>
                  {subject.map((subject) => {
                      return (
                        <option
                          value={subject}
                          className={classes.dropItem}
                        >
                          {subject}
                        </option>
                      );
                    })}
                </Field>
              </div>
            </div>
            <div className={classes.boxContainer2}>
              <Field
                className="inputField"
                name="phoneNo"
                type="text"
                autoComplete="off"
                placeholder="Phone number"
              />
              <ErrorMessage name="phoneNo" component="span" />
            </div>
            <div className={classes.boxContainer2}>
              <textarea
                className="inputField"
                name="address"
                autoComplete="off"
                placeholder="Message"
                tybe="textArea"
              />
            </div>
            <button type="submit" className={classes.saveBtn}>
              <p>SUBMIT</p>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ContactUs;
