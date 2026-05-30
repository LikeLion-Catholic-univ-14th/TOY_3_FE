import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setSelectedFile(file);
    setAnalysisResult(null);
    setError(null);
  };

  const fetchImageAnalyze = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile); // key 이름은 백엔드 확인 필요

      const res = await fetch("http://54.150.225.13:8080/api/ai/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("분석에 실패했어요.");

      const data = await res.json();
      setAnalysisResult(data);
      console.log(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

      <div style={{ marginBottom: "11px" }}>
        {selectedImage && !analysisResult && (
          <Button
            text={isLoading ? "분석 중..." : "AI 분석하기"}
            mode="primary"
            onClick={fetchImageAnalyze}
            disabled={isLoading}
          />
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      {analysisResult && (
        <>
          <div className={styles.resultTextBox}>
            <div className={styles.resultTextBoxChip}>✦ AI 분석 결과</div>
            {analysisResult.description}
          </div>

          <div className={styles.resultTagBox}>
            AI가 추출한 공간 무드 {analysisResult.detectedTags.length}개
            <div className={styles.line}></div>
            <div className={styles.chipContainer}>
              {analysisResult.detectedTags.map((tag) => (
                <div key={tag} className={styles.chip}>
                  #{tag}
                </div>
              ))}
            </div>
          </div>

          {/* 백엔드에 해당 필드 없으므로 일단 mock 유지 */}
          <div className={styles.subBoxContainer}>
            <div className={styles.subBox}>
              <img src={logo_1} />
              <div className={styles.column}>
                <span className={styles.columnTitle}>색감 분석</span>
                <span className={styles.columnDes}>
                  베이지, 브라운, 아이보리 계열 비중이 높음
                </span>
              </div>
            </div>
            <div className={styles.subBox}>
              <img src={logo_2} />
              <div className={styles.column}>
                <span className={styles.columnTitle}>재질 분석</span>
                <span className={styles.columnDes}>
                  원목 · 패브릭 소재와 조화로운 가구 추천 필요
                </span>
              </div>
            </div>
            <div className={styles.subBox}>
              <img src={logo_3} />
              <div className={styles.column}>
                <span className={styles.columnTitle}>추천 판매글</span>
                <span className={styles.columnDes}>
                  원목 선반, 베이지 소파, 패브릭 조명 판매글 우선 추천
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "11px" }}>
            <Button
              text="분석 기반 판매글 보기"
              mode="primary"
              onClick={() =>
                navigate("/search", {
                  state: { imgTags: analysisResult.recommendedTags },
                })
              }
            />
          </div>
        </>
      )}

      {selectedFile && (
        <Button
          text="다른 사진 업로드"
          mode="secondary"
          onClick={() => fileInputRef.current.click()}
        />
      )}
    </div>
  );
}
