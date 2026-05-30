import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import logo from "../assets/Frame 283-2.svg";
import locationLogo from "../assets/Group 15.svg";
import styles from "./styles/SearchPage.module.css";
import Button from "../components/Button/Button";
import StepProgressBar from "../components/StepProgressBar/StepProgressBar";
import { getImageByTitle } from "../utils/imageMapper";
import { locations } from "../data/locations";

export default function SearchPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedKeywords = state?.selectedKeywords;
  const recommendedTags = state?.recommendedTags;
  const tags = state?.recommendedTags ?? state?.imgTags;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!tags?.length) return;

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams();

      tags.forEach((tag) => {
        params.append("tagNames", tag);
      });

      const res = await fetch(
        `https://api.moodspot.store/recommend/furniture?${params}`,
      );

      const rawData = await res.json();
      const data = rawData.map((post) => ({
        ...post,
        location: locations[Math.floor(Math.random() * locations.length)],
        temperature: Math.floor(Math.random() * 30) + 70,
      }));

      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <Header text="✦ 맞춤 가구 검색" img={logo} />
      <StepProgressBar activeCount="3" />

      <div className={styles.subBox}>
        <span className={styles.text}>검색 기준</span>
        <span className={styles.text_2}>
          {selectedKeywords?.length > 0
            ? `${selectedKeywords.join(" + ")} → ${tags?.join(" / ")} 태그가 포함된 판매글을 우선 정렬합니다.`
            : `AI 이미지 분석을 통한 ${tags?.join(" / ")} 태그가 포함된 판매글을 우선 정렬합니다.`}
        </span>
      </div>

      <div className={styles.appliedTagBox}>
        <span className={styles.boxTitle}>적용된 태그</span>
        <div className={styles.chipContainer}>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <div key={tag} className={styles.chip}>
                #{tag}
              </div>
            ))
          ) : (
            <span>결과 태그가 없습니다.</span>
          )}
        </div>
      </div>

      <div className={styles.listContainer}>
        <span className={styles.boxTitle}>추천 판매글 리스트</span>
        <div className={styles.listCardsContainer}>
          {posts.map((post) => (
            <div key={post.id} className={styles.listCardContainer}>
              <div className={styles.upContainer}>
                <div className={styles.leftContainer}>
                  <div className={styles.imgWrapper}>
                    <img
                      src={getImageByTitle(post.title)}
                      className={styles.furnitureImg}
                    />
                  </div>

                  <div className={styles.mainTextContainer}>
                    <span className={styles.title}>{post.title}</span>

                    <span className={styles.price}>
                      {post.price.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <div className={styles.locationContainer}>
                  <img src={locationLogo} />
                  <span>{post.location}</span>
                </div>
              </div>

              <span className={styles.desText}>{post.description}</span>

              <div className={styles.tempContainer}>
                <div className={styles.tempBar}>
                  <div
                    className={styles.tempBarFill}
                    style={{ width: `${post.temperature}%` }}
                  />
                </div>
                <span>거래 온도 {post.temperature}°</span>
              </div>
            </div>
          ))}
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
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}
