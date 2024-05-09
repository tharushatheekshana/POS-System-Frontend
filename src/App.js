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
import Orders from "./Orders";
import About from "./About";
import Contact from "./Contact";
import Help from "./Help";
import Reports from "./Reports";
import Cart from "./Cart";
import Stocks from "./Stocks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </BrowserRouter>
      {/* You can adjust the styling of the ToastContainer */}
      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
}

export default App;
