import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useFormik } from 'formik';
import { validationReviewSchema } from '../validations/reviewSchema';
import Form from 'react-bootstrap/Form';
import api from '../api/bookAPI'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RatingInput from "./RatingInput";

const CommentComp = () => {

    const { id } = useParams();
    // console.log(id)

    const navigate = useNavigate();

    const { handleChange, handleSubmit, handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            username: '',
            email: '',
            rating: '',
            comment: '',
            bookId: id,
        },
        validationSchema: validationReviewSchema,
        onSubmit: async (values, action) => {
            console.log(values);

            try {
                const response = await api.post("/books/review", {
                    username: values.username,
                    email: values.email,
                    rating: values.rating,
                    comment: values.comment,
                    bookId:values.bookId
                });

                console.log(response.data);
                toast.success('Comment Successfully!');
                navigate("/all-book");
            } catch (error) {

                // Network errors or other issues
                toast.error(`Error logging in: ${error.message}`);
                console.error('Error logging in:', error.message);
            } finally {
                action.resetForm();
            }
        },
    });
    return (
        <>
            <section className="py-3">
                <div className="container px-4 px-lg-5 my-5 bg-light">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-12 py-2">
                            <h4 className='text-center'>Book Comment</h4>
                            {/* Form Review   */}
                            <Form className="mb-5 border border-primary p-4 m-3 rounded" onSubmit={handleSubmit}>
                                {/* name  */}
                                <div className="mb-3">
                                    <Form.Label> Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        placeholder="Enter Your Name"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.username && errors.username}
                                    />
                                    <Form.Control.Feedback className="text-danger" type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </div>
                                {/* email */}
                                <div className="mb-3">
                                    <Form.Label> Email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control  "
                                        id="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                    />
                                    <Form.Control.Feedback className="text-danger" type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </div>
                                {/* Rating */}
                                <RatingInput
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={touched}
                                    errors={errors}
                                />
                                {/* comment */}
                                <div className="mb-3">
                                    <Form.Label>  Comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        className="form-control"
                                        id="comment"
                                        name="comment"
                                        placeholder="Enter Your Comment"
                                        value={values.comment}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.comment && errors.comment}
                                        style={{ height: '100px' }}
                                    />
                                    <Form.Control.Feedback className="text-danger" type="invalid">
                                        {errors.comment}
                                    </Form.Control.Feedback>
                                </div>
                                <div className="d-grid gap-2 col-6 text-center mx-auto">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-secondary mb-4  text-opacity-75">
                                        Submit
                                    </button>
                                </div>

                            </Form>


                            <Link className="btn btn-outline-dark flex-shrink-0 mt-4 px-5" to="/all-book" >
                                Go Back
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CommentComp