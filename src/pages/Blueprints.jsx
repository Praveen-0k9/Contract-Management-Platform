import React from 'react';

const Blueprints = ({ onNavigate }) => {
    const [blueprints, setBlueprints] = React.useState([]);

    React.useEffect(() => {
        const defaults = [
            {
                id: 1,
                name: 'Standard Employment Contract',
                fields: 5,
                date: '1/15/2024',
                fieldConfig: [
                    { id: 'f1', type: 'Text', label: 'Employee Name', placeholder: 'Enter employee name' },
                    { id: 'f2', type: 'Text', label: 'Position', placeholder: 'Enter position' },
                    { id: 'f3', type: 'Date', label: 'Start Date' },
                    { id: 'f4', type: 'Checkbox', label: 'Benefits Eligible', placeholder: 'Check to confirm' },
                    { id: 'f5', type: 'Signature', label: 'Employee Signature', placeholder: 'Signature (text representation)' }
                ]
            },
            {
                id: 2,
                name: 'NDA Agreement',
                fields: 3,
                date: '2/10/2024',
                fieldConfig: [
                    { id: 'n1', type: 'Text', label: 'Disclosing Party', placeholder: 'Name of disclosing party' },
                    { id: 'n2', type: 'Text', label: 'Receiving Party', placeholder: 'Name of receiving party' },
                    { id: 'n3', type: 'Date', label: 'Effective Date' }
                ]
            },
            {
                id: 3,
                name: 'Service Agreement',
                fields: 4,
                date: '3/5/2024',
                fieldConfig: [
                    { id: 's1', type: 'Text', label: 'Client Name', placeholder: 'Client legal name' },
                    { id: 's2', type: 'Text', label: 'Service Description', placeholder: 'Brief description of services' },
                    { id: 's3', type: 'Text', label: 'Rate', placeholder: 'e.g. $50/hr' },
                    { id: 's4', type: 'Signature', label: 'Client Signature', placeholder: 'Sign here' }
                ]
            },
        ];

        const stored = localStorage.getItem('blueprints');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Check if data is stale (missing fieldConfig)
            if (parsed.length > 0 && !parsed[0].fieldConfig) {
                console.log('Migrating stale blueprint data...');
                setBlueprints(defaults);
                localStorage.setItem('blueprints', JSON.stringify(defaults));
            } else {
                setBlueprints(parsed);
            }
        } else {
            setBlueprints(defaults);
            localStorage.setItem('blueprints', JSON.stringify(defaults));
        }
    }, []);

    return (
        <div className="page-container">
            <div className="page-header-row">
                <div>
                    <h1 style={{ fontSize: '1.25rem' }}>Blueprints</h1>
                    <p>Manage contract templates</p>
                </div>
                <button
                    className="btn-dark-navy"
                    onClick={() => onNavigate('create-blueprint')}
                >
                    <span style={{ marginRight: '8px' }}>+</span> Create Blueprint
                </button>
            </div>

            <div className="table-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '50%' }}>Blueprint Name</th>
                            <th style={{ width: '25%' }}>Fields</th>
                            <th style={{ width: '25%' }}>Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blueprints.map((blueprint) => (
                            <tr key={blueprint.id}>
                                <td>
                                    <div className="flex-center">
                                        <span className="icon-box">📄</span>
                                        <strong>{blueprint.name}</strong>
                                    </div>
                                </td>
                                <td>
                                    <span className="pill">{blueprint.fields} fields</span>
                                </td>
                                <td>
                                    {blueprint.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Blueprints;
