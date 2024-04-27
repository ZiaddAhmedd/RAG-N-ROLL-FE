
export var store = "651afe8a9209145d61f015fc";

const routes = {
    signUp: "/api/user/signup",
    logIn: "/api/user/login",
    forgotPassword: "/api/user/reset-password",
    changePassword: "/api/user/change-password",
    getUser: "/api/user/",
    updateUser: "/api/user",
    googleLogin: "/api/user/google",
    addProduct: "/api/product/" + store,
    getProductsCategory: "/api/product/" + store,
    getProduct: "/api/product",
    getOrdersAdmin: "/api/user/getAllAwaitingOrders/" + store,
    getAllOrdersAdmin: "/api/user/getAllOrders/" + store,
    changeOrderStatus: "/api/user/changeOrderStatus/" + store,
    addToCart: "/api/user/addToCart",
    addOrder: "/api/user/addOrder",
    getOrders: "/api/user/getOrdersByUserID",
    addToWishlist: "/api/user/addToWishlist",
    removeFromWishlist: "/api/user/deleteFromWishlist",
    getAllShopProducts: "/api/product/" + store,
    getHomeProducts: "/api/product/" + store,
    getProductDetails: "/api/product/" + store,
    getWishlist: "/api/user/wishlist/",

}
export default routes 