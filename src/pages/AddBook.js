import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
    const [name, setName] = useState("");
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
    console.log(name, price,  content, image);
    e.preventDefault();
    if (!name || !price ||  !content || !image) {
      setError(true)
      return false;
    }
    try {
      const userId = JSON.parse(localStorage.getItem("user")).data.user._id;
      console.log(userId);

      setImagePreview(URL.createObjectURL(image));
      

      // Use FormData to send multipart/form-data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("content", content);
      formData.append("userId", userId);
      formData.append("image", image);

      const  response = await axios.post("http://localhost:8500/books/addBook",
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
    setName("");
    setPrice("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };
    return (
       <>
       
      <h5 className="text-center mt-4 text-body-tertiary">Add Book  </h5>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 ">
            {/* form   */}
            <form className="mb-5 border border-primary p-4 m-3 rounded">
              {/* name  */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Book Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter Product Name"
                  aria-describedby="nameUser"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <div className="valid text-danger">Plz valid name</div>}
              </div>
              {/* Price */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="Enter Product Price"
                  aria-describedby="ProductUser"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && <div className="valid text-danger">Plz valid price</div>}
              </div>
              
              {/* content*/}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  content
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                  placeholder="Enter Book Content"
                  aria-describedby="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                {error && !content && <div className="valid text-danger">Plz valid content</div>}
              </div>
              {/* Image uplaod */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
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
                className="btn btn-primary mb-5"
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