/**
 * Canvas로 구현한 그림판 컴포넌트
 * 실제로 그림이 그려지거나 지워짐
 */

import { useEffect, useRef, useState } from "react";

const PaintBoard = ({ tool, setClearCanvas }) => {
  const canvasRef = useRef(null); // 캔버스 요소 참조
  const ctxRef = useRef(null); // 캔버스의 2D 컨텍스트 참조
  const [isDrawing, setIsDrawing] = useState(false); // 현재 그림을 그리고 있는지 여부

  // 캔버스 초기 설정 및 클리어 기능 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";

    ctxRef.current = ctx;

    setClearCanvas(() => () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }, [setClearCanvas]);

  // 그림 그리기 시작점
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // 마우스를 이동시 그림이 그려짐
  const draw = (e) => {
    if (!isDrawing) return;

    const ctx = ctxRef.current;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : "#000000";
    ctx.lineWidth = tool === "eraser" ? 10 : 4;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  // 그림 그리기 중지
  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        width={1200}
        height={800}
        style={styles.canvas}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    border: "1px solid black",
  },
};

export default PaintBoard;
