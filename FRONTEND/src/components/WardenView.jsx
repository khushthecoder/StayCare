import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:5001/complaints';

function WardenView({ user }) {
    const [complaints, setComplaints] = useState([]);
    const [filter, setFilter] = useState('Electricity');

    useEffect(() => {
        fetchComplaints();
    }, [filter]);

    const fetchComplaints = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/${filter}`);
            setComplaints(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggle = async (id) => {
        try {
            await axios.patch(`${API_URL}/${id}/toggle`, { role: user.role });
            fetchComplaints();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Action failed");
        }
    };

    return (
        <div>
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Warden Oversight
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['Electricity', 'Water', 'WiFi'].map(cat => (
                        <button
                            key={cat}
                            className={`btn btn-outline ${filter === cat ? 'active' : ''}`}
                            style={{
                                padding: '0.4rem 0.8rem',
                                fontSize: '0.75rem',
                                background: filter === cat ? '#6366f1' : 'transparent',
                                color: filter === cat ? 'white' : '#6366f1'
                            }}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {complaints.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }} className="card">No complaints in this category.</p>
                ) : (
                    complaints.map(c => (
                        <div key={c.id} className="card" style={{ marginBottom: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: '700', color: '#22d3ee' }}>Room {c.roomNumber}</span>
                                <span className={`badge ${c.status === 'OPEN' ? 'badge-open' : 'badge-resolved'}`}>
                                    {c.status}
                                </span>
                            </div>
                            <p style={{ marginBottom: '1rem', color: '#cbd5e1' }}>{c.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    {new Date(c.createdAt).toLocaleDateString()}
                                </span>
                                {user.role === 'WARDEN' && (
                                    <button
                                        className="btn btn-outline"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                        onClick={() => handleToggle(c.id)}
                                    >
                                        Mark as {c.status === 'OPEN' ? 'Resolved' : 'Open'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default WardenView;
