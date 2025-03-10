/**
 *  토스트 메시지 컴포넌트
 *  토스트스토어에 의해 호출됨
 */

import { useEffect, useState } from "react";
import useToastStore from "stores/useToastStore";

const Toast = () => {
  // Zustand를 통해 토스트 메시지 관련 상태 가져오기
  const { message, isVisible } = useToastStore();
  
  const [toastStyle, setToastStyle] = useState({ ...styles.container, ...styles.hide });

  // isVisible 상태에 따라 토스트 메시지의 스타일 변경
  useEffect(() => {
    if (isVisible) {
      setToastStyle({ ...styles.container, ...styles.show });
    } else {
      setToastStyle({ ...styles.container, ...styles.hide });
    }
  }, [isVisible]);

  return <div style={toastStyle}>{message}</div>;
};

export default Toast;

const styles = {
  container: {
    position: "fixed",
    bottom: "500px",
    left: "50%",
    background: "rgba(0, 0, 0, 0.8)",
    color: "white",
    fontSize: "40px",
  },
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
};