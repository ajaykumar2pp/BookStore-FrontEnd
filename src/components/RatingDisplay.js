import React from 'react'
import { FaStar } from 'react-icons/fa';

const RatingDisplay = ({ rating }) => {
    const filledColor = '#27ae60';
    const emptyColor = 'grey';

    const stars = [];

    for (let i = 0; i < 5; i++) {
        stars.push(
            <FaStar
            size={20}
                key={i}
                style={{ color: i < rating ? filledColor : emptyColor, marginRight: '2px' }}
            />
        );
    }


    return <div>{stars}</div>;
};

export default RatingDisplay