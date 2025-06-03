import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setCategories(res.data));
  }, []);

  const handleCreate = async () => {
    const res = await axios.post('http://localhost:5000/api/categories', newCategory, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setCategories([...categories, res.data]);
    setNewCategory({ name: '', description: '' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setCategories(categories.filter(category => category._id !== id));
  };

  return (
    <div className="container">
      <h2>Manage Categories</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        />
        <button onClick={handleCreate}>Add Category</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button onClick={() => handleDelete(category._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryManagement;