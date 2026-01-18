import React, { useState, useEffect } from 'react';

const CreateContract = ({ onNavigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBlueprint, setSelectedBlueprint] = useState(null);
    const [blueprints, setBlueprints] = useState([]);
    const [contractName, setContractName] = useState('');
    // formData state could be used to capture dynamic field values if needed in the future

    useEffect(() => {
        const stored = localStorage.getItem('blueprints');
        if (stored) {
            setBlueprints(JSON.parse(stored));
        }
    }, []);

    const handleCreate = () => {
        if (!contractName.trim()) {
            alert('Please enter a contract name');
            return;
        }
        if (!selectedBlueprint) {
            alert('Please select a blueprint');
            return;
        }

        const storedContracts = localStorage.getItem('contracts');
        let currentContracts;

        if (storedContracts) {
            currentContracts = JSON.parse(storedContracts);
        } else {
            // Seed defaults if missing (same as Dashboard)
            currentContracts = [
                { id: 1, name: 'Employment - John Doe', template: 'Standard Employment Contract', status: 'Signed', date: '1/10/2025' },
                { id: 2, name: 'NDA - Acme Corp', template: 'NDA Agreement', status: 'Approved', date: '1/12/2025' },
                { id: 3, name: 'Service - Widget Inc', template: 'Service Agreement', status: 'Sent', date: '1/14/2025' },
                { id: 4, name: 'Employment - Jane Smith', template: 'Standard Employment Contract', status: 'Created', date: '1/16/2025' },
                { id: 5, name: 'NDA - Beta Solutions', template: 'NDA Agreement', status: 'Locked', date: '12/20/2024' },
            ];
        }

        const newContract = {
            id: Date.now(),
            name: contractName,
            template: selectedBlueprint.name,
            status: 'Created', // Default status
            date: new Date().toLocaleDateString()
        };

        const updatedContracts = [newContract, ...currentContracts]; // Add to top
        localStorage.setItem('contracts', JSON.stringify(updatedContracts));

        // Navigate to dashboard using the prop (ensure it's passed from App.jsx)
        if (onNavigate) {
            onNavigate('dashboard');
        } else {
            console.error('Navigation prop missing');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="page-header">
                <h1>Create Contract</h1>
                <p>Generate a new contract from a blueprint</p>
            </div>

            <div className="form-card">
                <div className="form-group">
                    <label>Contract Name</label>
                    <input
                        type="text"
                        placeholder="e.g., Employment - John Doe"
                        className="input-field"
                        value={contractName}
                        onChange={(e) => setContractName(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ position: 'relative', marginBottom: '1.5rem' }}>
                    <label>Select Blueprint</label>

                    {/* Custom Dropdown Trigger */}
                    <div
                        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className={!selectedBlueprint ? "text-gray-400 font-bold" : ""}>
                            {selectedBlueprint ? selectedBlueprint.name : "Choose a blueprint template"}
                        </span>
                        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
                    </div>

                    {/* Custom Dropdown Options */}
                    {isOpen && (
                        <div className="custom-options">
                            {blueprints.length > 0 ? (
                                blueprints.map((bp) => (
                                    <div
                                        key={bp.id}
                                        className={`custom-option ${selectedBlueprint?.id === bp.id ? 'selected' : ''}`}
                                        onClick={() => {
                                            setSelectedBlueprint(bp);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {bp.name}
                                    </div>
                                ))
                            ) : (
                                <div className="custom-option" style={{ fontStyle: 'italic', color: '#9ca3af' }}>
                                    No blueprints found. Create one first.
                                </div>
                            )}
                        </div>
                    )}

                    {selectedBlueprint && (
                        <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                            Fields: {selectedBlueprint.fields || (selectedBlueprint.fieldConfig ? selectedBlueprint.fieldConfig.length : 0)} | Created: {selectedBlueprint.date}
                        </div>
                    )}
                </div>

                {selectedBlueprint && (
                    <>
                        <div style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Contract Fields</h3>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                These fields are inherited from the selected blueprint
                            </p>
                        </div>

                        <div className="dynamic-fields-container">
                            {selectedBlueprint.fieldConfig ? (
                                selectedBlueprint.fieldConfig.map((field) => (
                                    <div key={field.id} className="form-group">
                                        <label>{field.label}</label>

                                        {field.type === 'Text' && (
                                            <input
                                                type="text"
                                                className="input-field"
                                                placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                                            />
                                        )}

                                        {field.type === 'Date' && (
                                            <input
                                                type="date"
                                                className="input-field"
                                            />
                                        )}

                                        {field.type === 'Checkbox' && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                <input type="checkbox" id={`field-${field.id}`} style={{ width: '1rem', height: '1rem' }} />
                                                <label htmlFor={`field-${field.id}`} style={{ fontWeight: 400, margin: 0 }}>
                                                    {field.placeholder || "Check to confirm"}
                                                </label>
                                            </div>
                                        )}

                                        {field.type === 'Signature' && (
                                            <input
                                                type="text"
                                                className="input-field"
                                                style={{ backgroundColor: '#f9fafb' }}
                                                placeholder={field.placeholder || "Signature (text representation)"}
                                            />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', background: '#f9fafb', borderRadius: '8px' }}>
                                    This blueprint has no fields configured.
                                </div>
                            )}
                        </div>
                    </>
                )}

                <div className="form-actions-row">
                    <button className="btn-primary" style={{ background: '#111827' }} onClick={handleCreate}>Create Contract</button>
                    <button className="btn-secondary">Save Draft</button>
                    <button className="btn-text">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateContract;
