/**
 * 제시어 패널
 */

const SubjectPanel = ({ word }) => {
  return (
    <div style={styles.container}>
      <div style={styles.title}>제시어</div>
      <div style={styles.wordBox}>{word}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
  },
  wordBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "300px",
    border: "1px solid black",
    textAlign: "center",
    fontSize: "100px",
    fontWeight: "bold",
  },
};

export default SubjectPanel;
