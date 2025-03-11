import React, { useEffect, useState } from "react";
import { FaBomb } from "react-icons/fa"; // 폭탄 아이콘 사용
import "../styles/commons/Timer.scss"; // 스타일 파일 연결

/**
 * Timer : 타이머 컴포넌트
 *
 * duration이 설정되면 해당 시간을 기준으로 타이머가 작동한다.
 *
 * @params
 * {duration} : 남은 시간(플레이 가능한 시간)
 * {flow} : 현재 흐름(위치)
 * {setFlow} : 다음 흐름으로 이동 함수
 *
 */
const Timer = ({ duration, flow, setFlow }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // 실시간 남은 시간

  // 타이머 세팅
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // 타이머
  useEffect(() => {
    // 타이머 종료
    if (flow == 0 || flow > 2) return;

    // 타이머 진행
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // 0초가 되면 타이머 정지
          setFlow();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, flow]);

  // 프로그래스 바의 너비 (시간에 따라 감소)
  const progressWidth = `${((timeLeft - 1) / (duration - 1)) * 100}%`;

  return (
    <div className="timer-container">
      <FaBomb className="bomb-icon" />
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: progressWidth }}></div>
      </div>
    </div>
  );
};

export default Timer;
