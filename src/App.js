import React from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Items from "./Items";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import CheckOut from "./CheckOut";
import About from "./About";
import Contact from "./Contact";
import Help from "./Help";
import Reports from "./Reports";
import Cart from "./Cart";
import Stocks from "./Stocks";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import { OrderProvider } from "./utils/OrderContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Orders from "./Orders/Orders";
import EditOrders from "./Orders/EditOrders";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <OrderProvider>
                  <>
                    <Navbar />
                    <Home />
                  </>
                </OrderProvider>
              }
            />
            <Route
              path="/items"
              element={
                <>
                  <Navbar />
                  <Items />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Navbar />
                  <CheckOut />
                </>
              }
            />
            <Route
              path="/Orders"
              element={
                <>
                  <Navbar />
                  <Orders />
                </>
              }
            />
            <Route
              path="/orders/editOrder/:id"
              element={
                <>
                  <Navbar />
                  <EditOrders />
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  <About />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                </>
              }
            />
            <Route
              path="/help"
              element={
                <>
                  <Navbar />
                  <Help />
                </>
              }
            />
            <Route
              path="/reports"
              element={
                <>
                  <Navbar />
                  <Reports />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <>
                  <Navbar />
                  <Cart />
                </>
              }
            />
            <Route
              path="/stocks"
              element={
                <>
                  <Navbar />
                  <Stocks />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" theme="colored" />
    </AuthProvider>
  );
}

export default App;
