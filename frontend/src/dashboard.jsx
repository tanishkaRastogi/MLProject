import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/grievances')
      .then((res) => res.json())
      .then((data) => setGrievances(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...grievances];
    updated[index].status = newStatus;
    setGrievances(updated);
  };

  const updateStatus = async (index) => {
    const grievance = grievances[index];

    const response = await fetch('http://localhost:5000/update_status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: grievance.id,
        status: grievance.status,
      }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <h2>📋 Grievance Dashboard</h2>
      {grievances.map((g, i) => (
        <div key={g.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '15px' }}>
          <p><strong>🙋 Name:</strong> {g.name}</p>
          <p><strong>📧 Email:</strong> {g.email}</p>
          <p><strong>💬 Message:</strong> {g.message}</p>
          <p><strong>📊 Sentiment:</strong> {g.sentiment}</p>
          <p>
            <strong>📌 Status:</strong>
            <select value={g.status} onChange={(e) => handleStatusChange(i, e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
              <option value="In Progress">In Progress</option>
            </select>
          </p>
          <button onClick={() => updateStatus(i)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;