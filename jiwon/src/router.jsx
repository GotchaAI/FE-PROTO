/**
 * 라우터 설정 파일
 * 게임시작 버튼이 존재하는 Game1Start와
 * 실제로 게임이 진행중인 Game1Page가 존재
 */

import Game1Page from "pages/Game1Page";
import Game1Start from "pages/Game1Start";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Game1Start />,
      },
      {
        path: '/room:game1room-number',
        element: <Game1Page />,
      },
    ],
  },
]);

export default router;