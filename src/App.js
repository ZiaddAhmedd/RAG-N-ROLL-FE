import { Route, Routes } from "react-router-dom";
import FindUs from "./pages/findUs/FIndUs";
import HomePage from "./pages/home/homePage";
// import SubscribeCard from "./generic components/subscribe/SubscribeCard";
import GenericForm from "./generic components/generic form/GenericForm";

import InfiniteScrollingBanner from "./generic components/infiniteScrollingBanner/InfiniteScrollingBanner";
import ContactUs from "./pages/contact us/ContactUs";

function App() {


  return (
    <>
      <InfiniteScrollingBanner innerText="This is a test" />
      <Routes>
        <Route path="/adminForm" element={<GenericForm />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
