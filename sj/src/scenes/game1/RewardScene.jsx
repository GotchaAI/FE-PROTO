import { useNavigate } from "react-router-dom";

const RewardScene = () => {
  const navigate = useNavigate();

  const gameEndHandler = () => {
    // 게임 종료 api 로직

    // 대기방으로 이동
    navigate("/");
  };
  return (
    <div>
      <h1>보상 받자</h1>
      <button onClick={gameEndHandler}>게임 종료</button>
    </div>
  );
};

export default RewardScene;
