import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) return;

    if (editId) {
      setUsers(users.map(user => user.id === editId ? { id: editId, name, email, phone, address } : user));
      setEditId(null);
    } else {
      setUsers([...users, { id: Date.now(), name, email, phone, address }]);
    }

    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto',
      fontFamily: 'sans-serif'
    }}>
      <h2>React CRUD App</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Phone No"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {editId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Phone</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Address</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>UID</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                No users added yet.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.name}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.phone}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.address}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <button onClick={() => handleEdit(user)} style={{ marginRight: '8px' }}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
