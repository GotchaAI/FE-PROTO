import { useEffect } from "react";
import "../styles/game/GameStartScene.scss";

/**
 * GameStartScene : 게임 시작 알림 scene
 *
 * 별 건 없고 걍 모든 준비가 끝나면 1초간 [게임 시작~~] 오프닝을 띄워준다.
 *
 */
const GameStartScene = ({ setFlow }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlow();
    }, 1000);

    return () => clearTimeout(timer); // ✅ 언마운트 시 타이머 정리
  }, [setFlow]);

  return (
    <div className="game-start-scene-container">
      <div className="game-start">게임 시작~~~</div>
    </div>
  );
};

export default GameStartScene;
