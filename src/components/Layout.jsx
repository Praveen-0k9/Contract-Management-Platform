import React from 'react';

const Layout = ({ children, currentScreen, onNavigate }) => {

    // Inline SVGs matching the reference lucide-react icons
    const icons = {
        dashboard: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
        ),
        blueprints: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        ),
        create: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
        )
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
        { id: 'blueprints', label: 'Blueprints', icon: icons.blueprints },
        { id: 'create', label: 'Create Contract', icon: icons.create },
    ];

    return (
        <div className="flex h-screen bg-[#f3f4f6]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Header - No Border */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="font-bold text-gray-900 whitespace-nowrap" style={{ fontSize: '22px' }}>Contract Manager</h1>
                </div>

                {/* Nav */}
                <nav className="p-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`sidebar-btn ${currentScreen === item.id ? 'active' : ''}`}
                        >
                            <span className={currentScreen === item.id ? 'text-gray-900' : 'text-gray-500'}>
                                {item.icon}
                            </span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
