import "../styles/game/GameEndScene.scss";

/**
 * GameEndScene : 게임 종료 scene
 *
 * 별 건 없고 그냥 [게임 종료~~~] 메세지를 띄워준다.
 */
const GameEndScene = () => {
  return (
    <div className="game-end-scene-container">
      <div className="game-end">게임 종료~~</div>
    </div>
  );
};

export default GameEndScene;
