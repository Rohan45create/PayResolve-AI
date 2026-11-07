import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
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
import EventInboxPage from './pages/EventInboxPage';
import UIStatesPage from './pages/UIStatesPage';
import SignedOutPage from './pages/SignedOutPage';
import ForbiddenPage from './pages/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/check-email" element={<CheckEmailPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password-updated" element={<PasswordUpdatedPage />} />
        <Route path="/signed-out" element={<SignedOutPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Protected dashboard routes */}
        <Route path="/queue" element={<ProtectedRoute><ExceptionQueuePage /></ProtectedRoute>} />
        <Route path="/case/:id" element={<ProtectedRoute><CaseDetailsPage /></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><DemoShopPage /></ProtectedRoute>} />
        <Route path="/actions" element={<ProtectedRoute><ActionsAuditPage /></ProtectedRoute>} />
        <Route path="/benchmark" element={<ProtectedRoute><BenchmarkPage /></ProtectedRoute>} />
        <Route path="/status" element={<ProtectedRoute><SandboxStatusPage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventInboxPage /></ProtectedRoute>} />
        <Route path="/ui-states" element={<ProtectedRoute><UIStatesPage /></ProtectedRoute>} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
