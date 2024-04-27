// import React from "react";
// import classes from "./findUs.module.css";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import data from "../../assets/data/findUsData";

// function FindUs() {
//   const img =
//     "https://img.freepik.com/free-photo/summer-portrait-cheerful-red-haired-lady-fashionable-outfit-having-fun-pink_273443-4440.jpg?w=360&t=st=1693857866~exp=1693858466~hmac=47cee5352e4fa3d05fa60652cab10d1825bb4cb94120e22457c7967ca0f35479";
//   return (
//     <div className={classes.main}>
//       <div className={classes.info}>
//         <LocationOnIcon sx={{ fontSize: "3.5rem" }} />
//         <h1>Find Us At</h1>
//         <div>
//           {data.map((item) => {
//             return (
//               <div className={classes.address}>
//                 <h3>{item.place}</h3>
//                 {item.address.map((address) => {
//                   return <p>{address}</p>;
//                 })}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       <div className={classes.image}>
//         <img src={img} alt="img" />
//       </div>
//     </div>
//   );
// }

// export default FindUs;
