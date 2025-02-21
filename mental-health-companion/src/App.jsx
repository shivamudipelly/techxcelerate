import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import DragAndDropList from './components/DragAndDropList';


import './App.css';
import ChatInterface from './pages/ChatInterface';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout is the parent route */}
        <Route path="/" element={<MainLayout />}>
          {/* Index route - this will render Home with direct text */}
          <Route index element={<div>Welocme to the Home page!</div>} />

          {/* Dashboard route */}
          <Route path="dashboard" element={<div>Welcome to the Dashboard!</div>} />

          {/* Statistics route */}
          <Route path="statistics" element={<div>Welcome to the Statistics Page!</div>} />

          {/* Chat route */}
          <Route path="chat" element={<ChatInterface />} />

          {/* Orders route */}
          <Route path="fileUpload" element={<DragAndDropList />} />

          {/* Billings route */}
          <Route path="billings" element={<div>Welcome to the Billings Page!</div>} />

          {/* Help route */}
          <Route path="help" element={<div>Welcome to the Help Page!</div>} />

          {/* Profile route */}
          <Route path="profile" element={<div>Welcome to the Profile Page!</div>} />

          {/* Settings route */}
          <Route path="settings" element={<div>Welcome to the Settings Page!</div>} />
          <Route path="home" element={<div>Welcome to the Home Page!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
