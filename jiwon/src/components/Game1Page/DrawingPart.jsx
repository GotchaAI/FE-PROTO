/**
 * 그림을 그리는 파트
 * 제시어, 플레이어, 그림판, 상단 바로 구성
 * drawing 파트수행
 * 제한시간이 끝나면 loading파트로 넘어감
 */

import { useState, useEffect, useRef } from "react";
import PaintBoardPanel from "components/Game1Page/DrawingPart/PaintBoardPanel";
import PlayerInfoPanel from "components/Game1Page/DrawingPart/PlayerInfoPanel";
import SubjectPanel from "components/Game1Page/DrawingPart/SubjectPanel";
import TopBarPanel from "components/ui/TopBarPanel";
import TimeProgressBar from "components/ui/TimeProgressBar";
import useToastStore from "stores/useToastStore";
import useGame1Store from "stores/useGame1Store";

const DrawingPart = () => {
  const maxTime = 30; // 최대 제한 시간 (고정)
  const comment = "그림 그리셈";
  const [timeLeft, setTimeLeft] = useState(maxTime); // 남은 제한 시간
  const [isZoomed, setIsZoomed] = useState(true); // 제시어 애니메이션 줌

  const showToast = useToastStore((state) => state.showToast); // 전역 토스트 메시지
  const { nextPart, round, words, isPlayer1, limitDate } = useGame1Store(); // 게임 정보 가져오기

  // 현재 라운드의 정답 가져오기
  const currentWord = isPlayer1 ? words[round]?.player1 : words[round]?.player2;

  // 첫 로딩시 실행. 제시어 애니메이션
  useEffect(() => {
    setTimeout(() => {
      setIsZoomed(false);
    }, 1500);
    
  }, []);

  useEffect(() => {
    if (!limitDate) return; // limitDate가 없으면 실행 X

    // 서버에서 받은 제한시각과 현재시각을 연산하여 정확하게 남은 시간 계산
    const intervalId = setInterval(() => {
      const remainingTime = Math.max(0, Math.floor((limitDate - Date.now()) / 1000));
      setTimeLeft(remainingTime);

      // 제한 시간 종료 시
      if (remainingTime === 0) {
        showToast("시간 종료!", 3000);
        clearInterval(intervalId); // 타이머 중지
        setTimeout(nextPart, 3000); // 3초 후 다음 단계로 이동
      }
    }, 1000); // 정확하게 1초마다 실행

    return () => clearInterval(intervalId); // ✅ 컴포넌트 언마운트 시 타이머 제거
  }, [limitDate]); // limitDate 기반으로 타이머 유지

  // 남은 시간을 퍼센트로 변환하여 progress 값 유지
  const progress = (timeLeft / maxTime) * 100;

  return (
    <div style={styles.drawingContainer}>
      <div style={styles.mainContainer}>
        <div style={styles.leftPanel}>
          <div
            style={{
              ...styles.animatedSubject,
              transform: isZoomed ? "scale(2.5) translate(+60%, +30%)" : "scale(1) translate(0, 0)",
            }}
          >
            {/* 제시어 패널 */}
            <SubjectPanel word={currentWord} />
          </div>
          {/* 상대 플레이어 정보 패널 */}
          <PlayerInfoPanel />
        </div>
        <div style={styles.rightPanel}>
          {/* 시간 및 그림판 패널 */}
          <TopBarPanel round={round} comment={comment} />
          <TimeProgressBar progress={progress} />
          <PaintBoardPanel />
        </div>
      </div>
    </div>
  );
};

export default DrawingPart;

const styles = {
  drawingContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  },
  mainContainer: {
    display: "flex",
    flexGrow: 1,
  },
  leftPanel: {
    width: "25%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  rightPanel: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  animatedSubject: {
    transition: "transform 1s ease-in-out",
  },
};
