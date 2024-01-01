import React, { useEffect, useState } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import apple from '../images/online-book.avif'


const BookDetail = () => {
  const { id } = useParams();
  // console.log(id)


  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    getBook(id);
  }, [id]);

  const getBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:8500/books/${bookId}`);
      const data = await response.json();
      // console.log(data)

      if (response.ok) {
        setBook(data);
      } else {
        setError("Error fetching book data");
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
      setError("Error fetching book data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h5 className='text-center text-bg-secondary py-3'>Loading Book Page...</h5>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddToCart = () => {

    console.log("Adding to cart:", book);
  };
  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img className="card-img-top mb-5 mb-md-0 p-2" src={book.image} alt="oops" />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">
                <h1 className="fs-2 "> {book.bookTitle}</h1>
                <h6 > <span className="badge bg-primary p-1">By Author</span> : {book.authorName}</h6>

              </div>

              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through me-3">Rs. 4500</span>
                <span>Rs. {book.price}</span>
              </div>
              <p className="lead">{book.content}</p>
              <div className="d-flex justify-content-between">
                <div className="d-flex border border-3  rounded border-secondary ">
                  <button className="btn  btn-sm px-3 px-sm-5" >-</button>
                  <input
                    className="form-control text-center border-white no-hover-effect text-black"
                    type="text"
                    value={2}
                    style={{ width: '20px', outline: 'none', padding: '5px'}}
                    readOnly
                  />
                  <button className="btn  btn-sm px-3 px-sm-5" >+</button>
                </div>
                <div>
                  <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={handleAddToCart}>

                    Add to cart
                  </button>
                </div>

              </div>
              <Link className="btn btn-outline-dark flex-shrink-0 mt-4 px-5" to="/all-book" >
                Go Back
              </Link>
            </div>
          </div>
        </div>
      </section>
      <hr />
      {/************  Description & Book Details & Reviews  **********/}
      <section>
        <div className="d-flex justify-content-evenly ">
          <Link  className="text-decoration-none fw-bold fs-5 text-secondary">Description</Link>
          <Link to="review" className="text-decoration-none fw-bold fs-5 text-secondary">Book Reviews</Link>
          <Link to="comment" className="text-decoration-none fw-bold fs-5 text-secondary">Comment</Link>
        </div>
      </section> 

      <section>
        <Outlet />
      </section>


      {/****************  Related book items section   *******************/}
      <section className="py-5 bg-light">
        <div className="container-fluid px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related books</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div className="col mb-5">
              <div className="card h-100">
                {/* Book image */}
                <img className="card-img-top p-2" src={apple} alt="..." />
                {/* Book details */}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Book name */}
                    <h5 className="fw-bolder">Fancy Product</h5>
                    {/* Product price */}
                    $40.00 - $80.00
                  </div>
                </div>
                {/* Book actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">View options</div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                {/* Product image */}
                <img className="card-img-top p-2" src={apple} alt="..." />
                {/* Product details */}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name */}
                    <h5 className="fw-bolder">Fancy Product</h5>
                    {/* Product price */}
                    $40.00 - $80.00
                  </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">View options</div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                {/* Product image */}
                <img className="card-img-top p-2" src={apple} alt="..." />
                {/* Product details */}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name */}
                    <h5 className="fw-bolder">Fancy Product</h5>
                    {/* Product price */}
                    $40.00 - $80.00
                  </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">View options</div>
                </div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                {/* Product image */}
                <img className="card-img-top p-2" src={apple} alt="..." />
                {/* Product details */}
                <div className="card-body p-4">
                  <div className="text-center">
                    {/* Product name */}
                    <h5 className="fw-bolder">Fancy Product</h5>
                    {/* Product price */}
                    $40.00 - $80.00
                  </div>
                </div>
                {/* Product actions */}
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div className="text-center">View options</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default BookDetail