import React, { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { DataService } from '../../services/mockData';

const SubmissionForm = ({ onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        updateType: '',
        sku: '',
        market: '',
        idh: '',
        effectiveDate: '',
        oldValue: '',
        newValue: '',
        reason: '',
        user: 'Demo User (Demand Planner)'
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = DataService.addUpdate(formData);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            if (onSubmitSuccess) onSubmitSuccess();
            // Reset form
            setFormData(prev => ({
                ...prev,
                sku: '',
                idh: '',
                oldValue: '',
                newValue: '',
                reason: ''
            }));
        }, 2000);
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-md)' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Submit Planning Update</h2>
                <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Enter the details for your forecast or supply chain update.</p>
            </div>

            {showSuccess && (
                <div style={{
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    padding: 'var(--spacing-md)',
                    borderRadius: '6px',
                    marginBottom: 'var(--spacing-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <Save size={20} />
                    <strong>Success!</strong> Update submitted successfully.
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>Update Type</label>
                        <select
                            name="updateType"
                            value={formData.updateType}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        >
                            <option value="">Select Type...</option>
                            <option value="Forecast Revision">Forecast Revision</option>
                            <option value="Promo Uplift">Promo Uplift</option>
                            <option value="Launch">Launch</option>
                            <option value="Delist">Delist</option>
                            <option value="IDH Change">IDH Change</option>
                            <option value="Risk Item">Risk Item</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>Market</label>
                        <select
                            name="market"
                            value={formData.market}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        >
                            <option value="">Select Market...</option>
                            <option value="UAE">UAE</option>
                            <option value="KSA">KSA</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Oman">Oman</option>
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>SKU / Product Code</label>
                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            required
                            placeholder="e.g. SKU-12345"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>IDH (Material Code)</label>
                        <input
                            type="text"
                            name="idh"
                            value={formData.idh}
                            onChange={handleChange}
                            required
                            placeholder="e.g. IDH-998877"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>Effective Date</label>
                        <input
                            type="date"
                            name="effectiveDate"
                            value={formData.effectiveDate}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>Old Value</label>
                        <input
                            type="number"
                            name="oldValue"
                            value={formData.oldValue}
                            onChange={handleChange}
                            placeholder="0"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>New Value</label>
                        <input
                            type="number"
                            name="newValue"
                            value={formData.newValue}
                            onChange={handleChange}
                            required
                            placeholder="0"
                            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, fontSize: '0.875rem' }}>Reason for Change</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        rows={3}
                        placeholder="Please provide context for this update..."
                        style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', resize: 'vertical' }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                    <button type="button" className="btn btn-outline">Cancel</button>
                    <button type="submit" className="btn btn-primary">
                        <Save size={18} />
                        Submit Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubmissionForm;
