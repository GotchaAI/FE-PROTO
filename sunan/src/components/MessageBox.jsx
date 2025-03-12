import "../styles/components/MessageBox.scss";
import ultronImage from "../assets/ultron.jpg";
import { useEffect, useState } from "react";

const MessageBox = ({ timeLeft }) => {
  let message = null;
  const [showOpening, setShowOpening] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  //오프닝 띄우는 로직임
  useEffect(() => {
    if (timeLeft <= 29) {
      setFadeOut(true);
      setTimeout(() => {
        setShowOpening(false);
      }, 1000);
    }
  }, [timeLeft]);
  // 초 별로 원하는 문구띄우기
  if (timeLeft == 0) {
    message = "⏰ Time Over";
  } else if (timeLeft == 5) {
    message = "시간이 얼마 남지 않았어요!";
  } else if (timeLeft <= 29) {
    message = "AI를 속이며 제한 시간 내에 제시어를 그려주세요!";
  }

  return (
    <div>
      {message && <div className="message-box">{message}</div>}
      {showOpening && (
        <div className={`opening-box ${fadeOut ? "fade-out" : ""}`}>
          <img src={ultronImage} alt="Ultron" className="ultron-img" />
          <span className="start-ment">Game Start</span>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
