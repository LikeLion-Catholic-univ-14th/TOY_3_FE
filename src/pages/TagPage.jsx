import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import logo from "../assets/Frame 283-1.svg";
import bulbLogo from "../assets/Subtract.svg";
import styles from "./styles/TagPage.module.css";
import Button from "../components/Button/Button";
import tagImg from "../assets/tag-test-img.png";
import StepProgressBar from "../components/StepProgressBar/StepProgressBar";

export default function TagPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedKeywords = state?.selectedKeywords;
  const [recommendedTags, setRecommendedTags] = useState([]);

  const handleSubmit = () => {
    navigate("/search", {
      state: { selectedKeywords, recommendedTags },
    });
  };

  // 직전 페이지에서 전달받은 키워드로 태그 추천받기
  useEffect(() => {
    if (selectedKeywords.length === 0) return;

    fetchRecommendedTags();
  }, []);

  const fetchRecommendedTags = async () => {
    try {
      const params = new URLSearchParams();

      selectedKeywords.forEach((keyword) => {
        params.append("tagNames", keyword);
      });

      const res = await fetch(
        `https://api.moodspot.store/recommendation?${params}`,
      );

      if (!res.ok) {
        throw new Error("API 요청 실패");
      }

      const data = await res.json();

      setRecommendedTags(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Header text="✦ 태그 추천" img={logo} />
      <StepProgressBar activeCount="2" />
      <div className={styles.mainBox}>
        <span>선택 키워드</span>
        <div className={styles.line}></div>
        <div className={styles.chipContainer}>
          {selectedKeywords.length > 0 ? (
            selectedKeywords.map((keyword) => (
              <div key={keyword} className={styles.chip}>
                {keyword}
              </div>
            ))
          ) : (
            <span>선택한 키워드가 없습니다.</span>
          )}
        </div>
      </div>

      <div className={styles.mainBox_2}>
        <div className={styles.miniHeader}>추천 가구 태그</div>
        <div className={styles.chipContainer}>
          {recommendedTags.length > 0 ? (
            recommendedTags.map((tag) => (
              <div key={tag} className={styles.tagChip}>
                #{tag}
              </div>
            ))
          ) : (
            <span>추천된 태그가 없습니다.</span>
          )}
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.row}>
          <img src={bulbLogo}></img>
          <span className={styles.text}>추가로 원하는 키워드가 있으세요?</span>
        </div>
        <span className={styles.text_2}>
          원하는 키워드가 있다면, MoodSpot에 정보를 추가하세요!
        </span>
      </div>

      <div className={styles.btnContainer}>
        <Button text="맞춤 가구 검색하기" onClick={handleSubmit} />
        <Button
          text="← &nbsp;키워드 다시 선택하기"
          mode="secondary"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
