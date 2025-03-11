import { useNavigate } from "react-router-dom";
import "../styles/MainPage.scss";

const MainPage = () => {
  const navigate = useNavigate();

  const enterGameHandler = () => {
    // 대기방 소켓 입장

    // 대기방 정보 - 필요한가?
    const room_info = {};

    // 게임 시작 -> 서버 요청

    // 게임 정보(제시어 리스트) 반환
    const game_info = {
      total_round: 2,
      topic: ["코끼리", "사자"],
      user_info: [
        {
          user_id: 2,
          user_nickname: "김형준",
        },
      ],
    };

    navigate("./game", { state: game_info });
  };
  return (
    <div className="main-page-container">
      <h1> 프로토 타입 게임</h1>
      <button onClick={enterGameHandler}>게임 입장</button>
    </div>
  );
};

export default MainPage;
