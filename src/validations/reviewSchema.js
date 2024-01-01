import * as Yup from 'yup'
export const validationReviewSchema = Yup.object({
    username: Yup.string().min(2, 'Minimum 2 letters').max(50, 'Too long').matches(/^[a-zA-Z\s]+$/, 'Username must contain only letters').required("Name is required"),
    email: Yup.string().email('Invalid email format').required("Email is required"),
    rating: Yup.number().min(0, 'Please provide a rating of at least 0').max(5, 'Rating cannot be more than 5').required('Rating is required'),
    comment: Yup.string().min(2, 'Minimum 2 letters').max(50, 'Too long').matches(/^[a-zA-Z\s]+$/, 'Username must contain only letters').required("Comment is required"),
})