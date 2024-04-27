import React from "react";
import { useState, useEffect } from "react";
import classes from "./reviewList.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import notFound from "../../assets/imgs/notFound/programs.png";

const ReviewList = (props) => {
  // const [Eventcards, SetEventcards] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const ProductCard = props.products;

  return (
    <div className={classes.productList}>
      <div className={classes.secHeader}>
        <h3>What Our Customers Say</h3>
      </div>
      <div className={classes.list}>
        {ProductCard?.length === 0 ? (
          <div className={classes.noevents}>
            <img src={notFound} />
            <p>No Reviews in this category</p>
          </div>
        ) : (
          <AliceCarousel
            className={classes.carousel}
            mouseTracking
            items={ProductCard?.map((card) => (
              <ReviewCard
                id={card._id}
                key={card._id}
                userImg={card.userImg}
                userName={card.userName}
                userReview={card.userReview}
              />
            ))}
            responsive={{
              1024: {
                items: 1,
                itemsFit: 'fill',
              }
            }}
            renderDotsItem={(e) => {
              return (
                <div
                  className={
                    e.isActive
                      ? classes.carouselIndexBtnActive
                      : classes.carouselIndexBtn
                  }
                ></div>
              );
            }}
            renderPrevButton={(e) => {
              return (
                <ArrowBackIcon
                  style={{ fontSize: "30" }}
                  className={
                    e.isDisabled ? classes.carouseLBtnDis : classes.carouseLBtn
                  }
                />
              );
            }}
            renderNextButton={(e) => {
              return (
                <ArrowForwardIcon
                  style={{ fontSize: "30" }}
                  className={
                    e.isDisabled ? classes.carouselRtnDis : classes.carouselRBtn
                  }
                />
              );
            }}
          />
        )}
      </div>
      {!loading && ProductCard.length != 0 && (
        <div className={classes.moreBtn}>
          <button type="button">See more</button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
