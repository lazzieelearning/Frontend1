import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productImage: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products/create', formData);
      navigate('/'); // Redirect to home after creation
    } catch (error) {
      console.error("There was an error creating the product!", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Price</label>
          <input
            type="number"
            className="form-control"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image URL</label>
          <input
            type="text"
            className="form-control"
            name="productImage"
            value={formData.productImage}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
