/**
 * 플레이어가 제출한 그림이 보여지는 패널
 */

const PicturePanel = ({ drawingSample }) => {
  return (
    <div style={styles.container}>
      {drawingSample && (
        <img src={drawingSample} alt="Drawing Sample" style={styles.image} />)}
    </div>
  );
};

const styles = {
  container: {
    width: "60%",
    textAlign: "center",
    border: "solid 1px black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
};

export default PicturePanel;
