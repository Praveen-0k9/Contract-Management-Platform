import React, { useState } from 'react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('All');

    const filters = ['All', 'Created', 'Approved', 'Sent', 'Signed', 'Locked'];

    // Mock data as per screenshot
    const contracts = [
        { id: 1, name: 'Employment - John Doe', template: 'Standard Employment Contract', status: 'Signed', date: '1/10/2025' },
        { id: 2, name: 'NDA - Acme Corp', template: 'NDA Agreement', status: 'Approved', date: '1/12/2025' },
        { id: 3, name: 'Service - Widget Inc', template: 'Service Agreement', status: 'Sent', date: '1/14/2025' },
        { id: 4, name: 'Employment - Jane Smith', template: 'Standard Employment Contract', status: 'Created', date: '1/16/2025' },
        { id: 5, name: 'NDA - Beta Solutions', template: 'NDA Agreement', status: 'Locked', date: '12/20/2024' },
    ];

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

    return (
        <div className="dashboard-container">
            <div className="page-header">
                <h1>Dashboard</h1>
                <p>View and manage all contracts</p>
            </div>

            <div className="filter-row">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveTab(filter)}
                        className={`filter-btn ${activeTab === filter ? 'active' : ''}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="table-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>Contract Name</th>
                            <th style={{ width: '25%' }}>Blueprint Name</th>
                            <th style={{ width: '15%' }}>Status</th>
                            <th style={{ width: '15%' }}>Created Date</th>
                            <th style={{ width: '15%' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) => (
                            <tr key={contract.id}>
                                <td>
                                    <span className="font-medium text-main">{contract.name}</span>
                                </td>
                                <td>
                                    <span className="text-secondary">{contract.template}</span>
                                </td>
                                <td>
                                    <span className={`badge ${getStatusClass(contract.status)}`}>
                                        {contract.status}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-secondary">{contract.date}</span>
                                </td>
                                <td>
                                    <button className="icon-btn">
                                        <span className="icon-eye">👁</span> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
