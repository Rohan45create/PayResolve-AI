import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import PasswordUpdatedPage from './pages/PasswordUpdatedPage';
import ExceptionQueuePage from './pages/ExceptionQueuePage';
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
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password-updated" element={<PasswordUpdatedPage />} />
        
        {/* New Screens from design */}
        <Route path="/queue" element={<ExceptionQueuePage />} />
        <Route path="/status" element={<SandboxStatusPage />} />
        <Route path="/signed-out" element={<SignedOutPage />} />
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        
        {/* Catch-all routes to 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
