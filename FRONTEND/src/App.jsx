import React, { useState } from 'react';
import FoodBoard from './components/FoodBoard';
import ComplaintForm from './components/ComplaintForm';
import WardenView from './components/WardenView';
import Auth from './components/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('food');

  const handleLogout = () => {
    setUser(null);
    setActiveTab('food');
  };

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.2rem', background: 'linear-gradient(to right, #6366f1, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            HostelPulse
          </h1>
          <p style={{ color: '#94a3b8' }}>Welcome, {user.name} ({user.role})</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'food' ? 'active' : ''}`}
          onClick={() => setActiveTab('food')}
        >
          Food Board
        </div>
        <div
          className={`tab ${activeTab === 'complaints' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaints')}
        >
          Complaints
        </div>
        {user.role === 'WARDEN' && (
          <div
            className={`tab ${activeTab === 'warden' ? 'active' : ''}`}
            onClick={() => setActiveTab('warden')}
          >
            Warden Panel
          </div>
        )}
      </div>

      <main>
        {activeTab === 'food' && <FoodBoard user={user} />}
        {activeTab === 'complaints' && <ComplaintForm user={user} />}
        {activeTab === 'warden' && user.role === 'WARDEN' && <WardenView user={user} />}
      </main>
    </div>
  );
}

export default App;
