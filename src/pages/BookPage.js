import React, { useEffect, useState } from "react";
import {  Link } from "react-router-dom";


const BookPage = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:8500/all-books");
      const data = await response.json();

      setBooks(data.data.book);
      console.log("API response data:", data.data.book);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  return (
   <>
        <div className="container-fluid">
        {
          loading ? (
            <h5 className='text-center text-bg-secondary py-3'>Loading Product Page...</h5>
          ) : (
            <div>
              {/*   Search Product  */}
              <div className="row justify-content-center mt-3 mb-3">
                <div className="col-sm-8">
                  <div>
                    <h5 className="text-center mt-3">Product Page </h5>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    // onChange={searchHandle}
                    id="inputSearch"
                    placeholder="🔍 Search Your Product"
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
                              
                              
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="4">No Products available.</td>
                        </tr>
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