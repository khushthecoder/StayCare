import React, { useState, useEffect, useRef } from 'react';
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
    const roleRef = useRef('STUDENT');

    useEffect(() => {
        roleRef.current = formData.role;
    }, [formData.role]);

    const API_URL = "http://localhost:5001/api";

    useEffect(() => {
        if (typeof google !== 'undefined' && !window.googleInitialized) {
            google.accounts.id.initialize({
                client_id: "912684332872-oj82fg2if3n4hb021gv01ckrfdft6805.apps.googleusercontent.com",
                callback: handleGoogleCallback,
                ux_mode: "popup"
            });
            window.googleInitialized = true;
        }

        if (typeof google !== 'undefined') {
            const btnContainer = document.getElementById("googleBtn");
            if (btnContainer) {
                google.accounts.id.renderButton(btnContainer, {
                    theme: "outline",
                    size: "large",
                    width: 350
                });
            }
        }
    }, [isLogin]);

    const handleGoogleCallback = async (response) => {
        try {
            console.log("Google Token Received, sending to backend with role:", roleRef.current);
            const res = await axios.post(`${API_URL}/google-login`, {
                token: response.credential,
                role: roleRef.current
            });
            onLogin(res.data);
        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.error || "Google login failed");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const endpoint = isLogin ? '/login' : '/signup';
            const res = await axios.post(`${API_URL}${endpoint}`, formData);
            onLogin(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: '900', background: 'linear-gradient(to right, #6366f1, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>
                        StayCare
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                        {isLogin ? 'Welcome back! Please login to your account' : 'Join our community and get started'}
                    </p>
                </div>

                {error && <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#fb7185', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid rgba(244, 63, 94, 0.2)', textAlign: 'center' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label>I am a...</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="STUDENT">Student</option>
                                <option value="WARDEN">Warden</option>
                            </select>
                        </div>
                    )}
                    <button type="submit" className="btn-primary">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div style={{ margin: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
                </div>

                <div id="googleBtn"></div>

                <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '1.5rem' }}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '700', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#818cf8'} onMouseOut={(e) => e.target.style.color = '#6366f1'}>
                        {isLogin ? 'Sign up' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Auth;
