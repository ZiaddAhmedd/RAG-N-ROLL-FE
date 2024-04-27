import React from "react";
import { useState, useEffect } from "react";
import EventCard from "../product card/ProductCard";
import classes from "./productList.module.css";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import notFound from "../../assets/imgs/notFound/programs.png";

const ProductList = (props) => {
  // const [Eventcards, SetEventcards] = useState([0, 0, 0, 0]);
  console.log(props.loading);
  const [loading, setLoading] = useState(props.loading);

  const ProductCard = props.products;
  useEffect(() => {
    setLoading(props.loading);
  }, [props.loading]);

  return (
    <div className={classes.productList}>
      <div className={classes.secHeader}>
        <h3>Our Best</h3>
        <h4>Sellers</h4>
      </div>
      <div className={classes.list}>
        {ProductCard?.length === 0 ? (
          <div className={classes.noevents}>
            <img src={notFound} />
            <p>No products found</p>
          </div>
        ) : (
          <AliceCarousel
            className={classes.carousel}
            mouseTracking items={ProductCard?.map((card) => (
              <EventCard 
                className={classes.carouselItem}
                id={card._id}
                key={card._id}
                img={card.featuredImage}
                name={card.name}
                price={!loading?card.variants[0].price:null}
                isNew={card.isNewCollection}
                outOfStock={card.outOfStock}
                onSale={card.onSale}
                load={loading}
                wishlist={props.wishlist}
              />
            ))}
            responsive={{
              0: {
                items: 1,
                itemsFit: 'fill',
              },
              1024: {
                items: 3,
                itemsFit: 'fill',
              }
            }}
            renderDotsItem={(e) => { return <div className={e.isActive ? classes.carouselIndexBtnActive : classes.carouselIndexBtn}></div> }}
            renderPrevButton={(e) => { return <ArrowBackIcon style={{ fontSize: "30" }} className={e.isDisabled ? classes.carouseLBtnDis : classes.carouseLBtn} /> }}
            renderNextButton={(e) => { return <ArrowForwardIcon style={{ fontSize: "30" }} className={e.isDisabled ? classes.carouselRtnDis : classes.carouselRBtn} /> }}
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

export default ProductList;
