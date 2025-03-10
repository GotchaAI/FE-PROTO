/**
 * 그림판 상단의 라운드, 코멘트, 타임바를 모아둔 컴포넌트
 */

const TopBarPanel = ({ round, comment }) => {
    return (
      <div style={styles.container}>
        <div style={styles.round}>라운드: {round}</div>
        <div style={styles.comment}>{comment}</div>
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
    round: {
      textAlign: "center",
      padding: "5px 0",
    },
    comment: {
      textAlign: "center",
    },
  };
  
  export default TopBarPanel;
  