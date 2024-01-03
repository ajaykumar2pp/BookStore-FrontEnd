import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/bookAPI";
import './AuthorBook.css';
import Modal from 'react-bootstrap/Modal';
import { FaTrashCan } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { FaArrowDownWideShort } from "react-icons/fa6";

const AuthorBook = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openBookId, setOpenBookId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookId, setDeleteBookId] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const author_id = userData?.data?.user?._id;


  const fetchBooksByAuthorId = async () => {
    try {
      if (!author_id) {
        console.log('Author ID not found in localStorage');
        return;
      } else {
        console.log('Author ID found in localStorage');
      }
      const response = await api.get(`/books/author/${author_id}`);
      const data = response.data;
      console.log(data);

      if (data.data.books.length > 0) {
        setBooks(data.data.books);
        console.log("API response data:", data.data.books);
      } else {
        console.log('No books found for the specified author_id');
      }
    } catch (error) {
      console.error('Error fetching books by author_id:', error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingClick = (bookId) => {
    setOpenBookId((prevId) => (prevId === bookId ? null : bookId));
  };

  const handleDeleteClick = (bookId) => {
    setDeleteBookId(bookId);
    setShowDeleteModal(true);
  };

  const confirmDeleteBook = () => {
    api.delete(`/books/${deleteBookId}`).then((response) => {
      console.log("Delete Book", response.data);
      fetchBooksByAuthorId();
      setShowDeleteModal(false);
    }).catch((error) => {
      console.error("Error deleting book:", error);
      setShowDeleteModal(false);
    });
  };



  useEffect(() => {
    fetchBooksByAuthorId();
  }, []);

  return (
    <>
      <div className="container">
        {loading ? (
          <h5 className='text-center text-bg-secondary py-3'>Loading Author Book Page...</h5>
        ) : (
          <div>
            {/*   Search Book  */}
            <div className="row justify-content-center mt-3 mb-3">
              <div className="col-sm-8">
                <div>
                  <h5 className="text-center mt-3">Books By Author </h5>
                </div>

                <input
                  type="text"
                  className="form-control"
                  // onChange={searchHandle}
                  id="inputSearch"
                  placeholder="🔍 Search Your Book"
                  autoFocus
                />
              </div>
            </div>
            <div className="row gx-4 gx-lg-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {books && books.map((book) => (
                <div className="col mb-5" key={book._id}>
                  <div className="card h-100 card-btn">
                    <div className="zoom-effect">
                      <img className="card-img-top p-2" src={book.image} draggable="false" alt="oops" />
                    </div>
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{book.bookTitle}</h5>
                      </div>
                    </div>
                    <div className=" p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center d-flex justify-content-evenly">
                        <Link to={`/book/${book._id}`} className="btn btn-outline-dark mt-auto mr-2">
                          View Book
                        </Link>
                        <button onClick={() => handleSettingClick(book._id)}
                          className="btn btn-outline-dark mt-auto ml-2 btn-setting ">
                          <FaArrowDownWideShort />
                        </button>

                        {openBookId === book._id && (
                          <div className="options-list position-absolute end-0 mt-4 open-list">
                            <ul className="list-group">
                              <Link to={"/book/update-book/" + book._id}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                Update
                                <span className="ms-2"><BiSolidEdit /></span>
                              </Link>
                              <button onClick={() => handleDeleteClick(book._id)}
                                className="list-group-item list-group-item-action  d-flex justify-content-between align-items-center">
                                Delete
                                <span className="ms-2"><FaTrashCan /></span>
                              </button>

                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Delete Book Permanently?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you  want to delete this book.
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={confirmDeleteBook}>
                    Delete permenently
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default AuthorBook;
