import React from 'react'
import book from '../images/online-book.avif'
import {  Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <section className="py-lg-16 py-8 mt-5  bg-transparenttext-dark">
                <div className="container ">
                    <div className="row align-items-center ">
                        <div className="col-lg-6 mb-6 mb-lg-0">
                            <div>

                                <h1 className="display-3 fw-bold mb-3">Online <span className='text-danger'>Book Store</span>  Amazing Website</h1>
                                <p className="pe-lg-10 mb-5">
                                Welcome to our online book haven, where pages come to life and stories unfold. Immerse yourself in a world of literary wonders, where every genre is a journey waiting to be explored. From gripping tales of adventure to soul-stirring narratives of love and wisdom, our curated collection awaits your discovery.
                                </p>
                                <div className="text-center"> 
                                    <Link to="/" className="btn btn-primary">
                                        Create Your Book
                                    </Link>
                                    <Link to="/" className="btn btn-outline-danger fs-5 text-inherit ms-5 ">
                                       Demo Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-center align-items-center">
                            <img src={book} alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home