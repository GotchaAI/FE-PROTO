/**
 * 타임 프로그레스 바 컴포넌트
 * progress를 넘겨받아 시간 진행도를 표시
 */
const TimeProgressBar = ({ progress }) => {
    return (
      <div style={styles.progressBarContainer}>
        <div style={{ ...styles.progressBar, width: `${progress}%` }} />
      </div>
    );
  };
  
  const styles = {
    progressBarContainer: {
      width: "80%",
      height: "10px",
      background: "#ccc",
    },
    progressBar: {
      height: "100%",
      background: "#ffdc5e",
      transition: "width 0.1s linear",
    },
  };
  
  export default TimeProgressBar;
  