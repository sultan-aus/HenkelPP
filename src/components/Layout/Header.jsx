import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

const Header = ({ title, showMenu, onMenuClick }) => {
    return (
        <header style={{
            height: '72px',
            backgroundColor: 'var(--henkel-white)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: showMenu ? '0 var(--spacing-md)' : '0 var(--spacing-xl)',
            position: 'sticky',
            top: 0,
            zIndex: 10
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                {showMenu && (
                    <button
                        onClick={onMenuClick}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            color: 'var(--henkel-text)'
                        }}
                    >
                        <Menu size={24} />
                    </button>
                )}
                <h2 style={{ margin: 0, fontSize: showMenu ? '1.25rem' : '1.5rem', fontWeight: 600 }}>{title}</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: showMenu ? 'var(--spacing-md)' : 'var(--spacing-lg)' }}>
                {!showMenu && (
                    <div style={{ position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                        <input
                            type="text"
                            placeholder="Search updates..."
                            style={{
                                padding: '8px 12px 8px 40px',
                                borderRadius: '20px',
                                border: '1px solid var(--color-border)',
                                backgroundColor: 'var(--henkel-gray)',
                                width: '240px',
                                outline: 'none'
                            }}
                        />
                    </div>
                )}
                {showMenu && <Search size={20} />}

                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--henkel-red)',
                        borderRadius: '50%'
                    }}></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: 'var(--henkel-gray)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} />
                    </div>
                    {!showMenu && (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Demo User</span>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Demand Planner</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
