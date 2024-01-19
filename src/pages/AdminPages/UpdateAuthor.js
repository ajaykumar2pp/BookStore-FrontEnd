import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import api from '../../api/bookAPI'

const UpdateAuthor = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        admin: "",
    });
      const navigate = useNavigate();
    const params = useParams();
    // console.log(params)

    useEffect(() => {
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        try {
            const response = await api.get(`/users/${params.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response)

            const userData = response.data;
            console.log(userData);

            // Assuming the API response structure has properties like username, email, admin
            setUserDetails({
                name: userData.username,
                email: userData.email,
                admin: userData.isAdmin,
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("user")).token;

        try {

            const response = await api.put(`/update-users/${params.id}`, userDetails, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(response.data.message);
            navigate("/admin/users");

        } catch (error) {
            console.log(error);
            toast.error("Error updating user details");
        }
    };

    return (
        <div className="container-fluid px-4 px-lg-5 mt-3">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className=" mb-5">
                        <h3 className="text-center fw-bold text-danger">Update User</h3>
                    </div>
                </div>
                <div className="col-md-8 ">
                    {/* ... (existing form code) */}
                    <form className="mb-5 border border-primary p-4 m-3 rounded" onSubmit={handleSubmit}>
                        {/* ... (existing form fields) */}
                        {/* Name */}
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                                aria-describedby="bookName"
                                value={userDetails.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">
                                Email
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                aria-describedby="authorName"
                                value={userDetails.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Admin */}
                        <div className="mb-3">
                            <label htmlFor="admin" className="form-label fw-bold">
                                Admin
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="admin"
                                name="admin"
                                placeholder="Enter Admin"
                                aria-describedby="bookPrice"
                                value={userDetails.admin}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary mb-5 fw-bold"
                            >
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default UpdateAuthor;

