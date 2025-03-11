import { useEffect, useState } from "react";
import BattleScene from "../scenes/game1/BattleScene";
import DrawScene from "../scenes/game1/DrawScene";
import RewardScene from "../scenes/game1/RewardScene";

import { useLocation } from "react-router-dom";
import "../styles/game/GamePage.scss";

/**
 * GamePage : 게임 최상위 페이지
 *
 * 게임 정보(라운드 수, ...)에 맞게 scene들을 생성하여 scenes 리스트를 만든다.
 *
 * scenes 에 저장된 scene(컴포넌트)를 게임 순서에 맞게 출력해준다.
 *
 * game에 필요한 게임 정보들을 관리한다.
 *
 */
const GamePage = () => {
  const location = useLocation(); // 게임 정보 받아오기

  const [gameInfo, setGameInfo] = useState({}); // 게임 정보
  const [scenes, setScenes] = useState([]); // 게임에 필요한 씬 리스트
  const [sceneIdx, setSceneIdx] = useState(0); // 씬 상태관리

  // 게임 정보 동기화
  useEffect(() => {
    setGameInfo(location.state);
  }, []);

  // 게임 정보 동기화 후 scene 생성
  useEffect(() => {
    if (gameInfo === null) return;

    // 씬 생성
    createScenes(gameInfo.total_round);
  }, [gameInfo]);

  const createScenes = (total_round) => {
    const newScenes = [];

    // 라운드 수 만큼 draw, battle scene 추가
    for (let round = 1; round <= total_round; round++) {
      newScenes.push(
        <DrawScene
          key={`draw-${round}`} // 고유 식별 key
          userInfo={gameInfo.userInfo} // 유저 정보 출력(팀 플레이어 이름)
          round={round} // 현재 라운드
          topic={gameInfo.topic[round]} // 해당 라운드 주제
          goToNextScene={() => setSceneIdx((prev) => prev + 1)} // scene 이동 함수
        />,
        <BattleScene
          key={`battle1-${round}`}
          userInfo={gameInfo.userInfo}
          round={round}
          goToNextScene={() => setSceneIdx((prev) => prev + 1)}
        />,
        <BattleScene
          key={`battle2-${round}`}
          userInfo={gameInfo.userInfo}
          round={round}
          goToNextScene={() => setSceneIdx((prev) => prev + 1)}
        />
      );
    }
    newScenes.push(<RewardScene key={`reward`} userInfo={gameInfo.userInfo} />);

    setScenes(newScenes);
  };

  return (
    <div className="game-page-container">
      <span>게임 페이지</span>
      {/** 아래에 라운드 및 scene_idx에 해당하는 scene이 출력된다. */}
      <div className="game-scene">{scenes[sceneIdx]}</div>
    </div>
  );
};

export default GamePage;
