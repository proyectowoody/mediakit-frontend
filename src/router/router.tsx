import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/notFound";
import AuthGuard from "../guards/guards";
import Verification from "../view/verification/verification";
import Login from "../view/login/login";
import Register from "../view/register/register";
import Email from "../view/email/email";
import Password from "../view/password/password";
import Home from "../view/home";

const router = createBrowserRouter(
  [
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/email", element: <Email /> },
    {path: "/password", element: <Password/>},
    { path: "verification", element: <Verification /> },

    { path: "/authguard", element: <AuthGuard /> },
  { path: "*", element: <NotFound /> }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplat: true,
    },
  }
);

export default router;
