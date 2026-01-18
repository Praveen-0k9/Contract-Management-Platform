import React, { useState, useEffect } from 'react';

const ContractDetails = ({ contract: initialContract, onNavigate }) => {
    // Keep local state for immediate UI updates without reload
    const [contract, setContract] = useState(initialContract);
    const [blueprint, setBlueprint] = useState(null);

    // Lifecycle statuses
    const lifecycle = ['Created', 'Approved', 'Sent', 'Signed', 'Locked'];

    useEffect(() => {
        // Sync local state if prop changes
        setContract(initialContract);
    }, [initialContract]);

    useEffect(() => {
        // Find the blueprint associated with this contract to display fields
        if (contract) {
            const storedBlueprints = localStorage.getItem('blueprints');
            if (storedBlueprints) {
                const blueprints = JSON.parse(storedBlueprints);
                const found = blueprints.find(bp => bp.name === contract.template);
                setBlueprint(found);
            }
        }
    }, [contract]);

    const getNextStatus = (current) => {
        const index = lifecycle.indexOf(current);
        if (index >= 0 && index < lifecycle.length - 1) {
            return lifecycle[index + 1];
        }
        return null; // Last stage
    };

    const handleNextStage = () => {
        const next = getNextStatus(contract.status);
        if (!next) return;

        // Update functionality
        const storedContracts = localStorage.getItem('contracts');
        if (storedContracts) {
            const contracts = JSON.parse(storedContracts);
            const updatedContracts = contracts.map(c =>
                c.id === contract.id ? { ...c, status: next } : c
            );

            localStorage.setItem('contracts', JSON.stringify(updatedContracts));

            // Update local state to reflect change immediately
            setContract(prev => ({ ...prev, status: next }));
        }
    };

    if (!contract) return <div>Loading...</div>;

    const getStatusClass = (status) => {
        switch (status) {
            case 'Signed': return 'badge-success';
            case 'Approved': return 'badge-info';
            case 'Sent': return 'badge-purple';
            case 'Created': return 'badge-neutral';
            case 'Locked': return 'badge-gray';
            default: return 'badge-neutral';
        }
    };

    const getActionLabel = (status) => {
        switch (status) {
            case 'Approved': return 'Approve';
            case 'Sent': return 'Send';
            case 'Signed': return 'Sign';
            case 'Locked': return 'Lock';
            default: return 'Next';
        }
    };

    const getActionIcon = (status) => {
        switch (status) {
            case 'Approved': return (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            );
            case 'Sent': return (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            );
            case 'Signed': return (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            );
            case 'Locked': return (
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            );
            default: return null;
        }
    };

    const nextStatus = getNextStatus(contract.status);

    return (
        <div className="dashboard-container">
            <div className="page-header" style={{ alignItems: 'flex-start', borderBottom: 'none', paddingBottom: 0 }}>
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="btn-back"
                >
                    <span>←</span> Back to Dashboard
                </button>
            </div>

            <div className="form-card" style={{ padding: '1.25rem' }}>
                {/* Header Section */}
                <div style={{ padding: '0 0 1rem 0', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{contract.name}</h1>
                        <p style={{ marginTop: '0.25rem', color: '#6b7280', fontSize: '0.9rem' }}>
                            Blueprint: {contract.template} <br />
                            Created: {contract.date}
                        </p>
                    </div>
                    <span className={`badge ${getStatusClass(contract.status)}`} style={{ fontSize: '0.85rem', padding: '0.25rem 0.6rem' }}>
                        {contract.status}
                    </span>
                </div>

                {/* Lifecycle Section */}
                <div style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
                    <h3 className="section-title" style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>Contract Lifecycle</h3>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {lifecycle.map((step, index) => {
                            const isCurrent = step === contract.status;
                            const isPast = lifecycle.indexOf(step) < lifecycle.indexOf(contract.status);

                            // Color logic matching the image
                            // Past: Gray bg, Dark text
                            // Current: Blue bg, White text
                            // Future: Light/White bg, Light text
                            let bg = '#f9fafb';
                            let color = '#9ca3af';

                            if (isCurrent) {
                                bg = '#2563eb';
                                color = 'white';
                            } else if (isPast) {
                                bg = '#e5e7eb';
                                color = '#374151';
                            }

                            return (
                                <React.Fragment key={step}>
                                    <div
                                        style={{
                                            padding: '0.35rem 1rem',
                                            borderRadius: '6px',
                                            backgroundColor: bg,
                                            color: color,
                                            fontWeight: 500,
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {step}
                                    </div>
                                    {/* Render connector line if not the last item */}
                                    {index < lifecycle.length - 1 && (
                                        <div style={{ width: '1.5rem', height: '2px', backgroundColor: '#d1d5db', margin: '0 0.25rem' }}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Fields Section */}
                <div style={{ padding: '1rem 0', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 className="section-title" style={{ margin: 0, fontSize: '1rem' }}>Contract Fields</h3>
                        {contract.status !== 'Locked' && (
                            <button className="btn-text" style={{ color: '#111827', fontWeight: 600, padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}>Edit Fields</button>
                        )}
                    </div>

                    {contract.status === 'Locked' && (
                        <div style={{
                            backgroundColor: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            padding: '0.75rem 1rem',
                            marginBottom: '1rem',
                            color: '#6b7280',
                            fontSize: '0.875rem'
                        }}>
                            This contract is locked and cannot be edited
                        </div>
                    )}

                    <div className="dynamic-fields-container">
                        {blueprint && blueprint.fieldConfig ? (
                            blueprint.fieldConfig.map((field) => (
                                <div key={field.id} className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label style={{ color: '#374151', marginBottom: '0.25rem', display: 'block', fontSize: '0.9rem', fontWeight: 500 }}>{field.label}</label>
                                    <div style={{
                                        backgroundColor: '#f3f4f6',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '0.375rem',
                                        border: '1px solid #e5e7eb',
                                        color: '#111827',
                                        fontSize: '0.95rem'
                                    }}>
                                        {field.label === 'Employee Name' && contract.name.includes('John Doe') ? 'John Doe' :
                                            field.label === 'Position' ? 'Senior Developer' :
                                                field.label === 'Start Date' ? '01-02-2025' :
                                                    field.type === 'Checkbox' ? '✓ Checked' :
                                                        field.type === 'Signature' ? 'John Doe' :
                                                            field.placeholder || '-'}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>No field details available.</p>
                        )}
                    </div>
                </div>

                {/* Actions Section - Hidden when Locked */}
                {contract.status !== 'Locked' && (
                    <div style={{ padding: '1rem 0 0 0' }}>
                        <h3 className="section-title" style={{ marginBottom: '1rem' }}>Available Actions</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {nextStatus && (
                                <button
                                    className="btn-primary"
                                    style={{ background: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    onClick={handleNextStage}
                                >
                                    {getActionIcon(nextStatus)}
                                    <span>{getActionLabel(nextStatus)}</span>
                                </button>
                            )}

                            <button className="btn-primary" style={{ background: '#dc2626', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Revoke</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContractDetails;
