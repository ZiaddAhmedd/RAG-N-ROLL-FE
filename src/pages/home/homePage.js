import React, { useEffect, useState } from "react";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import classes from "./home.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/imgs/logo.png";

const HomePage = () => {
  useEffect(() => {
    getHomeProducts();
  }, []);
  async function getHomeProducts() {
    try {
      const response = await axios.get(
        routes.getHomeProducts + "?isHomepage=true"
      );
    } catch (err) {}
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.leftSection}>
          <div className={classes.title}>RagN'Roll</div>
          <p>
            Ask our RAG model any Question and you will have the best experience
            ever!
          </p>
          <NavLink to="/askQuestion">
            <button className={classes.Btn}>Ask Now</button>
          </NavLink>
        </div>
        <div className={classes.rightSection}>
          <img src={Logo} alt="boody3abeet"/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
