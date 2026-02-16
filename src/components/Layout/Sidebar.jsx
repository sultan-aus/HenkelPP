import React from 'react';
import { LayoutDashboard, FilePlus, History, CheckSquare, Settings, LogOut, X } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange, isOpen, isMobile, onClose }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'submit', label: 'Submit Update', icon: FilePlus },
        { id: 'history', label: 'Change Log', icon: History },
        { id: 'approvals', label: 'Approvals', icon: CheckSquare },
    ];

    return (
        <div className="sidebar" style={{
            width: '260px',
            backgroundColor: 'var(--henkel-white)',
            borderRight: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 50,
            transition: 'transform 0.3s ease-in-out',
            transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
            boxShadow: isMobile && isOpen ? 'var(--shadow-lg)' : 'none'
        }}>
            <div className="logo-container" style={{
                padding: 'var(--spacing-lg)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--spacing-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'var(--henkel-red)',
                        borderRadius: '4px'
                    }}></div>
                    <h1 style={{
                        margin: 0,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: 'var(--henkel-red)'
                    }}>Henkel <span style={{ color: 'var(--henkel-dark-gray)', fontWeight: 400 }}>Plan</span></h1>
                </div>
                {isMobile && (
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--henkel-text)'
                        }}
                    >
                        <X size={24} />
                    </button>
                )}
            </div>

            <nav style={{ flex: 1, padding: 'var(--spacing-md)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <li key={item.id} style={{ marginBottom: 'var(--spacing-xs)' }}>
                                <button
                                    onClick={() => onTabChange(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        border: 'none',
                                        backgroundColor: isActive ? 'rgba(230, 0, 0, 0.05)' : 'transparent',
                                        color: isActive ? 'var(--henkel-red)' : 'var(--henkel-text)',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: isActive ? 600 : 400,
                                        transition: 'all 0.2s',
                                        textAlign: 'left'
                                    }}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div style={{ padding: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--henkel-text)',
                    cursor: 'pointer',
                    opacity: 0.7
                }}>
                    <Settings size={20} />
                    Settings
                </button>
                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--henkel-text)',
                    cursor: 'pointer',
                    opacity: 0.7
                }}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
