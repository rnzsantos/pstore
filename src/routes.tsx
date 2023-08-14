import { createBrowserRouter } from 'react-router-dom';
import Cart from './pages/Cart';
import Error from './pages/Error';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductDetails from './pages/ProductDetails';
import Register from './pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'cart', element: <Cart /> },
      { path: 'orders', element: <Orders /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

export default router;
