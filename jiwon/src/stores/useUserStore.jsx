/**
 * 사용자 정보(나)를 저장하는 스토어
 * 게임에서 내가 어떤 플레이어인지 판단할 때 사용(아직까지는)
 */

import { create } from "zustand";
import profileSample from "assets/cryingdryice.png";

const useUserStore = create((set) => ({
  profileImage: profileSample,
  nickname: "cryingdryice",
  speechComment: "이게 뭘까..", // 말풍선 코멘트

  setProfileImage: (image) => set({ profileImage: image }),
  setNickname: (name) => set({ nickname: name }),
  setSpeechComment: (comment) => set({ speechComment: comment }),
}));

export default useUserStore;
