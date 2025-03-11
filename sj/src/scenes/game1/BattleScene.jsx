const BattleScene = ({ goToNextScene }) => {
  const nextGameHandler = () => {
    goToNextScene();
  };
  return (
    <div>
      <h1>그림 맞추자</h1>
      <button onClick={nextGameHandler}>제시어 맞추기 종료</button>
    </div>
  );
};

export default BattleScene;
