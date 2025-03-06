import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/notFound";
import AuthGuard from "../guards/guards";
import Verification from "../view/verification/verification";
import Login from "../view/login/login";
import Register from "../view/register/register";
import Email from "../view/email/email";
import Password from "../view/password/password";
import Home from "../view/home";
import Dashboard from "../view/dashboard/dashboard";
import Contact from "../view/contact/contact";
import Favorite from "../view/favorit/favorite";
import Cart from "../view/cart/cart";
import Terms from "../view/terms/terms";
import FollowUp from "../view/follow-up/follow-up";
import Privacy from "../view/privacy/privacy";
import Faqs from "../view/faqs/faqs";
import History from "../view/history/history";
import Blog from "../view/blog/blog";
import Admin from "../components/admin/admin";
import HomeAdmin from "../view/admin/home/home";
import CategoryAdmin from "../view/admin/category/adminCategory";
import ArticleAdmin from "../view/admin/article/articleAdmin";
import SupplierAdmin from "../view/admin/supplier/adminSupplier";
import OfferAdmin from "../view/admin/article/offerAdmin";
import Buy from "../view/buy/buy";
import Address from "../view/address/address";
import Comment from "../view/comment/comment";

const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/email", element: <Email /> },
    { path: "/password", element: <Password /> },
    { path: "/verification", element: <Verification /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/favorite", element: <Favorite /> },
    { path: "/cart", element: <Cart /> },
    { path: "/buy", element: <Buy /> },
    { path: "/address", element: <Address /> },
    { path: "/comment", element: <Comment /> },
    { path: "/contact", element: <Contact /> },
    { path: "/terms", element: <Terms /> },
    { path: "/follow-up", element: <FollowUp /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/faqs", element: <Faqs /> },
    { path: "/history", element: <History /> },
    { path: "/blog", element: <Blog /> },

    // Rutas del admin
    {
      path: "/",
      element: <Admin />,
      children: [
        { path: "/home-admin", element: <HomeAdmin /> },
        { path: "/category-admin", element: <CategoryAdmin /> },
        { path: "/supplier-admin", element: <SupplierAdmin /> },
        { path: "/article-admin", element: <ArticleAdmin /> },
        { path: "/offer-admin", element: <OfferAdmin /> },
      ]
    },

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
