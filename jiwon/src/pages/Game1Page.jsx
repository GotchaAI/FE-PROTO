/**
 * 게임1페이지
 * 각 파트별로 다른 컴포넌트를 호출
 * 여러 종류의 파트가 있을 수 있지만 한 번에 하나만 렌더링됨
 * opening, drawing, loading, guessingP1, guessingp2, loading2, result로 구성
 */

import DrawingPart from "components/Game1Page/DrawingPart";
import GuessPart from "components/Game1Page/GuessPart";
import ResultPart from "components/Game1Page/ResultPart";
import { useEffect } from "react";
import useGame1Store from "stores/useGame1Store";
import LoadingPart from "components/Game1Page/LoadingPart";
import OpeningPart from "components/Game1Page/OpeningPart";
import LoadingPart2 from "components/Game1Page/LoadingPart2";

const Game1Page = () => {
    // Zustand를 사용하여 게임의 상태를 가져옴
    const { part, nextPart, isCorrect, playerAttempts, maxAttempts } = useGame1Store();

    // 정답을 맞추거나 최대 시도 횟수에 도달하면 자동으로 다음 단계로 이동
    useEffect(() => {
        if (isCorrect || playerAttempts >= maxAttempts) {
            nextPart(); // 다음 파트로 이동
        }
    }, [isCorrect, playerAttempts]);

    // 현재 게임 상태(part)에 따라 적절한 컴포넌트를 렌더링하는 함수
    const renderPart = () => {
        switch (part) {
            case "opening":
                return <OpeningPart />; // 게임 오프닝 화면
            case "drawing":
                return <DrawingPart />; // 플레이어가 그림을 그리는 화면
            case "loading":
                return <LoadingPart />; // 서버와 데이터 교환하는 로딩
            case "guessingP1":
            case "guessingP2":
                return <GuessPart />; // 플레이어가 정답을 맞추는 단계
            case "loading2":
                return <LoadingPart2 />; // 서버와 데이터 교환하는 로딩
            case "result":
                return <ResultPart />; // 게임 결과 화면
            default:
                return <div>에러</div>;
        }
    };

    return <div style={styles.container}>{renderPart()}</div>;
};

export default Game1Page;

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
    },
};
