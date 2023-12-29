import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AllBookPage.css';

const AllBookPage = () => {
    const [allbooks, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getBooks();
      }, []);

      const getBooks = async () => {
        try {
          const response = await fetch("http://localhost:8500/all-books");
          const data = await response.json();
          if (response.status === 200) {
            setBooks(data.data.book);
          } else {
            setError("Error fetching book data");
          }
        } catch (error) {
          console.error("Error fetching product data:", error);
          setError("Error fetching book data");
          setBooks([]);
        } finally {
          setLoading(false);
        }
      };
  return (
    <>
    {loading && <h5 className='text-center text-bg-secondary py-3'>Loading Book Page...</h5>}
    {error && <h5 className='text-center text-bg-secondary py-3'>{error}</h5>}
    <section >
      <div className="container-fluid px-4 px-lg-5 mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className=" mb-5">
              <h3 className="text-center fw-bold text-danger">Online Books Available</h3>
            </div>
          </div>
        </div>
        <div className="row  gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {allbooks && allbooks.map((book) => (
            <div className="col mb-5" key={book._id}>
              <div className="card h-100">
                {/* Book image */}
                <div className="zoom-effect">
                <img className="card-img-top p-2" src={book.image} alt="oops" />
                </div>
                
                {/* Book details */}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Book name */}
                    <h5 className="fw-bolder">{book.bookTitle}</h5>
                     {/* Book name */}
                     <h6 className="">{book.authorName}</h6>
                    {/* Book price */}
                    ${book.price}
                  </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">
                    <Link to={`/book/${book._id}`} className="btn btn-outline-dark mt-auto">
                      View options
                    </Link>
                  </div>
                </div>
              </div>
            </div> 
          ))}
        </div>
      </div>
    </section>
  </>
  )
}

export default AllBookPage