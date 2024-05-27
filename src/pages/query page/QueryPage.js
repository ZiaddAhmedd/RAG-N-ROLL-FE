import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "animate.css";
import React, { useEffect, useState } from "react";
import "react-toggle/style.css";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import 'react-tooltip/dist/react-tooltip.css'
import Skeleton from "react-skeleton-loader";
import { ReactTyped } from "react-typed";
import logo from "../../assets/imgs/logo.png";
import sendBtn from "../../assets/imgs/send.png";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import "./animations.css";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import classes from "./queryPage.module.css";
import MyToaster from "../../generic components/toaster/MyToaster";
import toast from "react-hot-toast";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Toggle from "react-toggle";
import ExpandableSection from "./expandable section/ExpandableSection";
import Response from "./response/Response";
import docs from "../../assets/data/documents";
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from "react-tooltip";
import zIndex from "@mui/material/styles/zIndex";

const QueryPage = () => {
  const [open, setOpen] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [showText, setShowText] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [output, setOutput] = useState(["hey"]);
  const [query, setQuery] = useState("");
  const [queryAnimation, setQueryAnimation] = useState(false);
  const [answer, setAnswer] = useState("");
  const [scrolledBottom, setScrolledBottom] = useState(true);
  const [images, setImages] = useState([]);
  const [ourModel, setOurModel] = useState(false);
  const [currentDocIdx, setCurrentDocIdx] = useState(0);
  const [firstDocAnimation, setFirstDocAnimation] = useState(1); // 1, 2 animate, 0 not animate

  const doc = `Lionel Andrés "Leo" Messi (Spanish pronunciation: [ljonel andɾes mesi] ; born 24 June 1987) is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team. One of the greatest players of all time, Messi has won a record eight Ballon d'Or awards, a record six European Golden Shoes, and was named the world's best player for a record eight times by FIFA.[note 2] Until 2021, he had spent his entire professional career with Barcelona, where he won a club-record 34 trophies, including ten La Liga titles, seven Copa del Rey titles, and the UEFA Champions League four times.[note 3] With his country, he won the 2021 Copa América and the 2022 FIFA World Cup. A prolific goalscorer and creative playmaker, Messi holds the records for most goals (474), hat-tricks (36), and assists in La Liga (192). He has the most international goals by a South American man (106). Messi has scored over 800 senior career goals for club and country, and the most goals for a single club (672).

  Messi joined Barcelona aged 13, and made his competitive debut at 17 in October 2004. He established himself as an integral player for the club within the next three years, and in his first uninterrupted season in 2008–09 helped Barcelona achieve the first treble in Spanish football; that year, aged 22, Messi won his first Ballon d'Or. Messi won four consecutive Ballons d'Or, the first player to win it four times. During the 2011–12 season, he set La Liga and European records for most goals in a season, while establishing himself as Barcelona's all-time top scorer.`;

  const scrollToBottom = () => {
    setScrolledBottom(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolledBottom(window.scrollY <= 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleSubmit() {
    let queryInput = document.getElementById("queryInput");
    if (queryInput.value === "") {
      return;
    }
    setQuery(queryInput.value);
    toast.promise(sendData(queryInput.value), {
      loading: "Searching in the indexer...",
      success: "Data found successfully",
      error: "Error while searching in the indexer...",
    });
    queryInput.value = "";
    queryInput.blur();
    setOpen(true);
    setTimeout(() => {
      setQueryAnimation(true);
    }, 2000);
  }
  useEffect(() => {
    if (output) {
      setSkeleton(false);
      setShowText(true);
      setRotate(true);
    }
  }, [output]);

  async function sendData(queryInput) {
    try {
      const response = await axios
        .post(routes.retrieveIdsText, {
          query: queryInput,
        })
        .then((res) => {
          toast.promise(getDocumentsWithIds(queryInput, res.data.ids), {
            loading: "Retrieving documents from database...",
            success: "Retrieved successfully",
            error: "Error while Retrieving documents...",
          });
        });
    } catch (err) {}
  }

  async function getDocumentsWithIds(queryInput, ids) {
    try {
      const response = await axios.post(routes.retrieveActualText, {
        query: queryInput,
        ids: ids,
      });
      console.log(response.data.docs);
      setOutput(response.data.docs);
      toast.promise(getImages(queryInput), {
        loading: "Retrieving images from database...",
        success: "Retrieved successfully",
        error: "Error while Retrieving images...",
      });
    } catch (err) {}
  }

  async function getImages(queryInput) {
    try {
      const response = await axios.post(routes.retrieveImgs, {
        query: queryInput,
      });
      console.log(response.data);
      setImages(response.data.urls);
    } catch (err) {}
  }

  useEffect(() => {
    console.log("ourModel: " + ourModel);
  }, [ourModel]);

  return (
    <div
      className="animate__animated animate__bounceInDown"
      style={{ width: "100%" }}
    >
      <MyToaster />

      <div className={classes.page}>
        <Tooltip id="my-tooltip" style={{zIndex:1000, padding:'1rem', fontSize:'1.2rem'}} offset={20}/>
        <Sidebar
          backgroundColor=""
          collapsed={openSideBar}
          rootStyles={{
            height: "96.5vh",
            top: "3.5vh",
            borderRight: "1px solid #5cbfd7",
            borderRadius: !openSideBar ? "0 3rem 3rem 0" : "0",
            zIndex: "0",
            position: "sticky",
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
            <div className={classes.SidebarContent}>
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
                <div style={{ marginTop: "7rem"}}>
                <div className={classes.newQuestion}>
                {!openSideBar?
                  <a href="/askQuestion" > New Question</a>
                  :<>
                  <div className={classes.newQuestionSmall}><AddIcon sx={{fontSize:'3rem'}} data-tooltip-id="my-tooltip" data-tooltip-content="New Question"/></div>
                  </>
                }
                </div>
              {!openSideBar && (
                  <ExpandableSection title="Configurations">
                    <div className={classes.configSec}>
                      <h4>Choose QA model</h4>
                      <div className={classes.chooseQA}>
                        <span>BERT</span>
                        <Toggle
                          defaultChecked={ourModel}
                          className="custom-classname"
                          icons={false}
                          onChange={() => setOurModel(!ourModel)}
                        />
                        <span>Classical</span>
                      </div>
                    </div>
                  </ExpandableSection>
              )}
                </div>
            </div>

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
        <div className={classes.container}>
          {images.length && scrolledBottom && (
            <button className={classes.scrollToBottom} onClick={scrollToBottom}>
              <ImageIcon sx={{ fontSize: "30px" }} />
            </button>
          )}
          <div className={classes.query} data-open={open}>
            <h1 className={classes.header}>RagN'Roll</h1>
            {!open && (
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
            )}
            <div className={classes.content}>
              {queryAnimation && (<>
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
                </>)}
              {queryAnimation && (
                <div className={classes.responseWrapper}>
                  <Tooltip id="switch-tooltip" style={{zIndex:10}} place="top-start"/>
                  {output?.map((doc, idx) =>
                    // check if the current document index is equal to the current index
                    currentDocIdx === idx ? (
                      <Response
                        queryAnimation={queryAnimation}
                        skeleton={skeleton}
                        doc={doc}
                        logo={logo}
                        rotate={rotate}
                        answer={answer}
                        setRotate={setRotate}
                        query={query}
                        ourModel={ourModel}
                        id={idx}
                        setFirstDocAnimation={setFirstDocAnimation}
                        firstDocAnimation={firstDocAnimation}
                      />
                    ) : null
                  )}
                  <div className={classes.switchingButtons}>
                  <button onClick={() => setCurrentDocIdx(currentDocIdx - 1)} 
                   data-tooltip-id="switch-tooltip" data-tooltip-content="Another Response">
                    <ArrowBackIosNewIcon className={currentDocIdx === 0? classes.carouseLBtnDis: classes.carouseLBtn}/>
                  </button>
                  <button onClick={() => setCurrentDocIdx(currentDocIdx + 1)} disabled={currentDocIdx === output.length - 1}
                   data-tooltip-id="switch-tooltip" data-tooltip-content="Another Response">
                    <ArrowForwardIosIcon className={currentDocIdx === output.length - 1 ? classes.carouselRBtnDis : classes.carouselRBtn}/>
                  </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {images.length && (
          <>
          <p className={classes.subHeader}>Images</p>
          <div className={classes.list}>
            <AliceCarousel
              className={classes.carousel}
              mouseTracking 
              items={images?.map((image) => (
                <img src={image.link} alt={image.link} className={classes.carouselImg} />
              ))}
              responsive={{
                0: {
                  items: 1,

                },
                1024: {
                  items: 3,
                  itemsFit: 'contain',
                }
              }}
              renderDotsItem={(e) => { return <div className={e.isActive ? classes.carouselIndexBtnActive : classes.carouselIndexBtn}></div> }}
              renderPrevButton={(e) => { return null }}
              renderNextButton={(e) => { return null }}
            />
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
