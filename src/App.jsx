import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import KeywordPage from "./pages/KeywordPage";
import TagPage from "./pages/TagPage";
import SearchPage from "./pages/SearchPage";
import ImagePage from "./pages/ImagePage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<KeywordPage />} />
        <Route path="/tag" element={<TagPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/image" element={<ImagePage />} />
      </Routes>
    </>
  );
}

export default App;
