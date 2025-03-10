/**
 * 정답 제출 패널
 */
import { useState } from "react";

const SubmitPanel = ({ onSubmit }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    // 실제론 서버에 전송되는 로직
    if (answer.trim() !== "") {
      onSubmit(answer);
      setAnswer(""); // 제출 후 입력창 초기화
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>그림을 보고 제한시간 내에 정답을 맞춰 주세요!!</div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="정답 입력"
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          제출
        </button>
      </div>
    </div>
  );
};

export default SubmitPanel;

const styles = {
  container: {
    position: "absolute", // 위치를 화면에서 고정
    bottom: "100px", // 화면 하단에서 20px 위쪽에 배치
    left: "50%", // 화면의 정중앙에서 시작
    transform: "translateX(-50%)", // X축 기준으로 정확히 중앙 정렬
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#FFA07A",
    width: "500px",
    height: "100px",
  },
  message: {
    fontSize: "14px",
  },
  inputContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    border: "1px solid #ccc",
  },
};
