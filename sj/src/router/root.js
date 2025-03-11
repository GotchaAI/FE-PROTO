import { createBrowserRouter } from "react-router-dom";
import GamePage from "../page/GamePage";
import MainPage from "../page/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "game",
        element: <GamePage />,
      },
    ],
  },
]);

export default router;
