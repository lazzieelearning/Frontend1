import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ productName: "", productPrice: "", productImage: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products/get");
      setProducts(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      productName: product.productName,
      productPrice: product.productPrice,
      productImage: product.productImage,
    });
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      fetchData(); // Refresh the product list
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/edit/${editProduct._id}`, formData);
      setEditProduct(null); // Clear the edit state
      fetchData(); // Refresh the product list
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {products.map((ele) => (
          <div className="col-md-4 col-sm-6" key={ele._id}>
            <div className="card">
              <div className="card-header text-center">
                <h2>{ele.productName}</h2>
              </div>
              <img
                src={ele.productImage}
                className="card-img-top"
                alt={ele.productName}
              />
              <div className="card-body text-center">
                <h5 className="card-title">${ele.productPrice}</h5>
              </div>
              <div className="card-footer text-center">
                <button type="button" className="btn btn-warning mx-1" onClick={() => handleEditClick(ele)}>
                  Edit
                </button>
                <button type="button" className="btn btn-danger mx-1" onClick={() => handleDeleteClick(ele._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editProduct && (
        <div className="mt-4">
          <h3>Edit Product</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                value={formData.productName}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Price</label>
              <input
                type="number"
                className="form-control"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleFormChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Image URL</label>
              <input
                type="text"
                className="form-control"
                name="productImage"
                value={formData.productImage}
                onChange={handleFormChange}
              />
            </div>
            <button type="submit" className="btn btn-success">Update Product</button>
            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
