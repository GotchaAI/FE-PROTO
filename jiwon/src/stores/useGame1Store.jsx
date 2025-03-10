/**
 * 게임1의 진행 정보를 모두 가지고있는 스토어
 * 라운드, 플레이어 정보들, 제시어 및 그림 정보 등등..
 */

import { create } from "zustand";
import useUserStore from "./useUserStore";

const useGame1Store = create((set, get) => ({
  part: "opening", // 현재 게임 진행 파트
  round: 1, // 현재 라운드
  maxRounds: 3, // 총 라운드 수
  currentTurn: 1, // 1 = AI가 답변 / 2 = Player가 답변
  maxAttempts: 3, // 각 플레이어의 최대 정답 시도 횟수
  aiAttempts: 0, // AI 시도 횟수
  playerAttempts: 0, // 플레이어 시도 횟수
  isCorrect: false, // 정답 여부
  isPlayer1: false, // player1인지

  limitDate : null, // 그림 제출을 위한 제한시간날짜
  words: {}, // 제시어들(정답들)
  player1Info: {}, // 플레이어1 정보
  player2Info: {}, // 플레이어2 정보
  AIAnswers: {}, // AI 정답 (각 라운드마다 하나씩 추가됨)
  pictures: {}, // 플레이어가 그린 그림들 (각 라운드마다 하나씩 추가됨)

  // AI 정답 데이터를 현재 라운드에 추가 (외부에서 데이터를 받아옴)
  addAIAnswers: (aiAnswersData) => {
    set((state) => {
      const round = state.round;
      const newAIAnswers = {
        ...state.AIAnswers,
        [round]: aiAnswersData.AIAnswers[round], // 현재 라운드의 AI 정답 추가
      };
      return { AIAnswers: newAIAnswers };
    });
  },

  // 플레이어 그림 데이터를 현재 라운드에 추가 (외부에서 데이터를 받아옴)
  addPictures: (picturesData) => {
    set((state) => {
      const round = state.round;
      const newPictures = {
        ...state.pictures,
        [round]: picturesData.pictures[round],
      };
      return { pictures: newPictures };
    });
  },

  // 현재 라운드의 정답 가져오기
  getCorrectAnswer: () => {
    const { round, part, words } = get();
    return part === "guessingP1" ? words[round]?.player1 : words[round]?.player2;
  },

  // 게임 데이터 초기화
  initGameData: (gameData) => {
    const userNickname = useUserStore.getState().nickname;

    set({
      part: "opening",
      round: 1,
      maxRounds: gameData.maxRounds,
      currentTurn: 1,
      aiAttempts: 0,
      playerAttempts: 0,
      isCorrect: false,
      isPlayer1: gameData.player1Info.nickname === userNickname, // true이면 player1인 상태(선공).

      limitDate: gameData.limitDate,
      words: gameData.words,
      player1Info: gameData.player1Info,
      player2Info: gameData.player2Info,
      AIAnswers: {},
      pictures: {},
    });
  },

  // 제한 시간 설정 함수 (외부에서 Date 객체를 받음)
  setLimitDate: (date) => {
    set({ limitDate: date });
  },

  // 게임 진행 상태를 다음 단계로 변경하는 함수
  nextPart: () => {
    set((state) => {
      if (state.part === "opening") { 
        return { part: "drawing" }; // 오프닝 → 그림 그리기 단계
      }
  
      if (state.part === "drawing") {
        return { part: "loading" }; // 그림 그리기 → 로딩 단계
      }
  
      if (state.part === "loading") {
        return { part: "guessingP1", aiAttempts: 0, playerAttempts: 0, isCorrect: false, currentTurn: 1 };
      }
  
      if (state.part === "guessingP1") {
        if (state.isCorrect || (state.aiAttempts >= state.maxAttempts && state.playerAttempts >= state.maxAttempts)) {
          state.isPlayer1 = !state.isPlayer1; // 턴 변경 (P1 ↔ P2)
          return { part: "guessingP2", aiAttempts: 0, playerAttempts: 0, isCorrect: false, currentTurn: 1 };
        }
        return state.currentTurn === 1
          ? { currentTurn: 2, aiAttempts: state.aiAttempts + 1 }
          : { currentTurn: 1, playerAttempts: state.playerAttempts + 1 };
      }
  
      if (state.part === "guessingP2") {
        if (state.isCorrect || (state.aiAttempts >= state.maxAttempts && state.playerAttempts >= state.maxAttempts)) {
          state.isPlayer1 = !state.isPlayer1; // 턴 변경 (P1 ↔ P2)
          if (state.round >= state.maxRounds) {
            return { part: "result" }; // 모든 라운드 종료 → 결과 화면으로 이동
          }
          return { part: "loading2" }; // P2 정답 맞추기 → 로딩2 단계
        }
        return state.currentTurn === 1
          ? { currentTurn: 2, aiAttempts: state.aiAttempts + 1 }
          : { currentTurn: 1, playerAttempts: state.playerAttempts + 1 };
      }
  
      if (state.part === "loading2") {
        return { part: "drawing", round: state.round + 1, aiAttempts: 0, playerAttempts: 0, isCorrect: false, currentTurn: 1 }; // 로딩2 끝남 → 그림 그리기 단계
      }
  
      return {};
    });
  },
  
  // 정답을 맞춘 경우 상태 업데이트
  setCorrect: () => set({ isCorrect: true, aiAttempts: 3, playerAttempts: 3 }),

}));

export default useGame1Store;
