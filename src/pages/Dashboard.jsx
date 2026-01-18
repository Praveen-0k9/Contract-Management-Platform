import React, { useState } from 'react';

const Dashboard = ({ onNavigate, onViewContract }) => {
    const [activeTab, setActiveTab] = useState('All');

    const filters = ['All', 'Created', 'Approved', 'Sent', 'Signed', 'Locked', 'Revoked'];

    const [contracts, setContracts] = useState([]);

    React.useEffect(() => {
        const stored = localStorage.getItem('contracts');
        if (stored) {
            setContracts(JSON.parse(stored));
        } else {
            // Mock data as per screenshot (defaults)
            const defaults = [
                { id: 1, name: 'Employment - John Doe', template: 'Standard Employment Contract', status: 'Signed', date: '1/10/2025' },
                { id: 2, name: 'NDA - Acme Corp', template: 'NDA Agreement', status: 'Approved', date: '1/12/2025' },
                { id: 3, name: 'Service - Widget Inc', template: 'Service Agreement', status: 'Sent', date: '1/14/2025' },
                { id: 4, name: 'Employment - Jane Smith', template: 'Standard Employment Contract', status: 'Created', date: '1/16/2025' },
                { id: 5, name: 'NDA - Beta Solutions', template: 'NDA Agreement', status: 'Locked', date: '12/20/2024' },
            ];
            setContracts(defaults);
            localStorage.setItem('contracts', JSON.stringify(defaults));
        }
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case 'Signed': return 'badge-success';
            case 'Approved': return 'badge-info';
            case 'Sent': return 'badge-purple';
            case 'Created': return 'badge-neutral';
            case 'Locked': return 'badge-gray';
            case 'Revoked': return 'badge-danger';
            default: return 'badge-neutral';
        }
    };

    const filteredContracts = activeTab === 'All'
        ? contracts
        : contracts.filter(contract => contract.status === activeTab);

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
                            <th style={{ width: '30%', fontWeight: 'bold' }}>Contract Name</th>
                            <th style={{ width: '25%', fontWeight: 'bold' }}>Blueprint Name</th>
                            <th style={{ width: '15%', fontWeight: 'bold' }}>Status</th>
                            <th style={{ width: '15%', fontWeight: 'bold' }}>Created Date</th>
                            <th style={{ width: '15%', fontWeight: 'bold' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredContracts.map((contract) => (
                            <tr key={contract.id}>
                                <td>
                                    <span className="font-medium text-main">{contract.name}</span>
                                </td>
                                <td>
                                    <span className="text-secondary" style={{ fontWeight: 600 }}>{contract.template}</span>
                                </td>
                                <td>
                                    <span className={`badge ${getStatusClass(contract.status)}`}>
                                        {contract.status}
                                    </span>
                                </td>
                                <td>
                                    <span className="text-secondary" style={{ fontWeight: 600 }}>{contract.date}</span>
                                </td>
                                <td>
                                    <button
                                        className="icon-btn"
                                        onClick={() => onViewContract(contract)}
                                        style={{ fontWeight: 600 }}
                                    >
                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ strokeWidth: 2 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View
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
