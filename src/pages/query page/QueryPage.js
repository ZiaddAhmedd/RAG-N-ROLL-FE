import "animate.css";
import React, { useEffect, useState } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import Skeleton from "react-skeleton-loader";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";
import logo from "../../assets/imgs/logo.png";
import sendBtn from "../../assets/imgs/send.png";
import "./animations.css";
import classes from "./queryPage.module.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import axios from "../../requests/axios";
import routes from "../../requests/routes";

const QueryPage = () => {
  const [open, setOpen] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [output, setOutput] = useState("");
  const [query, setQuery] = useState("");
  const [queryAnimation, setQueryAnimation] = useState(false);

  const doc = `Lionel Andrés "Leo" Messi (Spanish pronunciation: [ljonel andɾes mesi] ; born 24 June 1987) is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team. One of the greatest players of all time, Messi has won a record eight Ballon d'Or awards, a record six European Golden Shoes, and was named the world's best player for a record eight times by FIFA.[note 2] Until 2021, he had spent his entire professional career with Barcelona, where he won a club-record 34 trophies, including ten La Liga titles, seven Copa del Rey titles, and the UEFA Champions League four times.[note 3] With his country, he won the 2021 Copa América and the 2022 FIFA World Cup. A prolific goalscorer and creative playmaker, Messi holds the records for most goals (474), hat-tricks (36), and assists in La Liga (192). He has the most international goals by a South American man (106). Messi has scored over 800 senior career goals for club and country, and the most goals for a single club (672).

  Messi joined Barcelona aged 13, and made his competitive debut at 17 in October 2004. He established himself as an integral player for the club within the next three years, and in his first uninterrupted season in 2008–09 helped Barcelona achieve the first treble in Spanish football; that year, aged 22, Messi won his first Ballon d'Or. Messi won four consecutive Ballons d'Or, the first player to win it four times. During the 2011–12 season, he set La Liga and European records for most goals in a season, while establishing himself as Barcelona's all-time top scorer.`;

  function handleSubmit() {
    let queryInput = document.getElementById("queryInput");
    if (queryInput.value === "") {
      return;
    }
    setQuery(queryInput.value);
    sendData(queryInput.value);
    queryInput.value = "";
    queryInput.blur();
    setOpen(true);
    setTimeout(() => {
      setQueryAnimation(true);
      // setTimeout(() => {
      //   setSkeleton(false);
      //   setShowText(true);
      //   setRotate(true);
      // }, 7000);
    }, 1000);
  }
  useEffect(() => {
    if(output){
      setSkeleton(false);
      setShowText(true);
      setRotate(true);
    }
  }, [output]);

  async function sendData(queryInput) {
    try {
      const response = await axios.post(routes.retrieve, {
        query: queryInput,
      }).then((res) => {
        setOutput(res.data.docs[0]);
        getAnswer(queryInput, res.data.docs[0]);
      });
        
    } catch (err) {}
  }

  async function getAnswer(queryInput, doc) {
    console.log("inside getAnswer: " + queryInput + " " + doc);
    try {
      const response = await axios.post(routes.QAResponse, {
        query: queryInput,
        doc: doc,
      });
      console.log(response.data);
    } catch (err) {}
  }

  return (
    <div
      className="animate__animated animate__bounceInDown"
      style={{ width: "100%" }}
    >
      <div className={classes.container}>
        <Sidebar
          backgroundColor=""
          breakPoint="md"
          collapsed={openSideBar}
          rootStyles={{
            height: "96.5vh",
            top: "3.5vh",
            borderRight: "1px solid #5cbfd7",
            borderRadius: !openSideBar ? "0 3rem 3rem 0" : "0",
            zIndex: "0",
          }}
        >
          <Menu
            menuItemStyles={{
              button: {
                color: "white",
                fontSize: "1.5rem",
                "&:hover": {
                  backgroundColor: "#063a53",
                  color: "white",
                },
              },
            }}
          >
            <div
              className={classes.menuIconWrapper}
              style={{
                marginLeft: !openSideBar ? "1.5rem" : "0",
                justifyContent: !openSideBar ? undefined : "center",
              }}
            >
              <MenuRoundedIcon
                onClick={() => setOpenSideBar(!openSideBar)}
                className={classes.menuIcon}
              />
            </div>
            {/* <MenuItem icon={<img src={logo} alt="" style={{'width': '3rem'}}/>} component={<Link to="/documentation" />}>
              {" "}
              Documentation
            </MenuItem>
            <MenuItem  component={<Link to="/calendar" />}> Calendar</MenuItem>
            <MenuItem component={<Link to="/e-commerce" />}>
              {" "}
              E-commerce
            </MenuItem> */}

            <div
              className={classes.sideBarFooter}
              style={{ justifyContent: !openSideBar ? undefined : "center" }}
            >
              <img src={logo} alt="RagN'Roll" className={classes.logo} />
              {!openSideBar && (
                <h2
                  style={{
                    fontSize: "3rem",
                    color: "#5cbfd7",
                    fontWeight: "300",
                  }}
                >
                  RagN'Roll
                </h2>
              )}
            </div>
          </Menu>
        </Sidebar>
        <div className={classes.query} data-open={open}>
          <h1 className={classes.shine}>RagN'Roll</h1>
          <div className={classes.content}>
            {queryAnimation && (
              <div className={classes.person}>
                <div className={classes.personLogo}>👨‍💻</div>
                <p>
                  <ReactTyped
                    strings={[query]}
                    typeSpeed={50}
                    onComplete={(self) => {
                      setSkeleton(true);
                      self.cursor.remove();
                    }}
                  />
                </p>
              </div>
            )}
            {skeleton && (
              <div className="animate__animated animate__fadeInUp">
                <div className={classes.response}>
                  <img id="RagLogo" src={logo} alt="" data-rotate={rotate} />
                  <Skeleton
                    count={4}
                    animated={true}
                    color="#5cbfd7"
                    width="50rem"
                    widthRandomness={0.3}
                  />
                </div>
              </div>
            )}
            {showText && (
              <div className={classes.response}>
                <img id="RagLogo" src={logo} alt="" data-rotate={rotate} />
                <ReactTyped
                  strings={[output]}
                  typeSpeed={1}
                  onComplete={(self) => {
                    setRotate(false);
                    self.cursor.remove();
                  }}
                />
              </div>
            )}
          </div>
          <div className={classes.input}>
            <input
              className={classes.inputField}
              id="queryInput"
              type="text"
              placeholder="Enter your question here"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <button
              className={classes.submitButton}
              onClick={() => handleSubmit()}
            >
              <img src={sendBtn} alt="zorar Boody" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
