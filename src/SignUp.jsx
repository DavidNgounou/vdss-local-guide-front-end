import { useState } from 'react'
import axios from 'axios'
import './App.css'
import Select from 'react-select';
import FloatingInput from './FloatingInput.jsx'; // Assuming you have a FloatingInput component
import { Link } from 'react-router-dom';
import { API_URL } from './services/Services.jsx';
import { Navigate } from 'react-router-dom';
function SignUp() {
  const [fields, setFields] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    roleId: ''
  });
  const [focus, setFocus] = useState({
    email: false,
    name: false,
    surname: false,
    password: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update handleChange to handle both input and select
  const handleChange = (e) => {
    // For react-select, e will be the selected option object
    if (e && e.value !== undefined && e.label !== undefined) {
      setFields({ ...fields, roleId: e.value });
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
    setError('');
    setSuccess('');
    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post(API_URL + 'auth/signup', fields);
      setSuccess('Registration successful!');
      setLoading(false);
      // Navigation will be handled by state below
    } catch (err) {
      setError('Registration failed. Please try again.');
      setLoading(false);
    } finally {
      console.log(false);
    }
  };

  if (success) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="login-form-card">
        <div className="login-header">
          <h2>Sign Up</h2>
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
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={fields.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={focus.name}
          />
          <FloatingInput
            id="surname"
            name="surname"
            type="text"
            placeholder="Surname"
            value={fields.surname}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={focus.surname}
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
          <Select
            options={[
              { value: '1', label: 'Local Guide' },
              { value: '2', label: 'Police Officer' },
            ]}
            className="react-select"
            name="roleId"
            placeholder="Select a roleId"
            value={
              fields.roleId
                ? {
                    value: fields.roleId,
                    label: fields.roleId === '1' ? 'Local Guide' : 'Police Officer',
                  }
                : null
            }
            onChange={handleChange} // This now works for react-select
            styles={{
              control: (base) => ({
                ...base,
                border: '1px solid #ccc',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#aaa',
                },
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            menuPlacement="auto"
            menuPosition="fixed"
          />
          <button type="submit" className="login-submit-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Sign Up'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <p>Have an Account?
            <Link to="/" className="forgot-password"> log in</Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default SignUp
