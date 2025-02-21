import { BrowserRouter, Routes, Route } from 'react-router-dom';



import MainLayout from './layout/MainLayout';
import DragAndDropList from './pages/DragAndDropList';


import './App.css';
import ChatInterface from './pages/ChatInterface';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Setting';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout is the parent route */}
        <Route path="/" element={<MainLayout />}>
          {/* Index route - this will render Home with direct text */}
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<ChatInterface />} />
          <Route path="fileUpload" element={<DragAndDropList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
