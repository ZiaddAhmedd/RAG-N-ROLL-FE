import "animate.css";
import React from "react";
import Skeleton from "react-skeleton-loader";
// import Typewriter from "typewriter-effect";
import { ReactTyped, Type } from "react-typed";
import sendBtn from "../../assets/imgs/send.png";
import "./animations.css";
import classes from "./queryPage.module.css";

const QueryPage = () => {
  const [open, setOpen] = React.useState(false);
  const [skeleton, setSkeleton] = React.useState(false);
  const [showText, setShowText] = React.useState(false);

  const doc = `Lionel Andrés "Leo" Messi[note 1] (Spanish pronunciation: [ljonel andɾes mesi] ; born 24 June 1987) is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team. One of the greatest players of all time, Messi has won a record eight Ballon d'Or awards, a record six European Golden Shoes, and was named the world's best player for a record eight times by FIFA.[note 2] Until 2021, he had spent his entire professional career with Barcelona, where he won a club-record 34 trophies, including ten La Liga titles, seven Copa del Rey titles, and the UEFA Champions League four times.[note 3] With his country, he won the 2021 Copa América and the 2022 FIFA World Cup. A prolific goalscorer and creative playmaker, Messi holds the records for most goals (474), hat-tricks (36), and assists in La Liga (192). He has the most international goals by a South American man (106). Messi has scored over 800 senior career goals for club and country, and the most goals for a single club (672).

  Messi joined Barcelona aged 13, and made his competitive debut at 17 in October 2004. He established himself as an integral player for the club within the next three years, and in his first uninterrupted season in 2008–09 helped Barcelona achieve the first treble in Spanish football; that year, aged 22, Messi won his first Ballon d'Or. Messi won four consecutive Ballons d'Or, the first player to win it four times. During the 2011–12 season, he set La Liga and European records for most goals in a season, while establishing himself as Barcelona's all-time top scorer. The following two seasons, he finished second for the Ballon d'Or behind Cristiano Ronaldo, his perceived career rival, before regaining his best form during the 2014–15 campaign, becoming the all-time top scorer in La Liga and leading Barcelona to a historic second treble, and was awarded a fifth Ballon d'Or in 2015. Messi assumed captaincy of Barcelona in 2018, and won a record sixth Ballon d'Or in 2019. He signed for French club Paris Saint-Germain in August 2021, spending two seasons there and winning Ligue 1 twice. Messi joined American club Inter Miami in July 2023, winning the Leagues Cup in August.`;

  function handleSubmit() {
    let queryInput = document.getElementById("queryInput");
    if (queryInput.value === "") {
      return;
    }
    setOpen(true);
    setTimeout(() => {
      setSkeleton(true);
    }, 1000);

  }

  return (
    <div
      className="animate__animated animate__bounceInDown"
      style={{ width: "100%" }}
    >
      <div className={classes.container}>
        <div className={classes.query} data-open={open}>
          <h1>RagN'Roll</h1>
          <div className={classes.content}>
            {skeleton && (
              <div className="animate__animated animate__fadeInUp">
                <Skeleton
                  count={4}
                  animated={true}
                  color="#5cbfd7"
                  width="50rem"
                  widthRandomness={0.3}
                />
                {<ReactTyped strings={[doc]} typeSpeed={1} />}
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
