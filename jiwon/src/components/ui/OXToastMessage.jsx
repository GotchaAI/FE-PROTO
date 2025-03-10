/**
 * O/X 토스트 메시지 컴포넌트
 * 토스트스토어에 의해 호출됨
 */

import { useEffect } from "react";
import useToastStore from "stores/useToastStore";

const OXToastMessage = () => {
  // Zustand를 통해 OX 메시지 관련 상태 가져오기
  const { oxMessage, setOXMessage } = useToastStore();

  // O/X 메시지가 표시되면 2초 후 자동으로 숨기는 효과 적용
  useEffect(() => {
    if (oxMessage) {
      const timer = setTimeout(() => {
        setOXMessage(null); // 2초 후 O/X 메시지를 숨김
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [oxMessage, setOXMessage]);

  // O/X 메시지가 없으면 아무것도 렌더링하지 않음
  if (!oxMessage) return null;

  return (
    <div style={{ ...styles.toast, color: oxMessage === "O" ? "green" : "red" }}>
      {oxMessage} {/* O 또는 X 표시 */}
    </div>
  );
};

export default OXToastMessage;

const styles = {
  toast: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "800px",
    fontWeight: "bold",
  },
};
