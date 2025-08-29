import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('adityatiwary888@gmail.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await loginUser(password, email);
      dispatch(login(data.user));
      navigate({ to: '/dashboard' });
      setLoading(false);
      console.log('signin success');
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-black p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-200/20">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-200 border border-red-400/30 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-200 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg bg-gray-900/50 text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-200 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg bg-gray-900/50 text-white placeholder-gray-400
                       focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition duration-200 
          ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/50'}`}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Switch to Register */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => state(false)}
            className="text-indigo-400 font-medium hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
