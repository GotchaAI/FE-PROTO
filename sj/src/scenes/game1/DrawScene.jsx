import React, { useEffect, useState } from "react";
import Timer from "../../commons/Timer";
import useCanvas from "../../hooks/useCanvas";
import "../../styles/game/game1/DrawScene.scss";
import GameEndScene from "../GameEndScene";
import GameReadyScene from "../GameReadyScene";
import GameStartScene from "../GameStartScene";

/**
 * DrawScene : 그림 그리기 scene
 *
 * 제시어를 제공받고 제공되는 시간동안 그림을 그리는 scene
 *
 * 핵심 상태 flow 를 활용해서 모달창 및 게임이 진행된다.
 *
 */

const DrawScene = ({ topic, round, goToNextScene }) => {
  const {
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    penActive,
    eraserActive,
    togglePen,
    toggleEraser,
    handleClearCanvas,
    getImage,
  } = useCanvas();

  const [flow, setFlow] = useState(0); // 0:게임준비 1:게임시작 2:게임종료 3: 제출 및 다음 씬 이동
  const [duration, setDuration] = useState(30);
  const [isDrawingDisabled, setIsDrawingDisabled] = useState(false); // 그림 기능 비활성화

  // 게임 종료 처리
  useEffect(() => {
    if (flow == 3) {
      if (!isDrawingDisabled) {
        // 아직 제출 안 한 경우
        setIsDrawingDisabled(true); // 그림 그리기 비활성화
        // 그림 자동 제출 로직
      }

      const endTimer = setTimeout(() => {
        // 그림 제출 및 서버 신호 올 경우 다음 씬으로
        goToNextScene();
      }, 3000);

      return () => clearTimeout(endTimer);
    }
  }, [flow, goToNextScene]);

  // 제출 핸들러
  const submitHandler = () => {
    const image = getImage();

    // 그림 먼저 제출 api
    setIsDrawingDisabled(true);
  };

  return (
    <div className="draw-scene-container">
      {/* 토스트 메세지 그룹 */}
      <>
        {flow === 0 && (
          <GameReadyScene
            setFlow={() => setFlow((prev) => prev + 1)}
            setDuration={setDuration}
          />
        )}
        {flow === 1 && (
          <GameStartScene setFlow={() => setFlow((prev) => prev + 1)} />
        )}
        {flow === 3 && (
          <GameEndScene setFlow={() => setFlow((prev) => prev + 1)} />
        )}
      </>

      {/* 타이머 */}
      <Timer
        duration={duration}
        flow={flow}
        setFlow={() => setFlow((prev) => prev + 1)}
      />

      {/* 버튼 그룹 */}
      <div className="draw-option-container">
        <button
          onClick={togglePen}
          style={{ backgroundColor: penActive ? "lightgray" : "white" }}
          disabled={isDrawingDisabled} // ✅ 그림 비활성화 시 버튼 비활성화
        >
          ✏️
        </button>
        <button
          onClick={toggleEraser}
          style={{ backgroundColor: eraserActive ? "lightgray" : "white" }}
          disabled={isDrawingDisabled} // ✅ 그림 비활성화 시 버튼 비활성화
        >
          🧽
        </button>
        <button onClick={handleClearCanvas} disabled={isDrawingDisabled}>
          🗑
        </button>
        <button onClick={submitHandler} disabled={isDrawingDisabled}>
          📤 제출하기
        </button>
      </div>

      {/* 캔버스 */}
      <div className="drawing-container">
        <div className="game-header">
          <span className="game-round">round {round}</span>
          <span>제시어 : {flow !== 0 ? topic : "???"}</span>{" "}
        </div>

        <canvas
          className="drawing-zone"
          ref={canvasRef}
          onMouseDown={isDrawingDisabled ? null : startDrawing}
          onMouseUp={isDrawingDisabled ? null : stopDrawing}
          onMouseMove={isDrawingDisabled ? null : draw}
        />
      </div>
    </div>
  );
};

export default DrawScene;
