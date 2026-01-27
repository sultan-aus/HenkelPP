import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ArrowUp, ArrowDown, AlertTriangle, Clock, CheckCircle, BarChart } from 'lucide-react';
import { DataService } from '../../services/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const KPICard = ({ title, value, subtext, icon: Icon, color, trend }) => (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: 500 }}>{title}</span>
            <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: `${color}20`, color: color }}>
                <Icon size={20} />
            </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700 }}>{value}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
            {trend && (
                <span style={{ color: trend > 0 ? 'var(--color-success)' : 'var(--color-danger)', display: 'flex', alignItems: 'center' }}>
                    {trend > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    {Math.abs(trend)}%
                </span>
            )}
            <span style={{ color: '#9ca3af' }}>{subtext}</span>
        </div>
    </div>
);

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUpdates: 0, pendingApprovals: 0, updatesThisWeek: 0, marketsActive: 0 });
    const [recentUpdates, setRecentUpdates] = useState([]);

    useEffect(() => {
        DataService.init();
        setStats(DataService.getStats());
        setRecentUpdates(DataService.getAll().slice(0, 5));
    }, []);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        },
        scales: {
            y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
            x: { grid: { display: false } }
        }
    };

    const barData = {
        labels: ['Forecast', 'Promo', 'Launch', 'Delist', 'IDH', 'Risk'],
        datasets: [
            {
                label: 'Updates by Type',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#E60000',
                borderRadius: 4,
            },
        ],
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
                <KPICard
                    title="Updates This Week"
                    value={stats.updatesThisWeek}
                    subtext="vs. last week"
                    icon={Clock}
                    color="#3b82f6"
                    trend={12}
                />
                <KPICard
                    title="Pending Approvals"
                    value={stats.pendingApprovals}
                    subtext="Requires attention"
                    icon={AlertTriangle}
                    color="#f59e0b"
                />
                <KPICard
                    title="Active Markets"
                    value={stats.marketsActive}
                    subtext="Reporting data"
                    icon={CheckCircle}
                    color="#10b981"
                />
                <KPICard
                    title="Total Changes"
                    value={stats.totalUpdates}
                    subtext="All time"
                    icon={BarChart}
                    color="#E60000"
                />
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-md)' }}>
                <div className="card">
                    <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-md)' }}>Update Volume by Type</h3>
                    <Bar options={chartOptions} data={barData} height={100} />
                </div>

                <div className="card">
                    <h3 style={{ marginTop: 0, marginBottom: 'var(--spacing-md)' }}>Recent Activity</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {recentUpdates.map(update => (
                            <div key={update.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', paddingBottom: 'var(--spacing-sm)', borderBottom: '1px solid #f3f4f6' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: update.status === 'Pending' ? 'var(--color-warning)' : 'var(--color-success)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{update.updateType}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{update.sku} • {update.market}</div>
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                    {new Date(update.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
