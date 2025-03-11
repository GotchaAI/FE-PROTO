import { useEffect, useState } from "react";
import aiImg from "../../assets/ai.png";
import drawingImg from "../../assets/drawing.png";
import userImg from "../../assets/lion.png";
import Timer from "../../commons/Timer";
import "../../styles/game/game1/BattleScene.scss";

/**
 * BattleScene : 제시어 맞추기 Scene
 *
 * 씬이 호출되면 가장 먼저 누가 맞출 차례인지 반환됩니다.(isMyTurn)
 *
 * 그걸 토대로 ai와 게임 진행이 됩니다.
 *
 * 현재는 api가 없기에 본인 턴(res = true)으로만 진행되는데 isMyTurn을 바꾸면 상대 턴(관전모드)으로도 확인 할 수 있습니다.
 * -> 그래서 턴이 6개가 아니라 12개로 보이는데 착각하지 마시길 6번 / 6번 각각 다른 게임이 진행되는겁니다.
 *
 * player 턴이면 제출(타이머 시간초과 포함)을 통해서 진행, ai턴이면 useEffect를 통해 진행됩니다.
 */

const BattleScene = ({ goToNextScene }) => {
  const [isMyTurn, setIsMyTurn] = useState(false); // true: 내가 맞추는 턴 / false : 상대방이 맞추는 턴
  const [playTurn, setPlayTurn] = useState(0); // 짝수: ai 턴 / 홀수 : 유저 턴
  const [imgSrc, setImgSrc] = useState(drawingImg); // null로 해야함
  const [winner, setWinner] = useState(null); // true : 플레이어 승 / false : ai 승
  const [score, setScore] = useState(0);

  useEffect(() => {
    // api 요청 -> 누구 턴인 지, 그림 반환
    const res = true; // 테스트용 -> false로 바꾸면 관전모드

    setIsMyTurn(res);
    //setImgSrc(img); // 이미지 세팅
  }, []);

  useEffect(() => {
    // 턴이 종료되면 작동
    if (playTurn !== 6) return;

    if (!winner) {
      calculateScore(playTurn);
    }

    // 결과 반환 api
    // 게임 종료 모달 띄우기

    // 다음 scene으로 넘어가기
    goToNextScene();
  }, [playTurn]);

  const nextGameHandler = () => {
    goToNextScene();
  };

  // 플레이어 정답 제출 함수
  const submitHandler = () => {
    //api 요청(정답 제출)

    const isCorrect = false;
    if (!isCorrect) {
      // 플레이어 오답
      setPlayTurn(playTurn + 1);
    } else {
      calculateScore(playTurn);
      setPlayTurn(6); // 게임 종료
      setWinner(true);
    }
  };

  // ai 턴에 정답 결과 요청 함수
  useEffect(() => {
    if (playTurn % 2 == 1) return; // 플레이어 턴에는 작동 x
    //api 요청(정답유무 반환)

    // const isCorrect = false;
    // if (!isCorrect) { // ai 오답
    //   setPlayTurn(playTurn + 1);
    // } else {
    //   calculateScore(playTurn);
    //   setPlayTurn(6); // 게임 종료
    //   setWinner(false);
    // }
  }, [playTurn]);

  const calculateScore = (currentTurn) => {
    // 현재 턴을 기반으로 점수 계산
    setScore(1000);
  };

  // 테스트용 - ai 턴 넘기기 용
  const turnHandler = () => {
    setPlayTurn(playTurn + 1);
  };

  return (
    <div className="battle-scene-container">
      <button onClick={turnHandler}>ai턴 넘기기</button>
      <div className="layout">
        <div className="user-container">
          <div className="user">
            <img src={userImg} />
          </div>
        </div>

        <div className="drawing-container">
          {/* 상대방 그림이 api를 통해 수신될 경우 출력 */}
          <div className="drawing">{imgSrc && <img src={imgSrc} />}</div>
          {isMyTurn ? (
            <div>
              {playTurn % 2 == 1 ? (
                <div>
                  {/** 테스트 환경에서는 duration을 변경 / 타이머가 끝나면 자동 제출 */}
                  <Timer duration={10} setFlow={submitHandler} />
                  <span>정답을 적어주세요</span>
                  <input></input>
                  <button onClick={submitHandler}>제출</button>
                </div>
              ) : (
                <div>
                  <span>ai가 맞추는 중입니다.</span>
                </div>
              )}
            </div>
          ) : (
            <div>상대 턴이니까 구경이나 해라</div>
          )}
        </div>
        <div className="ai-container">
          <img src={aiImg} />
          <div className="ai"></div>
        </div>
      </div>
      <button onClick={nextGameHandler}>제시어 맞추기 종료</button>
    </div>
  );
};

export default BattleScene;
