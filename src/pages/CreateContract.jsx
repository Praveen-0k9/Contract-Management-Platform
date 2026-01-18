import React, { useState } from 'react';

const CreateContract = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedBlueprint, setSelectedBlueprint] = useState('');

    const blueprints = [
        'Standard Employment Contract',
        'NDA Agreement',
        'Service Agreement'
    ];

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
                    />
                </div>

                <div className="form-group" style={{ position: 'relative' }}>
                    <label>Select Blueprint</label>

                    {/* Custom Dropdown Trigger */}
                    <div
                        className={`custom-select-trigger ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className={!selectedBlueprint ? "text-gray-400 font-bold" : ""}>
                            {selectedBlueprint || "Choose a blueprint template"}
                        </span>
                        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
                    </div>

                    {/* Custom Dropdown Options */}
                    {isOpen && (
                        <div className="custom-options">
                            {blueprints.map((option) => (
                                <div
                                    key={option}
                                    className={`custom-option ${selectedBlueprint === option ? 'selected' : ''}`}
                                    onClick={() => {
                                        setSelectedBlueprint(option);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-actions-row">
                    <button className="btn-primary">Create Contract</button>
                    <button className="btn-secondary">Save Draft</button>
                    <button className="btn-text">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateContract;
