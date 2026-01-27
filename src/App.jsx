import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import SubmissionForm from './components/Forms/SubmissionForm';
import ChangeLog from './components/Tables/ChangeLog';
import ApprovalQueue from './components/Workflow/ApprovalQueue';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'submit':
        return <SubmissionForm onSubmitSuccess={() => setActiveTab('dashboard')} />;
      case 'history':
        return <ChangeLog />;
      case 'approvals':
        return <ApprovalQueue />;
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Planning Dashboard';
      case 'submit': return 'Submit New Update';
      case 'history': return 'Change History';
      case 'approvals': return 'Pending Approvals';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="app" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <Header title={getTitle()} />
        <main style={{ padding: 'var(--spacing-xl)', flex: 1, overflowY: 'auto' }}>
          <div className="container">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
