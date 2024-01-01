import React from 'react'
import { Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './RatingInput.css'

const RatingInput = ({ values, handleChange, handleBlur, touched, errors }) => {

    const handleStarHover = (index) => {
        const radioInput = document.getElementById(`rating${index + 1}`);
        radioInput && radioInput.classList.add('hovered');
    };

    const handleStarLeave = (index) => {
        const radioInput = document.getElementById(`rating${index + 1}`);
        radioInput && radioInput.classList.remove('hovered');
    };

    return (
        <div className="mb-3">
            <Form.Label>Rating</Form.Label> <br />
            {[...Array(5)].map((_, index) => (
                <div key={index}
                    className="star-container d-inline-block"
                    onMouseEnter={() => handleStarHover(index)}
                    onMouseLeave={() => handleStarLeave(index)} >
                    <Form.Control
                        type="radio"
                        className="visually-hidden"
                        id={`rating${index + 1}`}
                        name="rating"
                        placeholder={`Enter Your Rating ${index + 1}`}
                        checked={values.rating === (index + 1)}
                        value={index + 1}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.rating && errors.rating}
                    />

                    <label
                        htmlFor={`rating${index + 1}`}
                        className={`d-inline-block star-icon ${values.rating >= (index + 1) ? 'selected' : ''}`}
                    >
                        <FaStar size={30} />
                    </label>
                </div>
            ))}
            <Form.Control.Feedback className="text-danger" type="invalid">
                {errors.rating}
            </Form.Control.Feedback>
        </div>
    )
}

export default RatingInput