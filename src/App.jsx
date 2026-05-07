import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './App.css';

import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import CreateBudget from './pages/CreateBudget';
import AllocateResources from './pages/AllocateResources';
import BudgetSummary from './pages/BudgetSummary';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-budget" element={<CreateBudget />} />
          <Route path="/allocate-resources" element={<AllocateResources />} />
          <Route path="/budget-summary" element={<BudgetSummary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
