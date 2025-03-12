import React, { useState, useEffect } from "react";
import MessageBox from "../components/MessageBox";
import DrawingCanvas from "../components/DrawingCanvas";
import phantom from "../assets/phantom.png";
import Keyword from "../components/Keyword";
import GuessStage from "../components/GuessStage";

const GAME_DURATION = 30; // 30초 제한
const TOTAL_ROUNDS = 3; // 총 라운드 수

const gameInfo = {
  //여기서 해당 게임의 정보를 모두 저장하고 있다는 가정하에 해당 컴포넌트에 props로 전달해줌
  //토픽이나 협력 플레이어 등등
  total_round: TOTAL_ROUNDS,
  topics: ["토끼", "사자", "망치"],
  cooperate_player: "팬텀",
};

const GamePage = () => {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [roundNum, setRoundNum] = useState(1); // 1,3,5 = 그림 / 2,4,6 = 정답 맞추기

  // ⏳ 라운드가 변경될 때마다 시간 초기화
  useEffect(() => {
    setTimeLeft(GAME_DURATION); // 새로운 라운드 시작 시 30초로 초기화
  }, [roundNum]);

  // ⏳ 타이머 로직 (1초마다 감소)
  useEffect(() => {
    if (timeLeft <= 0) return; // 시간이 끝나면 멈춤

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);
  // 모든 라운드 종료 후 게임 종료 표시 (라운드는 총 6번 진행됨)
  if (roundNum > TOTAL_ROUNDS * 2) {
    return (
      <div className="game-over">
        <span className="game-over-ment">게임 종료</span>
      </div>
    );
  }
  // 현재 라운드 계산 (1~2 = 1라운드, 3~4 = 2라운드, 5~6 = 3라운드)
  const currentRound = Math.ceil(roundNum / 2);

  return (
    <div className="game-container">
      {roundNum % 2 === 1 ? (
        // 🎨 그림 그리는 페이지
        <div className="game-body">
          <div className="info-container">
            <span className="keyword-box">제시어</span>
            <Keyword text={gameInfo.topics[currentRound - 1]}></Keyword>
            <span className="keyword-box">상대 플레이어</span>
            <img src={phantom} alt="팬텀"></img>
          </div>
          <DrawingCanvas
            timeLeft={timeLeft}
            roundNum={currentRound}
            setRoundNum={setRoundNum}
          />
        </div>
      ) : (
        // 🧠 정답 맞추는 페이지
        <GuessStage roundNum={currentRound} setRoundNum={setRoundNum} />
      )}
    </div>
  );
};

export default GamePage;
