import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import logo from "../assets/Frame 283.svg";
import searchLogo from "../assets/Component 5.svg";
import styles from "./styles/KeywordPage.module.css";
import { keywords } from "../data/keywords";
import Button from "../components/Button/Button";
import StepProgressBar from "../components/StepProgressBar/StepProgressBar";

export default function KeywordPage() {
  const navigate = useNavigate();
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordClick = (keyword) => {
    setSelectedKeywords((prev) => {
      if (prev.includes(keyword)) {
        return prev.filter((k) => k !== keyword);
      }

      if (prev.length >= 5) return prev;

      return [...prev, keyword];
    });
  };

  const handleSubmit = () => {
    if (selectedKeywords.length === 0) {
      alert("키워드를 선택해주세요.");
      return;
    }

    navigate("/tag", {
      state: { selectedKeywords },
    });
  };

  return (
    <div className={styles.container}>
      <Header text="✦ MoodSpot" img={logo} />
      <StepProgressBar />
      <div className={styles.desBox}>
        <div className={styles.chip}>Keyword-Based Curation</div>
        <span className={styles.mainText}>
          원하는 분위기를 키워드로 골라주세요.
        </span>
        <span className={styles.subText}>
          전체 25개 키워드 중 최대 5개를 선택하면, 어울리는 가구 키워드와
          판매글을 추천해요.
        </span>
      </div>

      <div className={styles.selectContainer}>
        <span className={styles.text_2}>원하는 공간의 무드를 선택하세요.</span>
        <div className={styles.selectBox}>
          <span className={styles.text}>무드 선택하기 (최대 5개 선택)</span>
          <div className={styles.line}></div>
          <div className={styles.keywordChipContainer}>
            {keywords.map((keyword) => (
              <button
                key={keyword}
                className={`${styles.keywordChip} ${
                  selectedKeywords.includes(keyword) ? styles.selected : ""
                }`}
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.inputBox}>
          <div className={styles.chip_2}>
            <img src={searchLogo}></img>
            <span>검색 조건</span>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.text}>예산</span>
            <input
              className={styles.input}
              placeholder="예: 10만원 이하"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <span className={styles.text}>원하는 가구 종류 (선택)</span>
            <input
              className={styles.input}
              placeholder="예: 협탁, 거울, 조명, 수납장"
            ></input>
          </div>
        </div>
      </div>

      <Button text="키워드 분석하기 ✦" onClick={handleSubmit} />
    </div>
  );
}
