import React, { useState } from 'react';
import axios from 'axios';

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT'
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isLogin ? '/login' : '/signup';
            const res = await axios.post(`http://localhost:5001${endpoint}`, formData);
            onLogin(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card">
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="subtitle">{isLogin ? 'Login to your HMS Portal' : 'Join the hostel community'}</p>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="input-group">
                            <label>Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="WARDEN">Warden</option>
                            </select>
                        </div>
                    )}

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn btn-primary full-width">
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <p className="toggle-text">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Sign up' : 'Log in'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
