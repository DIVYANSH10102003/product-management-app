import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/data')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            {item.name} - {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
