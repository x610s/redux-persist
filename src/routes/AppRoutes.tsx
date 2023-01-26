import { createBrowserRouter } from "react-router-dom";
import { PersistentDrawerLeft } from "../pages/home";
import { TransferenciasList } from "../pages/transferencias";
import { Login } from "../pages/auth/login";
import { ProtectedLogin, ProtectedRoute } from "./guards/RouteGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute children={<PersistentDrawerLeft />} />,
    children: [
      {
        path: "/",
        element: <TransferenciasList />,
      },
    ],
  },
  {
    path: "/login",
    element: <ProtectedLogin children={<Login />} />,
  },
]);
