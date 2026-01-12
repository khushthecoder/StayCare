import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api') + '/food-comments';

function FoodBoard({ user }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setComments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setLoading(true);
        try {
            await axios.post(API_URL, { text: newComment, role: user.role });
            setNewComment('');
            fetchComments();
        } catch (err) {
            alert(err.response?.data?.error || "Action failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id) => {
        try {
            await axios.patch(`${API_URL}/${id}/like`);
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDislike = async (id) => {
        try {
            await axios.patch(`${API_URL}/${id}/dislike`);
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="animate-fade-in">
            {user.role === 'STUDENT' && (
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Today's Food Feedback
                    </h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            className="input"
                            placeholder="How was the meal?"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            style={{ marginBottom: 0 }}
                        />
                        <button className="btn" type="submit" disabled={loading}>
                            SUBMIT
                        </button>
                    </form>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {comments.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#94a3b8', padding: '2rem' }}>No feedback yet for today.</p>
                ) : (
                    comments.map(c => (
                        <div key={c.id} className="card" style={{ marginBottom: 0, padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p>{c.text}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button
                                    className="btn btn-outline"
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', borderColor: '#6366f1', color: '#6366f1' }}
                                    onClick={() => handleLike(c.id)}
                                >
                                    LIKE {c.likes}
                                </button>
                                <button
                                    className="btn btn-outline"
                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem', borderColor: '#fb7185', color: '#fb7185' }}
                                    onClick={() => handleDislike(c.id)}
                                >
                                    DISLIKE {c.dislikes ?? 0}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FoodBoard;
