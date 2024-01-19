import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import api from "../../api/bookAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GetAuthor.css'

const GetAuthor = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const colors = [
        "#2962ff",
        "#36bea6",
        "#f62d51",
        "#ffbc34",
        "#E2171797",
        "#3944F797",
        "#4DD63797",
        "#F7CD2E97",
        "#8D3DAF97",
        "#E07C2497",
        "#35BDD097",
        "#0D0D0D97",
    ];


    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        // Fetch token from localStorage
        const token = JSON.parse(localStorage.getItem("user")).token

        try {
            const response = await api.get("http://localhost:8500/users",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            // console.log(response)
            const users = response.data.data;
            console.log(users)
            if (response.status === 200) {
                setUsers(users);
            } else {
                setError("Error fetching user data");
            }
        } catch (error) {
            console.log(error)

        }
    }

    const userName = (user) => {
        const name = user.username.split(" ");
        return name.length === 2 ? name[0][0] + name[1][0] : name[0][0] + name[0][1];
    };

    const deleteUser = async (id) => {
        const token = JSON.parse(localStorage.getItem("user")).token
        try {
            const response = await api.delete(`/users/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
            // console.log(response)
            const users = response.data.data;
            // console.log(users)
            if (response.status === 200) {
                toast.success("User deleted successfully");
                getUsers();
            } else {
                const errorMessage = response.data?.message || "Error deleting user data";
                setError(errorMessage);
            }
        } catch (error) {
            console.error("Error deleting user:", error.message);
            setError("Error deleting user data");
        }
    }

    const blockUser = async (id) => {
        const token = JSON.parse(localStorage.getItem("user")).token;
        
        try {
            const response = await api.post(`/users/${id}/block`, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
    
            if (response.status === 200) {
                console.log("User blocked successfully");
            } else {
                const errorMessage = response.data?.message || "Error blocking user";
                console.error(errorMessage);
            }
        } catch (error) {
            console.error("Error blocking user:", error.message);
        }
    };


    return (
        <div className="container-fluid px-4 px-lg-5 mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className=" mb-5">
                        <h3 className="text-center fw-bold text-danger">All Users</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    {users.length > 0 ? (
                        <Table responsive striped bordered hover variant="light">
                            <thead className='text-center'>
                                <tr>

                                    <th>Username</th>
                                    <th>Email Id</th>
                                    <th>Block User</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {Array.isArray(users) && users.map((user, index) => (
                                    <tr key={user._id}>
                                        <td className='d-flex align-items-center'>
                                            <div className="contactAvatar" style={{ backgroundColor: colors[index % colors.length] }}>
                                                <span className='text-white'>{userName(user)}</span>
                                            </div>
                                            <div className="ms-3">
                                                {user.username}
                                            </div>
                                        </td>

                                        <td className='align-middle'>
                                            <span className='p-2 rounded text-white' style={{
                                                backgroundColor: colors[index % colors.length],
                                                display: 'inline-block',
                                            }}>
                                                {user.email}
                                            </span>
                                        </td>

                                        <td className='align-middle'>
                                            <Button variant="danger" onClick={() => blockUser(user._id)} >
                                                Block
                                            </Button>
                                        </td>
                                        <td className='align-middle'>
                                            <Link to={`/admin/user/${user._id}/edit`} className="btn btn-primary mt-auto">
                                                Edit
                                            </Link>
                                        </td>
                                        <td className='align-middle'>
                                            <Button variant="danger" onClick={() => deleteUser(user._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <h4 className="text-center text-secondary fw-bold">No users available.</h4>
                    )}

                </div>

            </div>
        </div>
    )

}

export default GetAuthor