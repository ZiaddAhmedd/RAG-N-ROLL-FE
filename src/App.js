import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import InfiniteScrollingBanner from "./generic components/infiniteScrollingBanner/InfiniteScrollingBanner";
import QueryPage from "./pages/query page/QueryPage";

function App() {


  return (
    <>
      <InfiniteScrollingBanner innerText="This is a test" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/askQuestion" element={<QueryPage />} />
      </Routes>
    </>
  );
}

export default App;
