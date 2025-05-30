// pages/signup.jsx
import React ,{ useState }from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../config";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
    // Update form data on input change
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value, // Using id of input: name, email, password
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      alert("Signup successful!");
      navigate('./pages/dashboard.jsx');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
  {/* Left side */}
 <div className="md:flex w-1/2 bg-indigo-600 items-center justify-center">
    <img
      src="/img/test.jpeg" 
      alt="Signup Illustration"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right side - Form */}
  <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-6 md:px-16 py-12">
    <div className="max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Create your account</h2>
      <p className="text-sm text-gray-500 mb-8">
        Enter your details below to sign up and start learning.
      </p>

      <form onSubmit={handleSubmit} className="  space-y-6 ">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name here"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition font-medium"
        >
          Sign Up
        </button>
      </form>

      {/* Already have an account */}
      <p className="text-sm text-gray-500 mt-6 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-indigo-600 hover:underline">
          Log in
        </a>
      </p>

      {/* Terms */}
      <p className="text-xs text-gray-400 mt-4 text-center">
        By signing up, you agree to our{' '}
        <a href="/terms" className="underline">Terms</a> and{' '}
        <a href="/privacy" className="underline">Privacy Policy</a>.
      </p>
    </div>
  </div>
</div>

  );
};

export default Signup;
