import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Blueprints from './pages/Blueprints';
import ContractDetails from './pages/ContractDetails';
import CreateContract from './pages/CreateContract';
import CreateBlueprint from './pages/CreateBlueprint';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedContract, setSelectedContract] = useState(null);

  const handleViewContract = (contract) => {
    setSelectedContract(contract);
    setCurrentScreen('contract-details');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentScreen} onViewContract={handleViewContract} />;
      case 'blueprints': return <Blueprints onNavigate={setCurrentScreen} />;
      case 'create-blueprint': return <CreateBlueprint onNavigate={setCurrentScreen} />;
      case 'create': return <CreateContract onNavigate={setCurrentScreen} />;
      case 'contract-details': return <ContractDetails contract={selectedContract} onNavigate={setCurrentScreen} />;
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
