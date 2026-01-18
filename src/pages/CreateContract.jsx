import React from 'react';

const CreateContract = () => {
    return (
        <div className="page-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
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

                <div className="form-group">
                    <label>Select Blueprint</label>
                    <select className="select-field">
                        <option value="">Choose a blueprint template</option>
                        <option value="1">Standard Employment Contract</option>
                        <option value="2">NDA Agreement</option>
                        <option value="3">Service Agreement</option>
                    </select>
                </div>

                <div className="form-actions-row">
                    <button className="btn-primary">Create Contract</button>
                    <button className="btn-secondary">Save Draft</button>
                    <button className="btn-text" style={{ marginLeft: 'auto' }}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateContract;
