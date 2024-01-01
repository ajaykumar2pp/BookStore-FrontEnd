import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/bookAPI";
import "./UpdateBook.css";


const UpdateBook = () => {

  const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const userName = JSON.parse(localStorage.getItem("user")).data.user.username;

  const params = useParams();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    //update image state
    setImage(selectedImage)

    // Create preview URL
    const previewURL = URL.createObjectURL(selectedImage);

    // Update state with selected image
    setImagePreview(previewURL);
  };

  useEffect(() => {
    getBookDetails();
  }, [])

  const getBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8500/books/${params._id}`);
      const data = await response.json();
      console.log("Single Book data:", data);
      setBookTitle(data.bookTitle);
      setPrice(data.price);
      setContent(data.content);
      setAuthorName(data.authorName);
      setImageUrl(data.image);
    } catch (error) {
      console.error("Error fetching product data:", error);

    }
  };


  const UpdateBook = async (e) => {
    console.log(bookTitle, authorName, price, content, image);
    e.preventDefault();
  
    try {
      // Use FormData to send multipart/form-data
      const formData = new FormData();
      formData.append("bookTitle", bookTitle);
      formData.append("authorName", authorName);
      formData.append("price", price);
      formData.append("content", content);
      formData.append("image", image);

      const updateBook = await api.put(`/books/${params._id}`,
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log(updateBook.data);
      alert("Update Book");

      navigate("/all-book");
    } catch (error) {
      console.error("Error during API call:", error);
    }
    // Reset the form inputs
    setBookTitle("");
    setAuthorName("");
    setPrice("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };


  return (

    <div className="container-fluid" >
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 ">
          <h5 className="text-center mt-4 text-body-tertiary">Update Book  by Author : {userName}</h5>
          {/* form   */}
          <form className="mb-5 border border-primary p-4 m-3 rounded">
            {/* Book Title  */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Book Title
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="bookTitle"
                placeholder="Enter Book Title"
                aria-describedby="bookName"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
             
            </div>
            {/* Author Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Author Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Author Name"
                aria-describedby="authorName"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
             
            </div>
            {/* Price */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="Enter Book Price"
                aria-describedby="bookPrice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              
            </div>

            {/* content*/}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Content
              </label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                placeholder="Enter Book Content"
                aria-describedby="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ height: "100px" }}
              />
              
            </div>
            {/* Image uplaod */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                Image Upload
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                aria-describedby="image"
                onChange={handleImageChange}
              />

              
            </div>
            <div lassName="d-flex justify-content-between">
              <div>
                {/* Previous Image */}
                {imageUrl && (
                  <div className="mb-3 img-preview-container">
                    <label className="form-label img-preview-label">Previous Image</label>
                    <img src={imageUrl} alt="Previous Product Image" className="preview-image mb-2 img-fluid" />
                  </div>
                )}
              </div>
              <div>
                {/* Newly Selected Image Preview */}
                {imagePreview && (
                  <div className="mb-3 img-preview-container">
                    <label className="form-label img-preview-label">Upload Image Preview</label>
                    <img src={imagePreview} alt="Preview" className="preview-image img-fluid" />
                  </div>
                )}
              </div>

            </div>
            <button
              type="submit"
              className="btn btn-primary mb-5 fw-bold"
              onClick={UpdateBook}
            >
              Update Book
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default UpdateBook