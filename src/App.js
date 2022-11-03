import { Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import { ProtectedRoute } from './components/ProtectedRoute';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import CategoryAdminPage from './pages/admin/CategoryAdminPage';
import ProductAdminPage from './pages/admin/ProductAdminPage';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <DashboardAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/category" element={
          <ProtectedRoute>
            <CategoryAdminPage  />
          </ProtectedRoute>
        } />

        <Route path="/admin/product" element={
          <ProtectedRoute>
            <ProductAdminPage/>
          </ProtectedRoute>

        } />
      </Routes>
    </div>
  )
}

export default App;
