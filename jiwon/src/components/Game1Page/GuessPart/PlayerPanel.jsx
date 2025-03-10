/**
 * 플레이어 캐릭터가 보여지는 패털
 */

import useGame1Store from "stores/useGame1Store";

const PlayerPanel = () => {
  const { player1Info, player2Info, part } = useGame1Store();

  // part에 따라 플레이어 정보 선택
  const player = part === "guessingP1" ? player2Info : player1Info;

  return (
    <div style={styles.container}>
      {/* 닉네임 (상단) */}
      <div style={styles.nickName}>{player.nickname}</div>

      {/* 프로필 이미지 (중앙) */}
      <div style={styles.imageContainer}>
        <img src={player.profileImage} alt="Player Profile" style={styles.profileImage} />
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

export default PlayerPanel;
