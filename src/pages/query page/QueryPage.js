import "animate.css";
import React from "react";
import classes from "./queryPage.module.css";
import sendBtn from "../../assets/imgs/send.png";
import Skeleton from "react-skeleton-loader";
import "./animations.css";

const QueryPage = () => {
  const [open, setOpen] = React.useState(false);
  const [skeleton, setSkeleton] = React.useState(false);

  function handleSubmit() {
    let queryInput = document.getElementById("queryInput");
    if (queryInput.value === "") {
      return;
    }
    setOpen(true);
    setTimeout(() => {
      setSkeleton(true);
    }, 2000);
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
