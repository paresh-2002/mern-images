import React, { useState } from "react";
import axios from "axios";
import "./home.css"; // Make sure to include this stylesheet

const AddImage = ({ getImages }) => {
  const [image, setImage] = useState(null);  // Set initial value to null for better handling
  const [loading, setLoading] = useState(false);  // For managing loading state
  const [error, setError] = useState("");  // For error messages

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/images/upload-image/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(res.data.message);
      setImage(null);
      getImages();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Error uploading image. Please try again."); 
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Upload Your Image</h1> {/* Main title above the upload form */}
      
      <div className="add-image-container">
        <form onSubmit={onSubmit} className="add-image-form">
          <div className="input-wrapper">
            <input
              id="addNewImage"
              type="file"
              className="addImage-input"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"  // Restrict input to images
            />
            <i className="fas fa-upload input-icon"></i>
          </div>

          {image && (
            <div className="image-preview">
              <p>{image.name}</p> {/* Show the image file name */}
              <img
                src={URL.createObjectURL(image)} 
                alt="Preview"
                className="preview-img"
              />
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="upload-button" disabled={loading}>
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddImage;
