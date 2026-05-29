import { useState } from "react";
import KeywordPage from "./pages/KeywordPage";
import TagPage from "./pages/TagPage";
import SearchPage from "./pages/SearchPage";
import ImagePage from "./pages/ImagePage";

function App() {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [currentPage, setCurrentPage] = useState("keyword");

  const handleKeywordSubmit = (keywords) => {
    setSelectedKeywords(keywords);
    setCurrentPage("tag");
  };

  return (
    <>
      {currentPage === "keyword" && (
        <KeywordPage onSubmit={handleKeywordSubmit} />
      )}
      {currentPage === "tag" && <TagPage selectedKeywords={selectedKeywords} />}
      {/* <SearchPage /> */}
      {/* <ImagePage /> */}
    </>
  );
}

export default App;
