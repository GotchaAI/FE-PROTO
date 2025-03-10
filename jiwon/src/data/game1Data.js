/**
 * game시작시 전달되는 게임정보들.
 * 제한시간날짜와 제시어들, 플레이어 정보가 제공됨.
 */

import profileSample from "assets/cryingdryice.png";
import profileSample2 from "assets/rival.png";

const now = new Date(); // 현재 시간

const gameData = {
  maxRounds: 3, // 총 라운드 수
  currentTurn: 1, // 1 = AI가 답변 / 2 = Player가 답변
  limitDate: new Date(now.getTime() + 30 * 1000),
  words: { // 제시어 및 정답
    1: {
        player1: "망치",
        player2: "냉장고"
    },
    2: {
        player1: "고양이",
        player2: "강아지"
    },
    3: {
        player1: "하트",
        player2: "별"
    }
  },

  // 플레이어 1 정보 (선공)
  player1Info: {
    profileImage: profileSample,
    nickname: "cryingdryice",
    speechComment: "이게 뭘까...",
  },

  // 플레이어 2 정보 (후공)
  player2Info: {
    profileImage: profileSample2,
    nickname: "pantom",
    speechComment: "너무 어렵잖아!",
  },
};

export default gameData;
