import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import store from "./Utils/Store"
import AuthProvider from "react-auth-kit";
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import RequireAdmin from "./Utils/RequireAdmin"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Welcome from "./Pages/Welcome/Welcome"
import Login from "./Pages/Welcome/Login"
import Signup from "./Pages/Welcome/Signup"
import Home from "./Pages/Land/Home"
import Favorites from "./Pages/Land/Favorites"
import Trending from "./Pages/Land/Trending"
import ComingSoon from "./Pages/Land/ComingSoon"
import MovieManagement from "./Pages/Admin/MovieManagement"
import Layout from "./Components/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Signup",
    element: <Signup />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/Home",
        element: (
          <RequireAuth fallbackPath={'/'}>
            <Home />
          </RequireAuth>
        )
      },
      {
        path: "/Favorites",
        element: (
          <RequireAuth fallbackPath={'/'}>
            <Favorites />
          </RequireAuth>
        )
      },
      {
        path: "/Trending",
        element: (
          <RequireAuth fallbackPath={'/'}>
            <Trending />
          </RequireAuth>
        )
      },
      {
        path: "/ComingSoon",
        element: (
          <RequireAuth fallbackPath={'/'}>
            <ComingSoon />
          </RequireAuth>
        )
      },
      {
        path: "/MovieManagement",
        element: (
          <RequireAdmin>
            <MovieManagement />
          </RequireAdmin>
        )
      }
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
