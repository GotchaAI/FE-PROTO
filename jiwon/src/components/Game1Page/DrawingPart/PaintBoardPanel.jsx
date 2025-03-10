/**
 * 그림판 패널 컴포넌트
 * 실제로 그림이 그려지는 그림판 컴포넌트를 가지고 있음
 */

import { useState } from "react";
import PaintBoard from "components/Game1Page/DrawingPart/PaintBoardPanel/PaintBoard";

const PaintBoardPanel = () => {
  const [tool, setTool] = useState("pencil");
  const [clearCanvas, setClearCanvas] = useState(null);

  return (
    <div style={styles.container}>
      {/* 그리기 관련 도구 버튼 존재 */}
      <div style={styles.toolbar}>
        <button onClick={() => setTool("pencil")} style={styles.button}>연필</button>
        <button onClick={() => setTool("eraser")} style={styles.button}>지우개</button>
        <button onClick={() => clearCanvas && clearCanvas()} style={styles.button}>전체 지우기</button>
      </div>

      {/* 그림판 컴포넌트 */}
      <PaintBoard tool={tool} setClearCanvas={setClearCanvas} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbar: {
    display: "flex",
  },
  button: {
    cursor: "pointer",
  },
};

export default PaintBoardPanel;
