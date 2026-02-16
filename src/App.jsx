import React, { useState, useEffect } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import SubmissionForm from './components/Forms/SubmissionForm';
import ChangeLog from './components/Tables/ChangeLog';
import ApprovalQueue from './components/Workflow/ApprovalQueue';
import { Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
      else setIsSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="app" style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40
          }}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (isMobile) setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div style={{
        flex: 1,
        marginLeft: isMobile ? 0 : '260px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        <Header
          title={getTitle()}
          onMenuClick={() => setIsSidebarOpen(true)}
          showMenu={isMobile}
        />
        <main style={{ padding: isMobile ? 'var(--spacing-md)' : 'var(--spacing-xl)', flex: 1, overflowY: 'auto' }}>
          <div className="container" style={{ padding: 0 }}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
