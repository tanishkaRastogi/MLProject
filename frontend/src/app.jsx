import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/lodge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>📝 Lodge a Grievance</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br /><br />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br /><br />
        <textarea name="message" placeholder="Your grievance..." value={formData.message} onChange={handleChange} required style={{ width: '100%', height: '100px' }} /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
}

export default App;