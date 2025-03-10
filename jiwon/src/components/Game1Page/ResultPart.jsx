/**
 * 게임 결과 파트
 * 모든 라운드가 종료된 후 호출됨
 */


const ResultPart = () => {

  return (
    <div style={styles.container}>
      <button onClick={() => alert("바이요")}>나가기</button>
      <button onClick={() => alert("한판 더!")}>한판 더</button>
      <button onClick={() => alert("신고함 ㅅㄱ")}>신고하기</button>
      <button onClick={() => alert("상세보기")}>상세보기</button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  },
};

export default ResultPart;