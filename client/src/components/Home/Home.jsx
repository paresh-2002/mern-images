import React, { useState, useEffect } from "react";
import axios from "axios";
import AddImage from "./AddImage";
import "./home.css";

const Home = () => {
  const [images, setImages] = useState([]);

  // Function to fetch images from the server
  const getImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/images");
      setImages(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to delete an image from the server
  const deleteImage = async (id) => {
    const res = await axios.delete(`http://localhost:5000/images/${id}`);
    getImages();
    alert("Image deleted successfully" );
    if (!res.success) return { status: false, message: res.message };
    setImages(images.filter((image) => image._id !== id));
  }

  useEffect(() => {
    getImages(); // Load images when the component is mounted
  }, []);

  return (
    <div>
      <div className="dashboard">
        <div className="header">
          <div>
            <AddImage getImages={getImages} />
          </div>
        </div>
        
        {/* Image container with scroll functionality */}
        <div id="imageContainer">
          {images?.map((image) => (
            <div key={image._id} className="image-item">
              <button
                className="delete-btn"
                onClick={() => deleteImage(image._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
              <img src={image.image} alt="Uploaded" className="uploaded-image" />
              <p className="image-date">{new Date(image.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
