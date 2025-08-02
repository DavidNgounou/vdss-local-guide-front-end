import { useState } from 'react'
import axios from 'axios'
import './App.css'
import FloatingInput from './FloatingInput.jsx'; // Assuming you have a FloatingInput component
import { Link } from 'react-router-dom';
import { API_URL } from './services/Services.jsx'; // Importing API_URL if needed
 
function SignIn() {
  console.log('API_URL:', API_URL); // Log the API_URL to verify it's imported correctly
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [focus, setFocus] = useState({
    email: false,
    password: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update handleChange to handle both input and select
  const handleChange = (e) => {
    // For react-select, e will be the selected option object
    if (e && e.value !== undefined && e.label !== undefined) {
      setFields({ ...fields, role: e.value });
    } else if (e && e.target) {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  };

  const handleFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setFocus({ ...focus, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post(`${API_URL}/auth/login`, fields,
        {
            headers: { 'Content-Type': 'application/json' }
        }
      );
      setSuccess(prev=>'Registration successful!');
      setLoading(false);
      console.log(response.data);
      handleLogin(response.data);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.log(err);
      setLoading(false);
    } finally {
      console.log(false);
    }
  };

  const handleLogin = (loginCredentials)=> {
    //Redirect based on user role
    //Assuming response.data.role is '1' for police and '2' for local guide
    window.location.href =  loginCredentials.role.id === '1' ? 'http://localhost:5173' : 'http://localhost:5175';

  }

  return (
    <>
      <div className="login-form-card">
        <div className="login-header">
          <h2>Log in</h2>\
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <FloatingInput
            id="email"
            name="email"
            type="text"
            placeholder="Username"
            value={fields.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={focus.email}
          />
          <FloatingInput
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={fields.password}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={focus.password}
          />
          <button type="submit" className="login-submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <p>Don't have an account?
            <Link to="/signup" className="forgot-password"> Sign Up</Link>
            </p>
        </form>
      </div>
    </>
  )
}

export default SignIn;
