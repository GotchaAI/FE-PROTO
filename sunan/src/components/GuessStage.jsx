import React, { useState, useEffect } from "react";
import "../styles/components/GuessStage.scss";
import spotlight from "../assets/spotlight.jpeg";

import podiumImg from "../assets/stand.jpg";
import playerProfile from "../assets/player.png";
import aiProfile from "../assets/ai.png";
//마찬가지로 페이지로 구현한다면 전역변수로 기존 props주던거 관리하면됨
const GuessStage = ({ roundNum, setRoundNum }) => {
  const [aiGuess, setAiGuess] = useState("");
  const [playerGuess, setPlayerGuess] = useState("");
  const [turn, setTurn] = useState("AI");
  const [attempts, setAttempts] = useState(0);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5); // 프로토타입 빨리 보여주려고 5초로 세팅함

  // 1) 중앙에 띄울 “O 또는 X”
  const [feedbackSymbol, setFeedbackSymbol] = useState("");
  // 2) 중앙에 띄울 “누가 뭘 말했는지” 메시지
  const [guessMessage, setGuessMessage] = useState("");

  // 예시 정답 목록 (라운드별 정답)
  const correctAnswer = ["토끼", "사자", "망치"][roundNum - 1]; //나중엔 백엔드에 그냥 요청해서 정답인지 아닌지 받으면 좋을듯

  // 턴이 바뀔 때마다 timeLeft 초기화
  useEffect(() => {
    setTimeLeft(5);
  }, [turn]);

  // 1초 간격 타이머 감소
  useEffect(() => {
    if (winner || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer); //clear안해주면 자기들끼리 겹쳐서 예상치 못한 오류 발생함
  }, [timeLeft, winner]);

  // 시간이 0초가 되면 자동 제출(빈 값)
  useEffect(() => {
    if (timeLeft === 0 && !winner) {
      checkGuess("", turn);
    }
  }, [timeLeft, winner]);

  // AI 턴 처리
  useEffect(() => {
    if (winner) return;
    if (turn === "AI") {
      const aiTimer = setTimeout(() => {
        const guess = Math.floor(attempts / 2) + 1 + "번째_AI_추측";
        setAiGuess(guess);
        checkGuess(guess, "AI");
      }, 2000); //2초 후에 AI가 추측을 하도록 함. 랜덤시간대로 해도 ㄱㅊ음 -> 긴장감 유발
      return () => clearTimeout(aiTimer);
    }
  }, [turn, winner, attempts]);

  // 플레이어 제출 처리
  const handlePlayerGuess = (event) => {
    event.preventDefault(); //새로고침 방지
    checkGuess(playerGuess.trim(), "Player");
  };

  // 정답 체크
  const checkGuess = (guess, who) => {
    // 매번 시도할 때 이전 표시들 초기화
    setFeedbackSymbol("");
    setGuessMessage("");

    // ① 누가 어떤 답변을 했는지 메시지
    const whoName = who === "AI" ? "AI" : "플레이어";
    setGuessMessage(
      guess
        ? `${whoName}가 ${guess}라 추측했다!`
        : `${whoName}가 아무것도 말하지 않았다...`
    );

    // 정답/오답 분기
    if (guess === correctAnswer) {
      // 정답 → O
      setFeedbackSymbol("O");
      setWinner(who);
      // 정답이라면 다른 플레이어가 마치길 기다렸다가 넘어감 -> 동시에 라운드가 진행되는걸 위해서
      setGuessMessage(`다른 플레이어가 마치길 기다리는 중 입니다.`);
      setTimeout(() => {
        handleNextRound(); //다음 라운드로 넘어가는 함수
      }, 1000); // 이건 그냥 기다리는 시늉하는 장치임(보여주기식)
      return;
    } else {
      // 오답 → X 보이기기
      setFeedbackSymbol("X");
      // 1초 뒤 X와 메시지 사라짐
      setTimeout(() => {
        setFeedbackSymbol("");
        setGuessMessage("");
      }, 1000);
    }

    // 오답 → 시도 횟수 증가
    setAttempts((prev) => prev + 1);
    if (attempts >= 5) {
      //만약 3번씩 전부 시도했는데 실패한 경우
      setWinner("None");
      setGuessMessage(`다른 플레이어가 마치길 기다리는 중 입니다.`);
      setTimeout(() => {
        handleNextRound();
      }, 2000);
      return;
    }
    handleTurnEnd(); //턴 교체
  };

  // 턴 교체
  const handleTurnEnd = () => {
    setTurn((prevTurn) => (prevTurn === "AI" ? "Player" : "AI"));
  };

  // 다음 라운드 처리
  const handleNextRound = () => {
    setRoundNum((prev) => prev + 1); //게임페이지의 라운드 넘기기
  };

  return (
    <div className="guess-stage">
      <h1 className="title">
        정답을 맞혀보세요! ({Math.floor(attempts / 2) + 1}번째 시도)
      </h1>

      {/* 중앙에 띄울 “누가 뭘 말했는지” + “O/X” 표시 */}
      {guessMessage && <div className="feedback-guess">{guessMessage}</div>}
      {feedbackSymbol && (
        <div className="feedback-symbol">{feedbackSymbol}</div>
      )}

      <div
        className={`top-layout ${
          turn === "Player" ? "player-active" : "ai-active"
        }`}
      >
        {/* 플레이어 영역 */}
        <div className="player-side">
          <div className="podium-container">
            <img
              src={playerProfile}
              alt="플레이어 프로필"
              className="profile-image"
            />
            <img src={podiumImg} alt="플레이어 단상" className="podium-image" />
            <div className="player-name">플레이어</div>
          </div>
          <div className="player-status">
            {turn === "Player" ? (
              <p>내 차례 (남은 시간: {timeLeft}초)</p>
            ) : (
              <p>대기 중...</p>
            )}
          </div>
        </div>

        {/* 중앙 문제/TV 영역 */}
        <div className="middle-screen">
          <div className="tv-frame">
            <p>여기에 문제(이미지/텍스트)가 표시됩니다.</p>
          </div>
        </div>

        {/* AI 영역 */}
        <div className="ai-side">
          <div className="podium-container">
            <img src={aiProfile} alt="AI 프로필" className="profile-image" />
            <img src={podiumImg} alt="AI 단상" className="podium-image" />
            <div className="player-name">AI</div>
          </div>
          <div className="ai-status">
            {turn === "AI" ? (
              <p>AI 생각 중... (남은 시간: {timeLeft}초)</p>
            ) : (
              <p>대기 중...</p>
            )}
          </div>
          <div className="ai-guess">
            {aiGuess ? <p>AI의 추측: {aiGuess}</p> : null}
          </div>
        </div>

        {/* 단일 스포트라이트 이미지 -> 해당 턴인 당사자 머리위를 비춤 */}
        <img src={spotlight} className="spotlight" alt="spotlight" />
      </div>

      {/* 입력창 + 승자 표시 */}
      <div className="guess-input-section">
        <form onSubmit={handlePlayerGuess}>
          <input
            type="text"
            value={playerGuess}
            onChange={(e) => setPlayerGuess(e.target.value)}
            disabled={turn !== "Player" || winner}
            placeholder="정답을 입력하세요..."
          />
          <button type="submit" disabled={turn !== "Player" || winner}>
            제출
          </button>
        </form>

        {/* 승자(정답 or 시도 끝) */}
        {winner && winner !== "None" && <h2>{winner} 승리!</h2>}
        {winner === "None" && <h2>아쉽게도 정답자가 없습니다!</h2>}
      </div>
    </div>
  );
};

export default GuessStage;
