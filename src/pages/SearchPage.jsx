import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import logo from "../assets/Frame 283-2.svg";
import styles from "./styles/SearchPage.module.css";
import Button from "../components/Button/Button";
import StepProgressBar from "../components/StepProgressBar/StepProgressBar";

export default function SearchPage() {
  const navigate = useNavigate();
  const [resultTags, setResultTags] = useState([]);
  // const [posts, setPosts] = useState([]);

  return (
    <div className={styles.container}>
      <Header text="✦ 맞춤 가구 검색" img={logo} />
      <StepProgressBar activeCount="3" />

      <div className={styles.subBox}>
        <span className={styles.text}>검색 기준</span>
        <span className={styles.text_2}>
          따뜻함 + 미니멀함 + 포근함 → 우드 / 베이지 / 브라운 / 패브릭 /
          간접조명 태그가 포함된 판매글을 우선 정렬합니다.
        </span>
      </div>

      <div className={styles.appliedTagBox}>
        <span className={styles.boxTitle}>적용된 태그</span>
        <div className={styles.chipContainer}>
          {/* {resultTags.length > 0 ? (
            resultTags.map((tag) => (
              <div key={tag} className={styles.chip}>
                {tag}
              </div>
            ))
          ) : (
            <span>결과 태그가 없습니다.</span>
          )} */}

          {/* mock */}
          <div className={styles.chip}>#우드</div>
          <div className={styles.chip}>#베이지</div>
          <div className={styles.chip}>#패브릭</div>
          <div className={styles.chip}>#브라운</div>
          <div className={styles.chip}>#간접조명</div>
        </div>
      </div>

      <div className={styles.listContainer}>
        <span className={styles.boxTitle}>추천 판매글 리스트</span>
        <div className={styles.listCardsContainer}>
          <div className={styles.listCardContainer}>
            <div className={styles.imgWrapper}>이미지 들어갈 곳</div>
            <div className={styles.textContainer}>
              <span className={styles.title}>베이직 패브릭 1인 소파</span>
              <div className={styles.row}>
                <span className={styles.price}>45,000원</span>
                <span className={styles.location}>📍 신촌</span>
              </div>
              <div className={styles.desBox}>
                <span>
                  포근한 패브릭 소재 + 베이지 컬러가 선택 키워드와 일치합니다.
                </span>
              </div>
              <div className={styles.matchingBox}>
                <span>매칭률 94%</span>
              </div>
            </div>
          </div>
          {/* mock */}
          <div className={styles.listCardContainer}>
            <div className={styles.imgWrapper}>이미지 들어갈 곳</div>
            <div className={styles.textContainer}>
              <span className={styles.title}>베이직 패브릭 1인 소파</span>
              <div className={styles.row}>
                <span className={styles.price}>45,000원</span>
                <span className={styles.location}>📍 신촌</span>
              </div>
              <div className={styles.desBox}>
                <span>
                  포근한 패브릭 소재 + 베이지 컬러가 선택 키워드와 일치합니다.
                </span>
              </div>
              <div className={styles.matchingBox}>
                <span>매칭률 94%</span>
              </div>
            </div>
          </div>
          <div className={styles.listCardContainer}>
            <div className={styles.imgWrapper}>이미지 들어갈 곳</div>
            <div className={styles.textContainer}>
              <span className={styles.title}>베이직 패브릭 1인 소파</span>
              <div className={styles.row}>
                <span className={styles.price}>45,000원</span>
                <span className={styles.location}>📍 신촌</span>
              </div>
              <div className={styles.desBox}>
                <span>
                  포근한 패브릭 소재 + 베이지 컬러가 선택 키워드와 일치합니다.
                </span>
              </div>
              <div className={styles.matchingBox}>
                <span>매칭률 94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <Button
          text="방 사진으로 추가 추천 받기 📷"
          onClick={() => navigate("/image")}
        />
        <Button
          text="필터 수정하기"
          mode="secondary"
          onClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
