import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { DataService } from '../../services/mockData';

const ApprovalQueue = () => {
    const [pendingUpdates, setPendingUpdates] = useState([]);

    const loadPending = () => {
        const allUpdates = DataService.getAll();
        setPendingUpdates(allUpdates.filter(u => u.status === 'Pending'));
    };

    useEffect(() => {
        loadPending();
    }, []);

    const handleApprove = (id) => {
        DataService.updateStatus(id, 'Approved');
        loadPending();
    };

    const handleReject = (id) => {
        DataService.updateStatus(id, 'Rejected');
        loadPending();
    };

    if (pendingUpdates.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#ecfdf5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--spacing-md)'
                }}>
                    <Check size={32} color="#059669" />
                </div>
                <h3 style={{ margin: '0 0 8px' }}>All Caught Up!</h3>
                <p style={{ color: '#6b7280', margin: 0 }}>There are no pending approvals at this time.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ margin: 0 }}>Pending Approvals</h3>
                <span className="badge badge-warning" style={{ fontSize: '0.875rem' }}>{pendingUpdates.length} items</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {pendingUpdates.map((update) => (
                    <div key={update.id} style={{
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: 'var(--spacing-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff'
                    }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#fef3c7',
                                borderRadius: '8px',
                                height: 'fit-content',
                                color: '#d97706'
                            }}>
                                <AlertTriangle size={24} />
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{update.updateType}</span>
                                    <span className="badge badge-info">{update.market}</span>
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>
                                    {update.sku} • {update.idh} • Submitted by {update.user.split('(')[0]}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', fontSize: '0.875rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ color: '#6b7280' }}>Old:</span>
                                        <span style={{ textDecoration: 'line-through' }}>{update.oldValue}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ color: '#6b7280' }}>New:</span>
                                        <span style={{ fontWeight: 600, color: 'var(--henkel-red)' }}>{update.newValue}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ color: '#6b7280' }}>Effective:</span>
                                        <span>{update.effectiveDate}</span>
                                    </div>
                                </div>
                                {update.reason && (
                                    <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#f9fafb', borderRadius: '4px', fontSize: '0.875rem', color: '#4b5563' }}>
                                        "{update.reason}"
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <button
                                onClick={() => handleReject(update.id)}
                                className="btn btn-outline"
                                style={{ borderColor: '#ef4444', color: '#ef4444' }}
                            >
                                <X size={18} />
                                Reject
                            </button>
                            <button
                                onClick={() => handleApprove(update.id)}
                                className="btn btn-primary"
                                style={{ backgroundColor: '#10b981' }}
                            >
                                <Check size={18} />
                                Approve
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApprovalQueue;
