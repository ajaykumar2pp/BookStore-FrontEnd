import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages/AddBook.css';

const AddBook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];

    // Display image preview
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    } else {
      setImagePreview(null);
    }

    // Update state with selected image
    setImage(selectedImage);
  };


  const handleSave = async (e) => {
    console.log(bookTitle,authorName, price, content, image);
    e.preventDefault();
    if (!bookTitle ||!authorName || !price || !content || !image) {
      setError(true)
      return false;
    }
    try {
      const author_id = JSON.parse(localStorage.getItem("user")).data.user._id;
      console.log(author_id);

      setImagePreview(URL.createObjectURL(image));


      // Use FormData to send multipart/form-data
      const formData = new FormData();
      formData.append("bookTitle", bookTitle);
      formData.append("authorName", authorName);
      formData.append("price", price);
      formData.append("content", content);
      formData.append("author_id", author_id);
      formData.append("image", image);

      const response = await axios.post("http://localhost:8500/books/addBook",
        formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log(response.data);
      alert("Book Add");

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
    <>
      <div className="container-fluid" >
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 ">
            <h5 className="text-center mt-4 text-body-tertiary">Add Book  </h5>
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
                {error && !bookTitle && <div className="valid text-danger">Plz valid book title</div>}
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
                {error && !authorName && <div className="valid text-danger">Plz valid author name</div>}
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
                {error && !price && <div className="valid text-danger">Plz valid price</div>}
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
                  style={{height:"100px"}}
                />
                {error && !content && <div className="valid text-danger">Plz valid content</div>}
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
                  aria-describedby="image"
                  onChange={handleFileChange}
                />

                {error && !image && <div className="valid text-danger">Plz upload image</div>}
              </div>
              <div>
                {imagePreview && (
                  <div className="mb-3">
                    <label className="form-label">Image Preview</label>
                    <img src={imagePreview} alt="Preview" className="img-preview img-fluid" />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-primary mb-5 fw-bold"
                onClick={handleSave}
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddBook