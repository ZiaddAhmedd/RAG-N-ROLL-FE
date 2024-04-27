import axios from "axios";

const instance = axios.create({
    baseURL: "https://accept.paymob.com/api/",
    // headers: {
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //     ID: sessionStorage.getItem("id")
    // }
})

export default instance