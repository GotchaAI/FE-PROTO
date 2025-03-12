import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import ProgressBar from "./ProgressBar";
import "../styles/components/DrawingCanvas.scss";
import "../styles/pages/GamePage.scss";
import MessageBox from "./MessageBox";
//만약 페이지로 구현한다면 전역변수로 기존 props주던거 관리하면됨
const DrawingCanvas = ({ timeLeft, roundNum, setRoundNum }) => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const handleMouseDown = (e) => {
    if (timeLeft <= 0) return;
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || timeLeft <= 0) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    setLines([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClearCanvas = () => {
    setLines([]);
  };

  const handleSendImage = () => {
    console.log("try send image");

    console.log("send image");
    const dataURL = stageRef.current.toDataURL({ mimeType: "image/png" });

    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeString });
    handleClearCanvas();
    setRoundNum((prev) => prev + 1);
    //postPNG(blob); 서버에 전송하는 로직
  };
  useEffect(() => {
    if (timeLeft === 0) {
      handleSendImage();
    }
  }, [timeLeft]);

  return (
    <div className="canvas-container" ref={canvasRef}>
      {/* 버튼 UI */}
      <div className="round-number">ROUND {roundNum}</div>
      <MessageBox timeLeft={timeLeft} />
      <div className="canvas-button-container">
        <button onClick={() => setTool("pen")} className="canvas-button">
          ✏️
        </button>
        <button onClick={() => setTool("eraser")} className="canvas-button">
          🧽
        </button>
        <button onClick={handleClearCanvas} className="canvas-button">
          🗑️
        </button>
      </div>

      <div className="canvas-layer-wrapper">
        <ProgressBar timeLeft={timeLeft} />
        <Stage
          ref={stageRef}
          width={1000}
          height={800}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="canvas-stage"
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.tool === "pen" ? "black" : "white"}
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <button className="submit-button" onClick={handleSendImage}>
        제출하기
      </button>
    </div>
  );
};

export default DrawingCanvas;
