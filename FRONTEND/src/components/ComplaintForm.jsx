import React, { useState } from 'react';
import axios from 'axios';
// import { PenTool, Home, Info, CheckCircle } from 'lucide-react';

const API_URL = 'http://localhost:5001/complaints';

function ComplaintForm({ user }) {
    const [formData, setFormData] = useState({
        category: 'Electricity',
        roomNumber: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, { ...formData, role: user.role });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setFormData({ category: 'Electricity', roomNumber: '', description: '' });
        } catch (err) {
            alert(err.response?.data?.error || "Action failed");
        }
    };

    if (user.role === 'WARDEN') {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: '#94a3b8' }}>Wardens view and resolve complaints in the Warden Panel.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* <PenTool size={20} /> */}
                Log a Complaint
            </h3>

            {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#10b981' }}>
                    {/* <CheckCircle size={48} style={{ marginBottom: '1rem' }} /> */}
                    <p>Complaint logged successfully!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="grid">
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Category</label>
                            <select
                                className="input"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Electricity">Electricity</option>
                                <option value="Water">Water</option>
                                <option value="WiFi">WiFi</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Room Number</label>
                            <input
                                className="input"
                                placeholder="e.g. B-204"
                                required
                                value={formData.roomNumber}
                                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                            />
                        </div>
                    </div>

                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#94a3b8' }}>Description</label>
                    <textarea
                        className="textarea"
                        rows="4"
                        placeholder="Describe the issue..."
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>

                    <button className="btn" type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                        Submit Complaint
                    </button>
                </form>
            )}
        </div>
    );
}

export default ComplaintForm;
