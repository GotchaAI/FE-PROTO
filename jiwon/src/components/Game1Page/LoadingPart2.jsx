/**
 * 서버에서 필요한 데이터를 받아오는 로딩파트2
 * 데이터를 모두 받으면 drawing으로 이동
 */

import useGame1Store from "stores/useGame1Store";

const LoadingPart2 = () => {
  const { nextPart, setLimitDate } = useGame1Store();

  const handleNext = () => {
    // 데이터처리가 완료됐다면

    // 제한시간을 위한 임의의 날짜객체 생성
    const now = new Date();
    setLimitDate(new Date(now.getTime() + 30 * 1000));
    nextPart(); // 다음 단계로 이동
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>다음 문제 준비하는중...</div>
      <button onClick={handleNext} style={styles.button}>다음 단계로</button>
    </div>
  );
};

export default LoadingPart2;

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