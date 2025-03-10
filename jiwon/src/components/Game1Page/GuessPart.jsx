/**
 * 정답을 맞추는 파트
 * guessing1, guessing2 파트 수행
 * ai나 플레이어가 정답을 맞춘다면(각각 3번의 기회) 다음 파트로 넘어감
 * guessing1->guessing2 또는 guessing2->loading2
 */
import { useEffect, useState } from "react";
import TopBarPanel from "components/ui/TopBarPanel";
import PlayerPanel from "components/Game1Page/GuessPart/PlayerPanel";
import PicturePanel from "components/Game1Page/GuessPart/PicturePanel";
import AIPanel from "components/Game1Page/GuessPart/AIPanel";
import TimeProgressBar from "components/ui/TimeProgressBar";
import SubmitPanel from "components/Game1Page/GuessPart/SubmitPanel";
import useToastStore from "stores/useToastStore";
import useGame1Store from "stores/useGame1Store";
import OXToastMessage from "components/ui/OXToastMessage";
import opponentAnswersData from "data/opponentAnswersData";
import sleep from "utils/sleep";

const GuessPart = () => {
  const maxTime = 300; // 최대 제한 시간
  const [timeLeft, setTimeLeft] = useState(maxTime); // 남은 시간
  const comment = "제시어: ???";
  const [aiAnswer, setAiAnswer] = useState(""); // 현재 AI의 답변 저장
  const [playerAnswer, setPlayerAnswer] = useState(""); // 현재 플레이어의 답변 저장

  const {showToast, showOXToast } = useToastStore();
  const { setCorrect, round, nextPart, currentTurn, AIAnswers, aiAttempts, playerAttempts, part, words, isPlayer1, pictures, maxAttempts } = useGame1Store(); // 게임 정보 가져오기

  // 현재 라운드의 정답 가져오기 (part에 따라 player1 또는 player2 선택)
  const correctAnswer = part === "guessingP1" ? words[round]?.player1 : words[round]?.player2;

  // 현재 라운드의 그림 가져오기 (part에 따라 player1 또는 player2 선택)
  const currentPicture = part === "guessingP1" ? pictures[round]?.player1 : pictures[round]?.player2;

  // AI의 차례일 때 매 시도마다 AI의 답변을 보여주고 nextPart() 실행
  useEffect(() => {
    const executeAIAction = async () => {
      setTimeLeft(300); // 남은 제한시간 초기화
  
      // ai가 제시할 정답 가져오기
      if (currentTurn === 1 && aiAttempts < maxAttempts) {
        const answer = part === "guessingP1"
          ? AIAnswers[round]?.player1[aiAttempts + 1]
          : AIAnswers[round]?.player2[aiAttempts + 1];
  
        setAiAnswer(answer);
  
        await sleep(1000); // 1초 대기 후 AI의 답변 표시
        showToast(`AI의 답변: ${answer}`, 2000);
  
        await sleep(2500);
        if (answer === correctAnswer) {
          // ai가 정답이라면
          showOXToast(true);
          await sleep(500);
          setCorrect();
        } else {
          // ai가 오답이라면
          showOXToast(false);
          await sleep(500);
          nextPart();
        }
      }
    };
  
    executeAIAction();
  }, [currentTurn, part]);

  // 제한시간 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 100);

    return () => clearInterval(timer);
  }, [maxTime]);

  // 제한시간 감지
  useEffect(() => {
    const handleTimeout = async () => {
      if (timeLeft === 0) {
        showToast("시간 종료!", 2000);
        await sleep(2000);
        nextPart();
      }
    };

    handleTimeout();
  }, [timeLeft]);

  // 남은 시간을 퍼센트로 변환하여 progress 값 유지
  const progress = (timeLeft / maxTime) * 100;

  // 플레이어 정답 제출 처리
  const handleSubmit = async (answer) => {
    // 실제론 서버로 데이터 전송하는 로직

    setPlayerAnswer(answer);
  
    await sleep(1000); // 1초 대기 후 AI의 답변 표시
    showToast(`player의 답변: ${answer}`, 2000);
  
    await sleep(2500); 
    if (correctAnswer === answer) {
      // 내 답이 정답이라면
      showOXToast(true);
      await sleep(2000);
      setCorrect();
    } else {
      // 내 답이 오답이라면
      showOXToast(false);
      await sleep(2000); 
      nextPart();
    }
  };

  // 임시 상대방 플레이어 정답 제출 처리
  const handleOppSubmit = async () => {
    // 실제론 상대방의 답을 받아오는 로직

    // 상대방의 답 가져오기
    const answer = opponentAnswersData.opponentAnswers[playerAttempts + 1];

    setPlayerAnswer(answer);
  
    await sleep(1000); // 1초 대기 후 AI의 답변 표시
    showToast(`player의 답변: ${answer}`, 2000);
  
    await sleep(2500);
    if (correctAnswer === answer) {
      // 상대방이 정답이라면
      showOXToast(true);
      await sleep(500);
      setCorrect();
    } else {
      // 상대방이 오답이라면
      showOXToast(false);
      await sleep(500);
      nextPart();
    }
  };

  return (
    <div style={styles.container}>
      {/* 상단 바 */}
      <TopBarPanel round={round} comment={comment} />

      {/* 메인 영역 */}
      <div style={styles.mainContainer}>
        <PlayerPanel />
        <PicturePanel drawingSample={currentPicture} />
        <AIPanel aiAnswer={aiAnswer} /> {/* AI의 현재 답변을 표시 */}
      </div>

      {/* 하단 타임 프로그레스 바 */}
      <TimeProgressBar progress={progress} />

      {/* 플레이어 정답 입력창 (상대방 차례일 때만 표시) */}
      {(currentTurn === 2) && (!isPlayer1) && <SubmitPanel onSubmit={handleSubmit} />}

      {/* 임시 상대방의 제출 */}
      {(currentTurn === 2) && (isPlayer1) && <button onClick={handleOppSubmit}>상대방의 제출</button>}

      {/* OX표시 */}
      {aiAttempts >= 1 && <OXToastMessage />}
      
    </div>
  );
};

export default GuessPart;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    width: "100%",
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
  },
};

