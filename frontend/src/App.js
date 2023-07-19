import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  CheckoutPage,
  PaymentPage,
  Success,
  OrderDetailsPage,
  TrackOrderPage,
} from "./routes/Routes";

import {
  ShopHomePage,
  ShopDashboard,
  Products,
  DashboardEvents,
  DashboardInbox,
  DashboardOrders,
  Settings,
  Refunds,
  Cupouns,
  WithdrawMoney,
  CreateEvent,
  Dashboard,
  Profile,
  Address,
  ChangePassword,
  CreateProduct,
  TrackOrders,
  AllRefundOrders,
  AllOrders,
  Inbox,
  ShopOrderDetails,
} from "./routes/shopRoutes.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/protectedRoute";
import SellerProtectedRoute from "./routes/sellerProtectedRoute";
import { loadSeller } from "./redux/actions/seller";
import { getAllProducts } from "./redux/actions/product";
import { getAllEvents } from "./redux/actions/event";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
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
        <Route path="/success" element={<Success />} />

        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/all-orders" element={<AllOrders />} />
          <Route path="/profile/refunds" element={<AllRefundOrders />} />
          <Route path="/profile/inbox" element={<Inbox />} />
          <Route path="/profile/track-orders" element={<TrackOrders />} />
          <Route path="/profile/change-password" element={<ChangePassword />} />
          <Route path="/profile/address" element={<Address />} />
        </Route>

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
        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />

        <Route
          element={
            <SellerProtectedRoute>
              <ShopDashboard />
            </SellerProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orders" element={<DashboardOrders />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/product-create" element={<CreateProduct />} />
          <Route path="/dashboard/events" element={<DashboardEvents />} />
          <Route path="/dashboard/create-event" element={<CreateEvent />} />
          <Route path="/dashboard/withdraw-money" element={<WithdrawMoney />} />
          <Route path="/dashboard/inbox" element={<DashboardInbox />} />
          <Route path="/dashboard/cupouns" element={<Cupouns />} />
          <Route path="/dashboard/refunds" element={<Refunds />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
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
