import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import {
  LoginPage,
  SellerLoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSelling,
  Events,
  FAQpage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreate,
  SellerActivationPage,
} from "./routes/Routes";

import { ShopHomePage, ShopDashboard } from "./routes/shopRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/protectedRoute";
import SellerProtectedRoute from "./routes/sellerProtectedRoute";
import { loadSeller } from "./redux/actions/seller";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login-user" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/events" element={<Events />} />
        <Route path="/faq" element={<FAQpage />} />
        {/* <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* shop routes */}
        <Route path="/login-seller" element={<SellerLoginPage />} />
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route
          path="/shop/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route path="/dashboard/*" element={ <ShopDashboard> <ShopHomePage /> </ShopDashboard>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};
export default App;
