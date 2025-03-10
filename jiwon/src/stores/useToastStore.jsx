/**
 * 토스트 메시지를 다루는 스토어
 * 전역적으로 사용하는 기본 토스트와, ox를 표시하는 토스트 존재 
 */

import { create } from "zustand";

// Zustand를 사용하여 전역 상태 관리를 위한 Toast 스토어 생성
const useToastStore = create((set) => ({
  // 토스트 메시지 관련 상태 변수
  message: "", // 일반적인 토스트 메시지
  isVisible: false, // 토스트 메시지 표시 여부
  oxMessage: null, // O/X 표시를 위한 메시지 (정답 여부 표시 용도)

  // 일반적인 토스트 메시지를 표시하는 함수
  showToast: (message, duration = 1000) => {
    set({ message, isVisible: true }); // 메시지를 설정하고 토스트를 표시

    // 지정된 시간(duration) 후에 토스트 메시지를 숨김
    setTimeout(() => {
      set({ isVisible: false });
    }, duration);
  },

  // O/X 형태의 커스텀 토스트를 표시하는 함수
  showOXToast: (isCorrect) => {
    set({ oxMessage: isCorrect ? "O" : "X" }); // 정답 여부에 따라 "O" 또는 "X" 설정
  },

  // O/X 메시지를 수동으로 설정하는 함수
  setOXMessage: (message) => set({ oxMessage: message }),
}));

export default useToastStore;
