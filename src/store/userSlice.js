import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        id: "",
        token: "",
        email: "",
        name: "",
        phoneNO: "",
        isAdmin:"",
        cart:[],
        wishlist: [],
        order:[],
        googleID: "",
        facebookID: "",
        address: "",
        governorate: "",
        city: "",
        gender: "",
    },
    reducers: {
        login: (state, action)=>{
            state.loggedIn = true
            state.id = action.payload.id
            state.token = action.payload.token
            sessionStorage.clear()
            sessionStorage.setItem("id", action.payload.id)
            sessionStorage.setItem("token", action.payload.token)

        },
        updateUser: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phoneNO = action.payload.phoneNO;
            state.isAdmin = action.payload.isAdmin;
            state.cart = action.payload.cart;
            state.wishlist = action.payload.wishlist;
            state.order = action.payload.order;
            state.googleID = action.payload.googleID;
            state.facebookID = action.payload.facebookID;
            state.address = action.payload.address;
            state.governorate = action.payload.governorate;
            state.city = action.payload.city;
            state.gender = action.payload.gender;
        },
        updateUserForm: (state, action) => {
            // state.email = action.payload.email;
            state.name = action.payload.name;
            state.phoneNO = action.payload.phoneNO;
            state.address = action.payload.address;
            state.governorate = action.payload.governorate;
            state.city = action.payload.city;
        },
        signup: (state) =>{
            state.loggedIn= false
            state.id = ""
        },
        addToWishlist: (state, action) =>{
            state.wishlist.push(action.payload.products)
        },
        removeFromWishlist: (state, action) =>{
            state.wishlist = state.wishlist.filter((item)=> item !== action.payload)
        },
        logout: (state) =>{
            state.loggedIn= false
            state.id= ""
            state.token= ""
            state.email= ""
            state.fullName= ""
            state.phoneNO= ""
            state.userType= ""
            localStorage.clear()
            sessionStorage.clear()
        }
    }   
})

export const userActions = userSlice.actions;
export default userSlice.reducer;