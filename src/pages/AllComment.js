import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/bookAPI';
import RatingDisplay from "../components/RatingDisplay";


const AllComment = ({ rating }) => {


    const [userreview, setUserReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { id } = useParams();
    console.log("book Id", id)

    useEffect(() => {
        getBookReview(id);
    }, [id]);



    const getBookReview = async (bookId) => {
        try {
            // Fetch token from localStorage
            const token = JSON.parse(localStorage.getItem("user")).token

            const response = await api.get(`/books/get-reviews/${bookId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
            const data = response.data;
            console.log(data)

            if (response.status === 200) {
                setUserReview(data.data.reviews);
            } else {
                setError("Error fetching book reviews data");
            }
        } catch (error) {
            console.error("Error fetching book reviews data:", error);
            setError("Error fetching book reviews data");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const token = JSON.parse(localStorage.getItem("user")).token;
            console.log("comment Id", reviewId)
            const response = await api.delete(`/books/delete-review/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Delete Comment", response.data.message);

            if (response.status === 200) {
                alert("Comment Deleted")
                setUserReview((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
            } else {

                console.error("Unexpected status code:", response.status);
                setError("Error deleting review");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            setError("Error deleting review");
        }
    };


    if (loading) {
        return <h6 className='text-center text-bg-secondary py-3'>Loading Comment...</h6>;
    }

    return (
        <div>

            {/* **************  Get User Reviews  ************* */}
            <section >
                <div className="container px-4 px-lg-5 my-5 bg-light rounded">
                    <div className="row gx-4 gx-lg-5 align-items-center rounded">
                        <div className="col-md-12 py-2">
                            <h3 className='text-center mt-2'>All Comment from this book</h3>
                        </div>
                        <div className="col-md-12 py-2">
                            <h5 className='text-start mt-2'>Customer Reviews</h5>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 align-items-center rounded">
                        <div className="col-md-12">
                            {error && <p>Error: {error}</p>}

                            <div>
                                {Array.isArray(userreview) && userreview.length > 0 ? (
                                    userreview.map((review) => (
                                        <div className="col mb-3 " key={review._id}>
                                            <div className="d-flex justify-content-between mb-2">
                                                <div>
                                                    <span className="me-4"> {review.username}</span>
                                                    <RatingDisplay rating={review.rating} />
                                                    <p className="text-black"> {review.comment}</p>
                                                    <span> {review.date}</span>
                                                </div>
                                                <div>
                                                    <button onClick={() => handleDeleteReview(review._id)} className="btn btn-outline-danger">Delete Button</button>
                                                </div>

                                            </div>

                                            <hr />
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AllComment