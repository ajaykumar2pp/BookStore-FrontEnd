import React from "react";
import './App.css';
import NavbarComp from './components/NavbarComp';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import PrivateComp from './components/PrivateComp';
import Home from "./pages/Home";
import AuthorBook from "./pages/AuthorBook";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import AllBookPage from "./pages/AllBookPage";
import UpdateBook from "./pages/UpdateBook";
import CommentComp from "./components/CommentComp";
import ReviewComp from "./components/ReviewComp";

function App() {
  return (
    <BrowserRouter>
      <NavbarComp />
      <ToastContainer />
      <Routes>
        <Route element={<PrivateComp />}>
          <Route path="/author/books" element={<AuthorBook />} />
          <Route path="/all-book" element={<AllBookPage />} />
          <Route path="/books/addBook" element={<AddBook />} />
          <Route path="/book/update-book/:_id" element={<UpdateBook />} />

          <Route path="/book/:id" element={<BookDetail />}>
            <Route path="comment" element={<CommentComp />} />
            <Route path="review" element={<ReviewComp />} />
          </Route>

        </Route>


        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>



    </BrowserRouter>
  );
}

export default App;
