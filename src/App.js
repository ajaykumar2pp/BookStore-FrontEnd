import React from "react";
import './App.css';
import NavbarComp from './components/NavbarComp';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import Home  from "./pages/Home";
import BookPage from "./pages/BookPage";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import AllBookPage from "./pages/AllBookPage";

function App() {
  return (
    <BrowserRouter>
    <NavbarComp />
    <ToastContainer/>
    <Routes>
    <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/books" element={<BookPage/>} />
      <Route path="/all-book" element={<AllBookPage/>} />
      <Route path="/books/addBook" element={<AddBook/>} />
      <Route path="/book/:id" element={<BookDetail />} />
    </Routes>
    {/* <FooterComp /> */}
  </BrowserRouter>
  );
}

export default App;
