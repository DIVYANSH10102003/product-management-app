import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    supplier: '',
    productName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      alert('Product saved!');
      setFormData({ code: '', supplier: '', productName: '' });
    } catch (err) {
      alert('Error saving product');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '20px auto' }}>
      <h2>Add Product</h2>
      <input
        name="code"
        placeholder="Code"
        value={formData.code}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        name="supplier"
        placeholder="Supplier"
        value={formData.supplier}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
        required
      /><br /><br />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
