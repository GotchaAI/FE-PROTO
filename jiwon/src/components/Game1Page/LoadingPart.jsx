/**
 * 서버에서 필요한 데이터를 받아오는 로딩파트
 * 데이터를 모두 받으면 guessingP1로 이동
 */

import useGame1Store from "stores/useGame1Store";
import aiAnswersData from "data/aiAnswersData";
import picturesData from "data/picturesData";

const LoadingPart = () => {
  const { nextPart, addAIAnswers, addPictures } = useGame1Store();

  const handleNext = () => {
    addAIAnswers(aiAnswersData); // 현재 라운드의 AI 정답 추가
    addPictures(picturesData); // 현재 라운드의 그림들 추가

    // 데이터처리가 완료됐다면
    nextPart(); // ✅ 다음 단계로 이동
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>서버에서 데이터를 불러오는 중...</div>
      <button onClick={handleNext} style={styles.button}>다음 단계로</button>
    </div>
  );
};

export default LoadingPart;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  message: {
    fontSize: "24px",
  },
  button: {
    fontSize: "18px",
  },
};