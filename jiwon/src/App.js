/**
 * 최상위 컴포넌트
 * 라우터 및 전역 토스트메시지 컴포넌트 존재
 */

import Toast from 'components/ui/Toast';
import { RouterProvider } from 'react-router';
import router from 'router';

function App() {
  return (
    <div className="App">
      <Toast />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
