// pages/login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../config";

const Login = () => {
    const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
  setFormData(prev => ({
    ...prev,
    [e.target.id]: e.target.value,
  }));
};
  const handleSubmit = async (e) => {
    if (!formData.email || !formData.password) {
  return setError('Please enter both email and password.');
}

    e.preventDefault();
    setError('');

  try {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert("Login successful!");
    navigate('/dashboard'); 
  } catch (err) {
    setError(err.message);
  }
};


  return (
   <div className="min-h-screen flex">
  {/* Left side - Image/Illustration */}
  <div className=" md:flex w-1/2 bg-indigo-600 items-center justify-center">
    <img
      src="../img/test.jpeg" 
      alt="Login Illustration"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right side - Login Form */}
  <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 md:px-16 py-12">
    <div className="max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
      <p className="text-sm text-gray-500 mb-8">
        Log in to your account to continue learning.
      </p>
      {error && (
  <p className="text-sm text-red-600 text-center mb-4">
    {error}
  </p>
)}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            onChange={handleChange}
            autoFocus
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right text-sm">
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition font-medium"
        >
          Log In
        </button>
      </form>

      {/* Don't have an account */}
      <p className="text-sm text-gray-500 mt-6 text-center">
        Don't have an account?{' '}
        <a href="/signup" className="text-indigo-600 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>
</div>

  );
};

export default Login;
