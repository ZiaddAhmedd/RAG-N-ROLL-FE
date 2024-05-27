import Skeleton from "react-skeleton-loader";
import { ReactTyped } from "react-typed";
import classes from "../queryPage.module.css";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import { useEffect, useState } from "react";


function Response(props) {
    const [answer, setAnswer] = useState("");

    const ourScript = [`Allow me to introduce myself – I'm Rag N' Roll, your innovative RAG model for question answering. I'm designed to seamlessly handle both text and image data, ensuring I provide you with comprehensive and accurate information retrieval. With my extractive QA model, rest assured there are no hallucinations – just precise and reliable answers, tailored to your needs.`
    ,`You have the flexibility to choose between my classical model or the advanced BERT model, each optimized to enhance your question-answering experience. And here's the kicker: I'm lightweight and can operate on your local machines, ensuring your data's security and privacy are always top-notch.`
    ,`Empower your organization to make swift and confident decisions with my assistance. Let's embark on this journey together and unlock the future of data retrieval and question answering. Remember, with Rag N' Roll, the future is right at your fingertips.`]

    function renderDoc(doc) {
        if (!props.queryAnimation) return;
        if (doc === "hey" && false) {
          return (
            <div className="animate__animated animate__fadeInUp">
            <div className={classes.itemFlex}>
              <img
                id="RagLogo"
                src={props.logo}
                alt=""
                data-rotate={props.rotate}
              />
              <Skeleton
                count={4}
                animated={true}
                color="#5cbfd7"
                width="50rem"
                widthRandomness={0.3}
              />
            </div>
          </div>
          );
        }
        if (doc && props.id === 0 && props.firstDocAnimation || true) {
          return (
            <div className={classes.itemFlex}>
            <img id="RagLogo" src={props.logo} alt="" data-rotate={props.rotate} />
            <ReactTyped
              strings={ourScript}
              startDelay={2000}
              typeSpeed={40}
              onComplete={(self) => {
                props.setRotate(false);
                self.cursor.remove();
              }}
            />
          </div>
          );

        }
        return (
            <div className={classes.itemFlex}>
            <img id="RagLogo" src={props.logo} alt="" data-rotate={props.rotate} />
            <p>{props.doc}</p>
          </div>
        );
    }

    async function getAnswer(queryInput, doc) {
        try {
            if (props.firstDocAnimation === 1) props.setFirstDocAnimation(2);
            else if (props.firstDocAnimation === 2) props.setFirstDocAnimation(0);
          const response = await axios.post(routes.QAResponse, {
            query: queryInput,
            doc: doc,
            ourModel: props.ourModel,
          }).then((res) => {
            setAnswer(res.data.QA);
          });
          
        } catch (err) {}
      }

      useEffect(() => {
        if (props.query && props.doc!=="" && props.doc!=="hey")
        getAnswer(props.query, props.doc);
      }, [props.doc, props.query, props.ourModel]);
  return (
    <div className="Response">
        {props.queryAnimation && (<>
              <p className={classes.subHeader}>Document</p>
              <div className={classes.response}>
                {renderDoc(props.doc)}
              </div>
            </>
            )}
            {(props.queryAnimation && false) && (
              <>
                <p className={classes.subHeader}>Answer</p>
                <div className={classes.answerWrapper}>
                  <ReactTyped
                    strings={[answer]}
                    typeSpeed={1}
                    onComplete={(self) => {
                      props.setRotate(false);
                      self.cursor.remove();
                    }}
                  />
                </div>
              </>
            )}
    </div>
  );
}

export default Response;
