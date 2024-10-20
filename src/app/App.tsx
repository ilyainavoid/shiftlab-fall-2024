import './styles/App.css';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/routing/Router.tsx';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
