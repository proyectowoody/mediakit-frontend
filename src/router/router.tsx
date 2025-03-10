import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/notFound";
import AuthGuard from "../guards/guards";
import Verification from "../view/verification/verification";
import Login from "../view/login/login";
import Register from "../view/register/register";
import Email from "../view/email/email";
import Password from "../view/password/password";
import Home from "../view/home";
import Contact from "../view/contact/contact";
import Favorite from "../view/favorit/favorite";
import Cart from "../view/cart/cart";
import Terms from "../view/terms/terms";
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
import SubCategoryAdmin from "../view/admin/adminSubCategory";
import Category from "../view/category";

const router = createBrowserRouter(
  [
    // ruta semi comun
    { path: "/", element: <Home /> },
    { path: "/tienda/:categoria?/:subcategoria?", element: <Category /> },

    //ruta de autenticacion
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/email", element: <Email /> },
    { path: "/password", element: <Password /> },
    { path: "/verification", element: <Verification /> },

    // rutas de usuario
    { path: "/favorite", element: <Favorite /> },
    { path: "/cart", element: <Cart /> },
    { path: "/buy", element: <Buy /> },
    { path: "/address", element: <Address /> },
    { path: "/comment", element: <Comment /> },

    // rutas de informacion
    { path: "/contact", element: <Contact /> },
    { path: "/terms", element: <Terms /> },
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
        { path: "/sub-category-admin", element: <SubCategoryAdmin /> },
        { path: "/supplier-admin", element: <SupplierAdmin /> },
        { path: "/article-admin", element: <ArticleAdmin /> },
        { path: "/offer-admin", element: <OfferAdmin /> },
      ]
    },

    // ruta de error
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
