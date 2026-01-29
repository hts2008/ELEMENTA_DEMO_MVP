import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/store';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { ShopPage } from './pages/Shop';
import { ProductDetailPage } from './pages/ProductDetail';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Fallback routes */}
            <Route path="/about" element={<div className="pt-32 text-center font-mono">LAB REPORT UNDER CONSTRUCTION</div>} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;