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
import SubCategoryAdmin from "../view/admin/subcategory/adminSubCategory";
import Category from "../view/category";
import Guarantee from "../view/guarantee/guarantee";
import ShippingPolicies from "../view/shippingPolicies/shippingPolicies";
import ReturnPolicies from "../view/returnPolicies/returnPolicies";
import LegalNotice from "../view/legalNotice/legalNotice";
import CookiesPolicy from "../view/cookies/cookies";
import TermsOfSale from "../view/termsOfSale/termsOfSale";
import Count from "../view/count/count";
import Account from "../view/admin/count/count";
import SubCategoryForm from "../components/admin/subcategory/subCategoryForm";
import CategoryForm from "../components/admin/category/categoryForm";
import SupplierForm from "../components/admin/supplier/supplierForm";
import ArticleForm from "../components/admin/article/articleForm";
import ArticleFormOffer from "../components/admin/article/articleFormOffer";
import BlogAdmin from "../view/admin/blog/adminBlog";
import FormBlog from "../components/admin/blog/formBlog";
import OtherCar from "../view/cart/otherCar";
import ThankYou from "../view/thank/thank";
import Discount from "../view/admin/discount/discount";
import FormDescuento from "../components/admin/discount/formDescuento";
import OurCategories from "../view/ourCategories/ourCategories";
import ComentarioAdmin from "../view/admin/comment/comment";
import Order from "../view/order/order";
import DataUser from "../view/dataUser/dataUser";

const router = createBrowserRouter(
  [
    // Rutas principales
    { path: "/", element: <Home /> },
    { path: "/tienda", element: <Category /> },
    { path: "/nuestas-categorias", element: <OurCategories /> },

    // Rutas de autenticación
    { path: "/iniciar-sesion", element: <Login /> },
    { path: "/registro", element: <Register /> },
    { path: "/verificacion", element: <Verification /> },
    { path: "/correo", element: <Email /> },
    { path: "/recuperar-contrasena", element: <Password /> },
    { path: "/otro-carrito", element: <OtherCar /> },

    // Rutas de usuario
    { path: "/favoritos", element: <Favorite /> },
    { path: "/carrito", element: <Cart /> },
    { path: "/order/:accion?/:subaccion?", element: <Order/> },
    { path: "/comprar", element: <Buy /> },
    { path: "/direccion", element: <Address /> },
    { path: "/datos-personales", element: <DataUser /> },
    { path: "/comentarios", element: <Comment /> },
    { path: "/cuenta/:accion?", element: <Count /> },
    { path: "/thank", element: <ThankYou /> },

    // Rutas de información
    { path: "/contacto", element: <Contact /> },
    { path: "/garantia", element: <Guarantee /> },
    { path: "/politicas-envio", element: <ShippingPolicies /> },
    { path: "/politicas-devoluciones", element: <ReturnPolicies /> },
    { path: "/aviso-legal", element: <LegalNotice /> },
    { path: "/cookies", element: <CookiesPolicy /> },
    { path: "/terminos-venta", element: <TermsOfSale /> },
    { path: "/terminos", element: <Terms /> },
    { path: "/privacidad", element: <Privacy /> },
    { path: "/preguntas-frecuentes", element: <Faqs /> },
    { path: "/historial", element: <History /> },
    { path: "/blog", element: <Blog /> },

    // Rutas del admin
    {
      path: "/",
      element: <Admin />,
      children: [
        { path: "inicio", element: <HomeAdmin /> },
        { path: "categorias", element: <CategoryAdmin /> },
        { path: "form-categorias", element: <CategoryForm /> },
        { path: "subcategorias", element: <SubCategoryAdmin /> },
        { path: "form-subcategorias", element: <SubCategoryForm /> },
        { path: "proveedores", element: <SupplierAdmin /> },
        { path: "form-proveedores", element: <SupplierForm /> },
        { path: "articulos", element: <ArticleAdmin /> },
        { path: "form-articulos", element: <ArticleForm /> },
        { path: "form-articulo-descuento", element: <ArticleFormOffer /> },
        { path: "ofertas", element: <OfferAdmin /> },
        { path: "blog-admin", element: <BlogAdmin /> },
        { path: "form-blog", element: <FormBlog /> },
        { path: 'codigo-descuento', element: <Discount /> },
        { path: 'form-descuento', element: <FormDescuento /> },
        { path: "cuenta-admin", element: <Account /> },
        { path: "comentario-admin", element: <ComentarioAdmin /> },
      ]
    },

    // Ruta de error
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
