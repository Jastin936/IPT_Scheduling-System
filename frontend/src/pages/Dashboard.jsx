// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [editingEventId, setEditingEventId] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await api.get('/events/');
            setEvents(response.data);
        } catch (err) {
            alert('Failed to retrieve your scheduled events.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (new Date(startTime) >= new Date(endTime)) {
            alert('Error: The event end time must be after the start time.');
            return;
        }

        const eventData = {
            title,
            description,
            start_time: startTime,
            end_time: endTime
        };

        try {
            if (editingEventId) {
                await api.put(`/events/${editingEventId}/`, eventData);
            } else {
                await api.post('/events/', eventData);
            }
            resetForm();
            fetchEvents();
        } catch (err) {
            alert('An error occurred while saving the event.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you completely sure you want to remove this event from your schedule?')) {
            try {
                await api.delete(`/events/${id}/`);
                setEvents(events.filter(event => event.id !== id));
            } catch (err) {
                alert('Failed to delete the selected event.');
            }
        }
    };

    const startEdit = (event) => {
        setEditingEventId(event.id);
        setTitle(event.title);
        setDescription(event.description || '');
        setStartTime(event.start_time.substring(0, 16));
        setEndTime(event.end_time.substring(0, 16));
    };

    const resetForm = () => {
        setEditingEventId(null);
        setTitle('');
        setDescription('');
        setStartTime('');
        setEndTime('');
    };

    const styles = {
        container: { 
            width: '100%', 
            maxWidth: '100%', 
            padding: '40px', 
            boxSizing: 'border-box' 
        },
        header: { 
            background: 'rgba(255, 255, 255, 0.02)', 
            backdropFilter: 'blur(12px)', 
            border: '1px solid rgba(255, 255, 255, 0.06)', 
            padding: '20px 32px', 
            borderRadius: '16px', 
            marginBottom: '32px', 
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)' 
        },
        grid: { 
            display: 'grid', 
            gridTemplateColumns: '380px 1fr', 
            gap: '32px', 
            alignItems: 'start' 
        },
        card: { 
            background: 'rgba(255, 255, 255, 0.02)', 
            backdropFilter: 'blur(12px)', 
            padding: '28px', 
            borderRadius: '20px', 
            border: '1px solid rgba(255, 255, 255, 0.06)', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)' 
        },
        formGroup: { marginBottom: '20px' },
        label: { 
            display: 'block', 
            fontWeight: '600', 
            marginBottom: '8px', 
            fontSize: '12px', 
            color: '#9ca3af', 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em' 
        },
        input: { 
            width: '100%', 
            padding: '12px 16px', 
            background: 'rgba(15, 23, 42, 0.6)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '10px', 
            fontSize: '15px', 
            color: '#fff', 
            boxSizing: 'border-box', 
            outline: 'none', 
            colorScheme: 'dark', 
            transition: 'all 0.3s ease' 
        },
        btnPrimary: { 
            width: '100%', 
            padding: '14px', 
            background: editingEventId ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            fontSize: '15px', 
            fontWeight: '600', 
            cursor: 'pointer', 
            boxShadow: editingEventId ? '0 4px 14px rgba(217, 119, 6, 0.3)' : '0 4px 14px rgba(79, 70, 229, 0.3)', 
            transition: 'all 0.2s ease' 
        },
        btnCancel: { 
            width: '100%', 
            padding: '10px', 
            background: 'transparent', 
            color: '#ef4444', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            borderRadius: '10px', 
            fontSize: '14px', 
            marginTop: '12px', 
            cursor: 'pointer' 
        },
        timelineGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '20px'
        },
        timelineCard: { 
            background: 'rgba(255, 255, 255, 0.01)', 
            padding: '24px', 
            borderRadius: '16px', 
            border: '1px solid rgba(255, 255, 255, 0.06)', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            gap: '20px',
            transition: 'all 0.3s ease' 
        },
        timeTag: { 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '6px 14px', 
            background: 'rgba(99, 102, 241, 0.08)', 
            color: '#a5b4fc', 
            border: '1px solid rgba(99, 102, 241, 0.15)', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: '500' 
        },
        actionBtnGroup: { display: 'flex', gap: '10px', width: '100%', justifyContent: 'flex-end' },
        btnEdit: { padding: '8px 16px', background: 'rgba(245, 158, 11, 0.08)', color: '#fcd34d', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' },
        btnDelete: { padding: '8px 16px', background: 'rgba(239, 68, 68, 0.08)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }
    };

    return (
        <div style={styles.container}>
            {/* HEADER METRICS BAR */}
            <div style={styles.header}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #9ca3af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Workspace Scheduler
                </h2>
                <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '13px' }}>Production timeline control interface</p>
            </div>

            <div style={styles.grid}>
                {/* COLUMN 1: Fixed Sticky Control Panel */}
                <div style={styles.card}>
                    <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '16px', fontWeight: '600', color: editingEventId ? '#fbbf24' : '#fff' }}>
                        {editingEventId ? 'Modify Event Blueprint' : 'Create New Event'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Event Title</label>
                            <input type="text" placeholder="e.g., System Defense Prep" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Context / Description</label>
                            <textarea rows="4" placeholder="Add specific session details..." value={description} onChange={(e) => setDescription(e.target.value)} style={{...styles.input, resize: 'none'}} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Starts At</label>
                            <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required style={styles.input} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Concludes At</label>
                            <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required style={styles.input} />
                        </div>
                        
                        <button type="submit" style={styles.btnPrimary}>
                            {editingEventId ? 'Apply Blueprint Update' : 'Initialize & Schedule'}
                        </button>

                        {editingEventId && (
                            <button type="button" onClick={resetForm} style={styles.btnCancel}>
                                Discard Changes
                            </button>
                        )}
                    </form>
                </div>

                {/* COLUMN 2: Full-Width Dynamic Responsive Pipeline Grid */}
                <div>
                    <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '16px', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.02em' }}>
                        ACTIVE AGENDA PIPELINE ({events.length})
                    </h3>
                    
                    {loading ? (
                        <p style={{ color: '#6b7280', fontSize: '14px' }}>Synchronizing workspace metrics...</p>
                    ) : events.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 40px', background: 'rgba(255, 255, 255, 0.01)', borderRadius: '20px', border: '1px dashed rgba(255, 255, 255, 0.08)' }}>
                            <p style={{ color: '#6b7280', margin: 0, fontSize: '14px' }}>Your active workspace pipeline is clear.</p>
                        </div>
                    ) : (
                        <div style={styles.timelineGrid}>
                            {events.map((event) => (
                                <div key={event.id} style={styles.timelineCard}>
                                    <div style={{ width: '100%' }}>
                                        <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#fff', letterSpacing: '-0.01em' }}>{event.title}</h4>
                                        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#9ca3af', lineHeight: '1.6' }}>{event.description || 'No supplementary context provided.'}</p>
                                        <div style={styles.timeTag}>
                                            <span>⏱️</span>
                                            <span>
                                                {new Date(event.start_time).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})} 
                                                {' — '} 
                                                {new Date(event.end_time).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={styles.actionBtnGroup}>
                                        <button onClick={() => startEdit(event)} style={styles.btnEdit}>Edit</button>
                                        <button onClick={() => handleDelete(event.id)} style={styles.btnDelete}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;