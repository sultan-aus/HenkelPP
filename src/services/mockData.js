import { format, subDays, addDays } from 'date-fns';

// Mock Data
const MARKETS = ['UAE', 'KSA', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'];
const UPDATE_TYPES = ['Forecast Revision', 'Promo Uplift', 'Launch', 'Delist', 'IDH Change', 'Risk Item'];
const FUNCTIONS = ['Demand', 'Supply', 'Material', 'Sales', 'Marketing'];

const generateMockData = () => {
    const data = [];
    const today = new Date();

    // Generate 15 sample records
    for (let i = 0; i < 15; i++) {
        const isPast = i > 5;
        const date = isPast ? subDays(today, i) : addDays(today, i);
        const type = UPDATE_TYPES[Math.floor(Math.random() * UPDATE_TYPES.length)];

        data.push({
            id: `UPD-${1000 + i}`,
            sku: `SKU-${10000 + i}`,
            idh: `IDH-${50000 + i}`,
            market: MARKETS[Math.floor(Math.random() * MARKETS.length)],
            updateType: type,
            oldValue: Math.floor(Math.random() * 1000),
            newValue: Math.floor(Math.random() * 1000),
            effectiveDate: format(date, 'yyyy-MM-dd'),
            reason: 'Regular update cycle',
            user: `User ${Math.floor(Math.random() * 5) + 1} (${FUNCTIONS[Math.floor(Math.random() * FUNCTIONS.length)]})`,
            timestamp: date.toISOString(),
            status: i % 3 === 0 ? 'Pending' : (i % 5 === 0 ? 'Rejected' : 'Approved'),
            requiresApproval: ['Launch', 'Delist', 'IDH Change'].includes(type) || Math.random() > 0.7
        });
    }
    return data;
};

// Local Storage Wrapper
const STORAGE_KEY = 'henkel_planning_data';

export const DataService = {
    init: () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            const initialData = generateMockData();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
        }
    },

    getAll: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    addUpdate: (update) => {
        const currentData = DataService.getAll();
        const newUpdate = {
            ...update,
            id: `UPD-${Date.now()}`,
            timestamp: new Date().toISOString(),
            status: update.requiresApproval ? 'Pending' : 'Approved'
        };
        const newData = [newUpdate, ...currentData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        return newUpdate;
    },

    updateStatus: (id, status) => {
        const currentData = DataService.getAll();
        const newData = currentData.map(item =>
            item.id === id ? { ...item, status } : item
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    },

    getStats: () => {
        const data = DataService.getAll();
        const pending = data.filter(i => i.status === 'Pending').length;
        const thisWeek = data.filter(i => {
            const date = new Date(i.timestamp);
            const now = new Date();
            const diffTime = Math.abs(now - date);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 7;
        }).length;

        return {
            totalUpdates: data.length,
            pendingApprovals: pending,
            updatesThisWeek: thisWeek,
            marketsActive: new Set(data.map(i => i.market)).size
        };
    }
};
