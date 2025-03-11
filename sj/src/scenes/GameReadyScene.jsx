import { useEffect } from "react";
import "../styles/game/GameReadyScene.scss";

/**
 * GameReadyScene : 게임 준비 scene
 *
 * - 게임 시작 전 로직(플레이 시간 반환 및 게임 시작)을 처리
 *
 * - 해당 로직을 처리하는 동안 [게임 준비 오프닝] 출력
 *
 */
const GameReadyScene = ({ setFlow, setDuration }) => {
  useEffect(() => {
    // 게임 시작 및 게임 종료 시각 반환 api 요청
    const timer = setTimeout(() => {
      const fetchEndTime = async () => {
        try {
          //const response = 종료 시각 반환 api
          // 종료 시각
          // const data = {
          //   end_time: new Date(new Date().getTime() + 30000).toISOString(), // 현재 시각 + 30초
          // };

          // 남은 시간 계산 로직
          // if (data && data.end_time) {
          //   const endTime = new Date(data.end_time).getTime(); // 종료 시각 (밀리초)
          //   const currentTime = new Date().getTime(); // 현재 시각 (밀리초)
          //   const remainingTime = Math.max(
          //     0,
          //     Math.floor((endTime - currentTime) / 1000)
          //   ); // 남은 시간 (초)

          //   setDuration(remainingTime); // 남은 시간 업데이트
          //   setFlow(); // 다음 scene으로 이동
          // }

          setDuration(8); // 임시
          setFlow();
        } catch (error) {
          // 에러 처리 로직
        }
      };

      fetchEndTime();
    }, 1000);

    return () => clearTimeout(timer); // 타이머 정리
  }, [setDuration, setFlow]);

  return (
    <div className="game-ready-scene-container">
      <div className="game-ready">게임 준비~~~</div>
    </div>
  );
};

export default GameReadyScene;
