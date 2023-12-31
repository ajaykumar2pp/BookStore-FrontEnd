import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import api from "../api/bookAPI";

const BookPage = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));
  // const author_id = userData?.data?.user?._id; 
  const author_id = userData.data.user._id
  console.log(author_id);

  useEffect(() => {
    fetchBooksByAuthorId ();
  }, [fetchBooksByAuthorId]);

  const fetchBooksByAuthorId  = async () => {
    try {
      if (!author_id) {
        console.log('Author ID not found in localStorage');
        return;
      }
      else{
        console.log('Author ID  found in localStorage');
      }
      const response = await api.get(`/books/author/${author_id}`);
      const data = response.data;
      console.log(data)

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

  const deleteBook = (id) => {
    api.delete(`/books/${id}`).then((response) => {
      console.log("Delete Book", response.data);
      fetchBooksByAuthorId ();
    }).catch((error) => {
      console.error("Error deleting book:", error);
    });
  };

  return (
   <>
        <div className="container-fluid">
        {
          loading ? (
            <h5 className='text-center text-bg-secondary py-3'>Loading Author Book Page...</h5>
          ) : (
            <div>
              {/*   Search Product  */}
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
              {/* ******  Product List *********** */}
              <div className="row justify-content-center mt-3">
                <div className="col-md-10">
                  <table className="table table-bordered border-danger mt-2">
                    <thead className="text-center fs-6">
                      <tr>
                        <th scope="col">Sr.No.</th>
                        <th scope="col">Image</th>
                        <th scope="col">Auhtor Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Content</th>
                        <th scope="col">Edit Book</th>
                        <th scope="col">Delete Book</th>
                      </tr>
                    </thead>
                    <tbody className="text-center fs-6">
                      {Array.isArray(books) && books.length > 0 ? (
                        books.map((item, index) => {
                          return (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>
                                <img src={item.image} alt={item.name} width="100" height="100" />
                              </td>
                              <td>{item.bookTitle}</td>
                              <td>{item.price}</td>
                              <td>{item.content}</td>
                              <td>
                                <Link
                                  className="btn btn-danger"
                                  to={"/book/update-book/" + item._id}
                                >
                                  update
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => deleteBook(item._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div>
                          {/* <td colSpan="4">No Books available.</td> */}
                          <p>No books found for the specified author_id</p>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        }

      </div>
   </>
  )
}

export default BookPage