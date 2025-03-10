/**
 * 게임 시작버튼이 존재하는 페이지
 * 서버가 존재하는 것처럼 게임 데이터를 받는 역할을 함
 */

import { useNavigate } from "react-router-dom";
import useGame1Store from "stores/useGame1Store";
import gameData from "data/game1Data";

const Game1Start = () => {
    const navigate = useNavigate();
    const { initGameData } = useGame1Store(); // 게임 초기화 함수 가져오기

    const handleStart = () => {
        initGameData(gameData); // 게임 데이터 초기화
        navigate("/room:game1room-number"); // 임 화면으로 이동
    };

    return (
        <div style={styles.container}>
            <div style={styles.message}>Game1 시작</div>
            <button onClick={handleStart} style={styles.button}>Start</button>
        </div>
    );
};

export default Game1Start;

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