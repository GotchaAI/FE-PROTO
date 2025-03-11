import { useEffect, useRef, useState } from "react";

const useCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [penActive, setPenActive] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    // 캔버스 크기 설정
    canvas.width = 1200;
    canvas.height = 1200;
    canvas.style.width = "600px";
    canvas.style.height = "600px";

    const context = canvas.getContext("2d");
    context.scale(2, 2);

    // 기본 선 스타일
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    // 흰색 배경 초기화
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextRef.current = context;
  }, []);

  const startDrawing = (e) => {
    if (!penActive && !eraserActive) return;
    setIsDrawing(true);
    contextRef.current.beginPath();
    contextRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    if (eraserActive) {
      contextRef.current.strokeStyle = "white";
      contextRef.current.lineWidth = 20;
    } else {
      contextRef.current.strokeStyle = "black";
      contextRef.current.lineWidth = 5;
    }

    contextRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  const togglePen = () => {
    setPenActive(true);
    setEraserActive(false);
  };

  const toggleEraser = () => {
    setEraserActive(true);
    setPenActive(false);
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const getImage = () => {
    const canvas = canvasRef.current;

    // 새로운 캔버스 생성하여 흰색 배경 포함시키기
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const newContext = newCanvas.getContext("2d");

    newContext.fillStyle = "white";
    newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
    newContext.drawImage(canvas, 0, 0);

    return newContext;
  };

  return {
    canvasRef,
    isDrawing,
    startDrawing,
    draw,
    stopDrawing,
    penActive,
    eraserActive,
    togglePen,
    toggleEraser,
    handleClearCanvas,
    getImage,
  };
};

export default useCanvas;
