import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import InfiniteScrollingBanner from "./generic components/infiniteScrollingBanner/InfiniteScrollingBanner";

function App() {


  return (
    <>
      <InfiniteScrollingBanner innerText="This is a test" />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
