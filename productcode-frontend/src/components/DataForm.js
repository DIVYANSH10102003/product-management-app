import React, { useState } from 'react';
import axios from 'axios';

const DataForm = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/data', { name, value });
      console.log('Data added:', res.data);
      setName('');
      setValue('');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Product</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br />
      <input
        type="text"
        placeholder="Product Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <br />
      <button type="submit">Add</button>
    </form>
  );
};

export default DataForm;
