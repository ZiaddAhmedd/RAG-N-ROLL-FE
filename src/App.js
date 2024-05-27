import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/homePage";
import InfiniteScrollingBanner from "./generic components/infiniteScrollingBanner/InfiniteScrollingBanner";
import QueryPage from "./pages/query page/QueryPage";
import "./App.css";
import "react-toggle/style.css"


function App() {
  return (
    <div className="RAGAPP">
      <div className="infiniteScroll">
        <InfiniteScrollingBanner innerText="Let's Roll" />
      </div>
      <div className="pages">
        <Routes className="pages">
          <Route path="/" element={<HomePage />} />
          <Route path="/askQuestion" element={<QueryPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
