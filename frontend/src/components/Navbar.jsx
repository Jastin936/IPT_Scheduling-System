// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const styles = {
        nav: {
            width: '100%',
            backgroundColor: 'rgba(11, 15, 25, 0.8)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            boxSizing: 'border-box',
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        },
        brand: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '18px',
            fontWeight: '700',
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '-0.01em'
        },
        menu: {
            display: 'flex',
            alignItems: 'center'
        },
        btnLogout: {
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
            transition: 'transform 0.2s'
        }
    };

    return (
        <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.brand}>
                <span>📅</span> Scheduler App
            </Link>
            
            <div style={styles.menu}>
                <button onClick={handleLogout} style={styles.btnLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;