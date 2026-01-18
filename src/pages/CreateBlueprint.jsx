import React from 'react';

const CreateBlueprint = ({ onNavigate }) => {
    return (
        <div className="dashboard-container">
            <div className="page-header">
                <h1>Create Blueprint</h1>
                <p>Design a reusable contract template with custom fields</p>
            </div>

            <div className="form-card" style={{ padding: '0' }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid #e5e7eb' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Blueprint Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Standard Employment Contract"
                            className="input-field"
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', minHeight: '500px' }}>
                    {/* Sidebar Palette */}
                    <div style={{ width: '300px', padding: '2rem' }}>
                        <h3 className="section-title">Field Types</h3>
                        <div className="field-palette">
                            {[
                                {
                                    type: 'Text',
                                    icon: (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="4 7 4 4 20 4 20 7"></polyline>
                                            <line x1="9" y1="20" x2="15" y2="20"></line>
                                            <line x1="12" y1="4" x2="12" y2="20"></line>
                                        </svg>
                                    ),
                                    bg: '#f3f4f6',
                                    color: '#6b7280'
                                },
                                {
                                    type: 'Date',
                                    icon: (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                    ),
                                    bg: '#eff6ff',
                                    color: '#3b82f6'
                                },
                                {
                                    type: 'Signature',
                                    icon: (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                                            <path d="M2 2l7.586 7.586"></path>
                                            <circle cx="11" cy="11" r="2"></circle>
                                        </svg>
                                    ),
                                    bg: '#fff7ed',
                                    color: '#f97316'
                                },
                                {
                                    type: 'Checkbox',
                                    icon: (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 11 12 14 22 4"></polyline>
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                        </svg>
                                    ),
                                    bg: '#f5f3ff',
                                    color: '#8b5cf6'
                                }
                            ].map(item => (
                                <div key={item.type} className="palette-item">
                                    <span
                                        className="icon-box-sm"
                                        style={{ backgroundColor: item.bg, color: item.color }}
                                    >
                                        {item.icon}
                                    </span>
                                    <span>{item.type}</span>
                                    <span style={{ marginLeft: 'auto', color: '#9ca3af', fontSize: '1.25rem', fontWeight: 'bold' }}>+</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div style={{ flex: 1, padding: '2rem 2rem 3rem 2rem', backgroundColor: 'white' }}>
                        <h3 className="section-title">Blueprint Canvas</h3>
                        <div className="canvas-empty-state">
                            <p>Add fields from the palette to start designing</p>
                        </div>
                    </div>
                </div>

                <div className="form-actions-row" style={{ padding: '1.5rem 2rem', marginTop: 0, backgroundColor: 'white' }}>
                    <button className="btn-dark-navy">Save Blueprint</button>
                    <button className="btn-secondary" onClick={() => onNavigate('blueprints')}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateBlueprint;
