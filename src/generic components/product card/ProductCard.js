import classes from "./productCard.module.css";
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [wishList, setWishlist] = useState(props.wishlist);

  async function addToWishlistFun() {
    const myWishlist = [...user.wishlist, props.id];

    try {
      await axios.patch(routes.addToWishlist, {
        wishlist: { shop: cart.shopId, products: myWishlist },
      });
      dispatch(userActions.addToWishlist({ products: props.id }));
    } catch (err) {}
  }
  async function removeFromWishlistFun() {
    dispatch(userActions.removeFromWishlist(props.id));
    try {
      await axios.delete(routes.removeFromWishlist, {
        data: {
          shop: cart.shopId,
          product: props.id,
        },
      });
    } catch (err) {}
  }

  const addToWishlist = () => {
    if (!wishList) {
      addToWishlistFun();
    } else {
      setWishlist(false);
      removeFromWishlistFun();
    }
    setWishlist(!wishList);
  };

  useEffect(() => {
    if (user.loggedIn && user.wishlist?.length !== 0) {
      if (user.wishlist?.includes(props.id)) {
        setWishlist(true);
      }
    }
  }, [wishList]);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        {props.load ? (
          <div className={classes.imgSkeleton}>
            <Skeleton.Avatar shape={"square"} size={100} active />
          </div>
        ) : (
          <div className={classes.cardImage}>
            <div className={classes.wishlist} onClick={addToWishlist}>
              {wishList ? (
                <FavoriteIcon sx={{ fontSize: "2rem", color: "#f900bfc8" }} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ fontSize: "2rem", color: "#2c4c4c" }}
                />
              )}
            </div>
            {props.outOfStock ? (
              <div className={classes.productStateSold}>
                <h5>Sold Out</h5>
              </div>
            ) : props.isNewCollection ? (
              <div className={classes.productStateNew}>
                <h5>New</h5>
              </div>
            ) : props.onSale ? (
              <div className={classes.productStateSale}>
                <h5>Sale</h5>
              </div>
            ) : null}

            {!props.outOfStock ?(
              <Link
                to={`/productDetails/${props.id}`}
                className={classes.cardHover}
              >
                <img src={props.img} alt="event_img" />
              </Link>
            ):<img src={props.img} alt="event_img" />}
          </div>
        )}
        {props.load ? (
          <div className={classes.txtSkeleton}>
            <Skeleton active />
          </div>
        ) : (
          <ul className={classes.cardContent}>
            <div className={classes.cart} onClick={addToWishlist}>
              <AddShoppingCartIcon sx={{ fontSize: "2rem", color: "#FFFFF" }} />
            </div>
            <Link
              to={`/productDetails/${props.id}`}
              className={classes.cardHover}
            >
              <h3 className={classes.productName}>{props.name}</h3>
              <hr className={classes.horizontalDivider} />
              <h4 className={classes.productPrice}>EGP {props.price}</h4>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
