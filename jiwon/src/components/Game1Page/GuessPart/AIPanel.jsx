/**
 * AI 캐릭터 존재 패널
 */

import AIImg from "assets/AI.png";

const AIPanel = () => {
  return (
    <div style={styles.container}>
      {/* 닉네임 (상단) */}
      <div style={styles.nickName}>AI</div>

      {/* 프로필 이미지 (중앙) */}
      <div style={styles.imageContainer}>
        <img src={AIImg} alt="Player Profile" style={styles.profileImage} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "20%",
    textAlign: "center",
    border: "solid 1px black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  nickName: {
    background: "#fff",
    padding: "5px 10px",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  profileImage: {
    width: "300px",
    height: "300px",
    objectFit: "contain",
  },
};
  
export default AIPanel;
  