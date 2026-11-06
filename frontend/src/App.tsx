import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckEmailPage from './pages/CheckEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PasswordUpdatedPage from './pages/PasswordUpdatedPage';
import ExceptionQueuePage from './pages/ExceptionQueuePage';
import CaseDetailsPage from './pages/CaseDetailsPage';
import DemoShopPage from './pages/DemoShopPage';
import ActionsAuditPage from './pages/ActionsAuditPage';
import BenchmarkPage from './pages/BenchmarkPage';
import SandboxStatusPage from './pages/SandboxStatusPage';
import SignedOutPage from './pages/SignedOutPage';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password-updated" element={<PasswordUpdatedPage />} />
        
        {/* Core Platform Routes */}
        <Route path="/queue" element={<ExceptionQueuePage />} />
        <Route path="/case/:id" element={<CaseDetailsPage />} />
        <Route path="/shop" element={<DemoShopPage />} />
        <Route path="/actions" element={<ActionsAuditPage />} />
        <Route path="/benchmark" element={<BenchmarkPage />} />
        <Route path="/status" element={<SandboxStatusPage />} />
        <Route path="/signed-out" element={<SignedOutPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
