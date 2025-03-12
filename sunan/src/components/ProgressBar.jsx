import { Posterize } from "konva/lib/filters/Posterize";

const ProgressBar = ({ timeLeft, totalTime = 30 }) => {
  const percentage = (timeLeft / totalTime) * 100;
  const barColor = timeLeft <= 5 ? "red" : "limegreen";

  return (
    <div style={progressBarContainer}>
      <div
        style={{
          ...progressBar,
          width: `${percentage}%`,
          backgroundColor: barColor,
        }}
      />
      <span>{timeLeft} 초</span>
    </div>
  );
};

const progressBarContainer = {
  marginTop: "25px",
  position: "relative",
  width: "900px",
  height: "30px",
  backgroundColor: "silver",
  borderRadius: "8px",
  border: "1px solid black",
};

const progressBar = {
  height: "100%",
  borderRadius: "8px",
  transition: "width 1s linear",
};

export default ProgressBar;
