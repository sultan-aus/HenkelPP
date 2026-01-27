import React, { useState, useEffect } from 'react';
import { Filter, Download, ChevronDown } from 'lucide-react';
import { DataService } from '../../services/mockData';

const ChangeLog = () => {
    const [updates, setUpdates] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        setUpdates(DataService.getAll());
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Approved': return <span className="badge badge-success">Approved</span>;
            case 'Pending': return <span className="badge badge-warning">Pending</span>;
            case 'Rejected': return <span className="badge badge-danger">Rejected</span>;
            default: return <span className="badge badge-info">{status}</span>;
        }
    };

    const filteredUpdates = filter === 'All' ? updates : updates.filter(u => u.market === filter);

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ margin: 0 }}>Change History</h3>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button className="btn btn-outline" style={{ padding: '6px 12px' }}>
                        <Filter size={16} />
                        Filter
                    </button>
                    <button className="btn btn-outline" style={{ padding: '6px 12px' }}>
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>ID</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Date</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Type</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Market</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>SKU / IDH</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Change</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>User</th>
                            <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUpdates.map((update) => (
                            <tr key={update.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '12px', fontWeight: 500 }}>{update.id}</td>
                                <td style={{ padding: '12px', color: '#6b7280' }}>{new Date(update.timestamp).toLocaleDateString()}</td>
                                <td style={{ padding: '12px' }}>{update.updateType}</td>
                                <td style={{ padding: '12px' }}>{update.market}</td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ fontWeight: 500 }}>{update.sku}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{update.idh}</div>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ color: '#9ca3af', textDecoration: 'line-through' }}>{update.oldValue}</span>
                                        <span>→</span>
                                        <span style={{ fontWeight: 600 }}>{update.newValue}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '12px', color: '#6b7280' }}>{update.user.split('(')[0]}</td>
                                <td style={{ padding: '12px' }}>{getStatusBadge(update.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChangeLog;
