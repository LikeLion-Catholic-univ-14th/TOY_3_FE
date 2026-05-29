import { useState, useRef } from "react";
import Header from "../components/Header/Header";
import logo from "../assets/Frame 283-3.svg";
import styles from "./styles/ImagePage.module.css";
import StepProgressBar from "../components/StepProgressBar/StepProgressBar";
import cameraLogo from "../assets/free-icon-film-camera-7640331 1.svg";
import logo_1 from "../assets/Frame 326.svg";
import logo_2 from "../assets/Frame 329.svg";
import logo_3 from "../assets/Frame 328.svg";
import Button from "../components/Button/Button";

export default function ImagePage() {
  const [resultTags, setResultTags] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  return (
    <div className={styles.container}>
      <Header text="✦ 사진 무드 분석" img={logo} />
      <StepProgressBar activeCount="4" />

      <label className={styles.imgUproadBox}>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="업로드 이미지"
            className={styles.uploadedImage}
          />
        ) : (
          <>
            <img src={cameraLogo} className={styles.cameraLogo} />
            <span className={styles.imgUproadBoxTitleText}>
              내 방 사진 업로드
            </span>

            <span className={styles.imgUproadBoxDesText}>
              사진을 올리면 AI가 현재 공간 분위기를 분석하고
              <br />
              어울리는 중고 가구 스타일을 추천합니다.
            </span>

            <div className={styles.imgUproadBoxChip}>이미지 업로드 영역</div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </label>

      <div className={styles.resultTextBox}>
        <div className={styles.resultTextBoxChip}>✦ AI 분석 결과</div>
        {/* mock */}
        현재 방은 우드톤과 베이지 계열이 중심이라 따뜻하고 차분한 분위기 입니다.
        너무 어두운 색보다 밝은 패브릭, 원목 수납장, 간접 조명이 잘 어울려요.
      </div>

      <div className={styles.resultTagBox}>
        AI가 추출한 공간 무드 5개
        <div className={styles.line}></div>
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
          <div className={styles.chip}>#우드톤</div>
          <div className={styles.chip}>#따뜻한</div>
          <div className={styles.chip}>#베이지</div>
          <div className={styles.chip}>#차분한</div>
          <div className={styles.chip}>#패브릭</div>
        </div>
      </div>

      {/* Des mock */}
      <div className={styles.subBoxContainer}>
        <div className={styles.subBox}>
          <img src={logo_1}></img>
          <div className={styles.column}>
            <span className={styles.columnTitle}>색감 분석</span>
            <span className={styles.columnDes}>
              베이지, 브라운, 아이보리 계열 비중이 높음
            </span>
          </div>
        </div>
        <div className={styles.subBox}>
          <img src={logo_2}></img>
          <div className={styles.column}>
            <span className={styles.columnTitle}>재질 분석</span>
            <span className={styles.columnDes}>
              원목 · 패브릭 소재와 조화로운 가구 추천 필요
            </span>
          </div>
        </div>
        <div className={styles.subBox}>
          <img src={logo_3}></img>
          <div className={styles.column}>
            <span className={styles.columnTitle}>추천 판매글</span>
            <span className={styles.columnDes}>
              원목 선반, 베이지 소파, 패브릭 조명 판매글 우선 추천
            </span>
          </div>
        </div>
      </div>

      <Button
        text="다른 사진 업로드"
        mode="secondary"
        onClick={() => fileInputRef.current.click()}
      />
    </div>
  );
}
