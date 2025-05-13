import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [supplier, setSupplier] = useState('');
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    const res = await axios.get('https://product-management-app-mi71.onrender.com/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !supplier || !productName) return alert('All fields are required');

    if (editId) {
      const res = await axios.put(`https://product-management-app-mi71.onrender.com/products/${editId}`, {
        code,
        supplier,
        productName,
      });
      setProducts(products.map(p => (p._id === editId ? res.data : p)));
      setEditId(null);
    } else {
      const res = await axios.post('https://product-management-app-mi71.onrender.com/products', {
        code,
        supplier,
        productName,
      });
      setProducts([...products, res.data]);
    }

    setCode('');
    setSupplier('');
    setProductName('');
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://product-management-app-mi71.onrender.com/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  const handleEdit = (product) => {
    setCode(product.code);
    setSupplier(product.supplier);
    setProductName(product.productName);
    setEditId(product._id);
  };

  const filteredProducts = products.filter(p =>
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.supplier.toLowerCase().includes(search.toLowerCase()) ||
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Product Entry</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Supplier"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">{editId ? 'Update' : 'Save'}</button>
      </form>

      <input
        type="text"
        placeholder="Search by code, supplier or product name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <h3>Product List</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Supplier</th>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td>{p.code}</td>
              <td>{p.supplier}</td>
              <td>{p.productName}</td>
              <td>
                <button onClick={() => handleEdit(p)} style={{ marginRight: '0.5rem' }}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
