import React from 'react';

const Blueprints = () => {
    const blueprints = [
        { id: 1, name: 'Standard Employment Contract', fields: 5, date: '1/15/2024' },
        { id: 2, name: 'NDA Agreement', fields: 3, date: '2/10/2024' },
        { id: 3, name: 'Service Agreement', fields: 4, date: '3/5/2024' },
    ];

    return (
        <div className="page-container">
            <div className="page-header-row">
                <div>
                    <h1>Blueprints</h1>
                    <p>Manage contract templates</p>
                </div>
                <button className="btn-primary">
                    + Create Blueprint
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
