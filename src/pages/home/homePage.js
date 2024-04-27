import React, { useEffect, useState } from "react";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import classes from "./home.module.css";


const HomePage = () => {

  useEffect(() => {
    getHomeProducts();

  }, []);
  async function getHomeProducts() {
    try {
      const response = await axios.get(routes.getHomeProducts+"?isHomepage=true");

    } catch (err) {
    }
  }


  return (
    <>
      <div className={classes.container}>

      </div>
    </>
  );
};

export default HomePage;
