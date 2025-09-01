import React, { useState } from 'react';

const AuthForm = ({ onAuthSuccess, onRegister, onGetToken, loading, error }) => {
  const [registerForm, setRegisterForm] = useState({
    email: '', name: '', mobileNo: '', githubUsername: '', rollNo: '', accessCode: '',
  });
  const [authForm, setAuthForm] = useState({ clientId: '', clientSecret: '' });

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-2xl transition-all duration-300">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center tracking-tight">Register & Authenticate</h2>
      <div className="w-full space-y-6">
        <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transform transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">Register</h3>
          <input className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="email" name="email" placeholder="Email" value={registerForm.email} onChange={handleRegisterChange} />
          <input className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="text" name="name" placeholder="Name" value={registerForm.name} onChange={handleRegisterChange} />
          <input className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="text" name="mobileNo" placeholder="Mobile No" value={registerForm.mobileNo} onChange={handleRegisterChange} />
          <input className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="text" name="githubUsername" placeholder="GitHub Username" value={registerForm.githubUsername} onChange={handleRegisterChange} />
          <input className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="text" name="rollNo" placeholder="Roll No" value={registerForm.rollNo} onChange={handleRegisterChange} />
          <input className="w-full p-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" type="text" name="accessCode" placeholder="Access Code" value={registerForm.accessCode} onChange={handleRegisterChange} />
          <button className="w-full p-4 font-bold text-lg text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300" onClick={() => onRegister(registerForm)}>Register</button>
        </div>
        <div className="p-6 sm:p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transform transition-all duration-300">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">Get Token</h3>
          <input className="w-full p-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" type="text" name="clientId" placeholder="Client ID" value={authForm.clientId} onChange={handleAuthChange} />
          <input className="w-full p-3 mb-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" type="password" name="clientSecret" placeholder="Client Secret" value={authForm.clientSecret} onChange={handleAuthChange} />
          <button className="w-full p-4 font-bold text-lg text-white bg-green-600 rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300" onClick={() => onGetToken(authForm)}>Get Token & Login</button>
        </div>
      </div>
      {loading && <p className="mt-6 text-center text-gray-600">Loading...</p>}
      {error && <p className="mt-6 text-center text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default AuthForm;
