/**
 * 오프닝 애니메이션 파트
 */

import { useEffect, useState } from "react";
import useGame1Store from "stores/useGame1Store";
import sleep from "utils/sleep";

const OpeningPart = () => {
    const { nextPart } = useGame1Store();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleOpeningAnimation = async () => {
            setIsVisible(true); // 페이드인 효과 시작
            await sleep(2000); // 2초 동안 애니메이션 유지
            setIsVisible(false); // 페이드아웃 효과
            await sleep(1000); // 1초 후에 다음 단계로 이동
            nextPart();
        };

        handleOpeningAnimation();
    }, []);

    return (
        <div style={{ ...styles.container, opacity: isVisible ? 1 : 0 }}>
            <div style={styles.logo}>🎨</div>
            <div style={styles.text}>Game Start!</div>
        </div>
    );
};

export default OpeningPart;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        color: "black",
        fontSize: "24px",
        fontWeight: "bold",
        transition: "opacity 1s ease-in-out",
    },
    logo: {
        fontSize: "80px",
        animation: "scaleUp 1s ease-in-out infinite alternate",
    },
    text: {
        marginTop: "10px",
        fontSize: "28px",
        animation: "fadeIn 1s ease-in-out",
    }
};
