import { useState } from "react";
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
  const [resultTags, setResultTags] = useState([]);

  const handleSubmit = () => {
    navigate("/search", {
      state: { resultTags },
    });
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
        <div className={styles.miniHeader}>
          <span>추천 가구 태그 5개</span>
        </div>
        <div className={styles.imgContainer}>
          {/* mock */}
          <div className={styles.imgCard}>
            <img src={tagImg}></img>
            <div className={styles.tagChip}>
              <span># 태그명</span>
            </div>
          </div>
          <div className={styles.imgCard}>
            <img src={tagImg}></img>
            <div className={styles.tagChip}>
              <span># 태그명</span>
            </div>
          </div>
          <div className={styles.imgCard}>
            <img src={tagImg}></img>
            <div className={styles.tagChip}>
              <span># 태그명</span>
            </div>
          </div>
          <div className={styles.imgCard}>
            <img src={tagImg}></img>
            <div className={styles.tagChip}>
              <span># 태그명</span>
            </div>
          </div>
          <div className={styles.imgCard}>
            <img src={tagImg}></img>
            <div className={styles.tagChip}>
              <span># 태그명</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.row}>
          <img src={bulbLogo}></img>
          <span className={styles.text}>추가로 원하는 키워드가 있으세요?</span>
        </div>
        <div className={styles.line_2}></div>
        <span className={styles.text_2}>
          원하는 키워드가 있다면, 이곳을 눌러 더 많은 정보를 확인하세요!
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
