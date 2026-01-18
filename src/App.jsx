import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Blueprints from './pages/Blueprints';
import CreateContract from './pages/CreateContract';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <Dashboard />;
      case 'blueprints': return <Blueprints />;
      case 'create': return <CreateContract />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {renderScreen()}
    </Layout>
  );
}

export default App;
