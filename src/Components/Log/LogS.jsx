import React, { useState } from 'react';
import { Mail, Lock, BookOpen } from 'lucide-react';
import { signInWithGoogle, loginWithEmail } from '../../Firebase'; // Import your Firebase functions
import { useNavigate } from 'react-router-dom';
import './LogS.css';

const LogS = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle(); // Call your Google sign-in function
      navigate('/home'); // Navigate to /home on success
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
      console.error("Google Sign-In Error:", error);
    }
    setIsLoading(false);
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await loginWithEmail(email, password); // Call your email login function
      navigate('/home'); // Navigate to /home on success
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      console.error("Email Sign-In Error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <BookOpen className="logo-icon" />
          </div>
          <h1 className="login-title">IELTS Mock Test</h1>
          <p className="login-subtitle">Sign in to access your practice tests</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="google-signin-button"
        >
          <svg className="google-icon" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="divider">
          <span>Or continue with email</span>
        </div>

        <form onSubmit={handleEmailSignIn} className="login-form">
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button 
              type="button"
              className="forgot-password"
              onClick={() => console.log('Handle forgot password')}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </form>

        <div className="signup-prompt">
          <p>
            Don't have an account?{' '}
            <button 
              onClick={() => console.log('Navigate to signup')}
              className="signup-link"
            >
              
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogS;
