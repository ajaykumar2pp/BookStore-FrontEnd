import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/bookAPI';
import RatingDisplay from "./RatingDisplay";


const ReviewComp = ({ rating }) => {


    const [userreview, setUserReview] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const { id } = useParams();
    // console.log(id)

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
                                            <div className="d-flex mb-2">
                                                <span className="me-4"> {review.username}</span>
                                                <RatingDisplay rating={review.rating} />
                                            </div>
                                            <p className="text-black"> {review.comment}</p>
                                            <span> {review.date}</span>
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

export default ReviewComp

