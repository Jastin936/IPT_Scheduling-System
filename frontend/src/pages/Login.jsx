// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(username, password);
        if (!result.success) {
            setError(result.error);
        }
    };

    const styles = {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '85vh',
            width: '100%',
            padding: '20px',
            boxSizing: 'border-box'
        },
        card: { 
            width: '100%',
            maxWidth: '420px', 
            background: 'rgba(255, 255, 255, 0.02)', 
            backdropFilter: 'blur(12px)', 
            padding: '40px', 
            borderRadius: '24px', 
            border: '1px solid rgba(255, 255, 255, 0.06)', 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            boxSizing: 'border-box'
        },
        title: { 
            margin: '0 0 8px 0', 
            fontSize: '28px', 
            fontWeight: '700', 
            letterSpacing: '-0.02em', 
            background: 'linear-gradient(to right, #ffffff, #9ca3af)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
        },
        subtitle: {
            margin: '0 0 32px 0',
            color: '#6b7280',
            fontSize: '14px',
            textAlign: 'center'
        },
        errorBox: {
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: '#fca5a5',
            padding: '12px 16px',
            borderRadius: '10px',
            fontSize: '13px',
            marginBottom: '24px',
            textAlign: 'center',
            lineHeight: '1.5'
        },
        formGroup: { 
            marginBottom: '24px' 
        },
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
            padding: '14px 16px', 
            background: 'rgba(15, 23, 42, 0.6)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            fontSize: '15px', 
            color: '#fff', 
            boxSizing: 'border-box', 
            outline: 'none', 
            transition: 'all 0.3s ease'
        },
        btnSubmit: { 
            width: '100%', 
            padding: '14px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '12px', 
            fontSize: '15px', 
            fontWeight: '600', 
            cursor: 'pointer', 
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)', 
            transition: 'all 0.2s ease',
            marginTop: '8px'
        },
        footerText: { 
            marginTop: '24px', 
            textAlign: 'center',
            color: '#9ca3af',
            fontSize: '14px'
        },
        link: {
            color: '#6366f1',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'color 0.2s ease'
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Sign In</h2>
                <p style={styles.subtitle}>Access your workspace production pipeline</p>
                
                {error && <div style={styles.errorBox}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            placeholder="Enter your username"
                            style={styles.input} 
                            onFocus={(e) => e.target.style.border = '1px solid rgba(99, 102, 241, 0.5)'}
                            onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="••••••••"
                            style={styles.input} 
                            onFocus={(e) => e.target.style.border = '1px solid rgba(99, 102, 241, 0.5)'}
                            onBlur={(e) => e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)'}
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={styles.btnSubmit}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Sign In to Workspace
                    </button>
                </form>
                
                <p style={styles.footerText}>
                    Don't have an account?{' '}
                    <Link 
                        to="/register" 
                        style={styles.link}
                        onMouseEnter={(e) => e.target.style.color = '#818cf8'}
                        onMouseLeave={(e) => e.target.style.color = '#6366f1'}
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;