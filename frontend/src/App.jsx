import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/Home/Landing';
import SignUp from './Components/SignUp/SignUp';
import LoginAsAdmin from './Components/LoginAsAdmin/LoginAsAdmin';
import LoginAsUser from './Components/LoginAsUser/LoginAsUser'

// Placeholder components for demonstration
function LoginUser() {
  return <LoginAsUser/>;
}

function LoginProfessional() {
  return <h2>Login as Professional Page</h2>;
}

function LoginAdmin() {
  return <LoginAsAdmin />;
}

function SignUpUser() {
  return <SignUp/>
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/api/user/login" element={<LoginUser />} />
        <Route path="/login-professional" element={<LoginProfessional />} />
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/signup-user" element={<SignUpUser />} />
      </Routes>
    </Router>
  );
}
