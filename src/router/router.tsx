import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/notFound";
import AuthGuard from "../guards/guards";
import Verification from "../view/verification/verification";
import Login from "../view/login/login";
import Register from "../view/register/register";
import RecoveryPassword from "../view/recoveryPassword/recoveryPassword.tsx";
import Password from "../view/password/password";
import Home from "../view/home";
import Dashboard from "../view/dashboard/dashboard";
import Offer from "../view/offer/offer";
import Contact from "../view/contact/contact";
import Favorite from "../view/favorit/favorite";
import Cart from "../view/cart/cart";
import Terms from "../view/terms/terms";
import FollowUp from "../view/follow-up/follow-up";
import Orders from "../view/orders/orders";
import Privacy from "../view/privacy/privacy";
import Faqs from "../view/faqs/faqs";
import Payment from "../view/payment/payment";
import Returns from "../view/returns/returns";
import History from "../view/history/history";
import Blog from "../view/blog/blog";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/recovery-password", element: <RecoveryPassword /> },
    { path: "/password", element: <Password /> },
    { path: "verification", element: <Verification /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/offer", element: <Offer /> },
    { path: "/contact", element: <Contact /> },
    { path: "/favorite", element: <Favorite /> },
    { path: "/cart", element: <Cart /> },
    { path: "/terms", element: <Terms /> },
    { path: "/follow-up", element: <FollowUp /> },
    { path: "/orders", element: <Orders /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/faqs", element: <Faqs /> },
    { path: "/returns", element: <Returns /> },
    { path: "/payment", element: <Payment /> },
    { path: "/history", element: <History /> },
    { path: "/blog", element: <Blog /> },

    { path: "/authguard", element: <AuthGuard /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplat: true,
    },
  }
);

export default router;
