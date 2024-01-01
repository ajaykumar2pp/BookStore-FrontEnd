import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa';

const RatingDisplay = ({ rating }) => {
    const filledColor = 'green';
    const emptyColor = 'grey';

    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar
            size={25}
                key={i}
                style={{ color: i < rating ? filledColor : emptyColor, marginRight: '2px' }}
            />
        );
    }


    return <div>{stars}</div>;
};

export default RatingDisplay