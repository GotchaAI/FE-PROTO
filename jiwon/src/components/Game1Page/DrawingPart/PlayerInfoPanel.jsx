/**
 * 게임플레이 중인 상대 플레이어 정보 패널
 */

import useGame1Store from "stores/useGame1Store";
import useUserStore from "stores/useUserStore";

const PlayerInfoPanel = () => {
  const { player1Info, player2Info } = useGame1Store();
  const { nickname } = useUserStore();
  // 플레이어 번호에 따라 상대 플레이어 찾기
  const opponentInfo = player1Info.nickname === nickname ? player2Info : player1Info;

  return (
    <div style={styles.container}>
      {/* 상단 - 상대 플레이어 제목 */}
      <div style={styles.title}>상대 플레이어</div>

      {/* 프로필 이미지 & 말풍선 */}
      <div style={styles.profileContainer}>
        <img src={opponentInfo.profileImage} style={styles.profileImage} />
        <div style={styles.speechBubble}>{opponentInfo.speechComment}</div>
      </div>

      {/* 하단 - 닉네임 */}
      <div style={styles.nickname}>{opponentInfo.nickname}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
  profileContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: "300px",
    height: "300px",
  },
  speechBubble: {
    position: "absolute",
    right: "-20px",
    top: "60px",
    border: "solid black 1px",
  },
  nickname: {
    textAlign: "center",
  },
};

export default PlayerInfoPanel;
