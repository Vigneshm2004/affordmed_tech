import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('Looking for your link...');

  useEffect(() => {
    if (!shortCode) {
      setMessage("No short-code provided in the URL.");
      return;
    }

    console.log(`Attempting to redirect for short-code: ${shortCode}`);
    setMessage(`Redirecting from short-code: ${shortCode}`);

    const performRedirect = async () => {
      try {
        const longUrl = await api.getLongUrlAndLogClick(shortCode);
        console.log(`Found long URL: ${longUrl}. Redirecting now...`);
        window.location.replace(longUrl);
      } catch (err) {
        console.error("Redirect failed:", err);
        setError(err.message || 'An unexpected error occurred.');
        setMessage('Could not find a link for this short-code.');
      }
    };
    
    // Using a short delay so the message is visible before the redirect happens.
    const timer = setTimeout(() => {
        performRedirect();
    }, 500);

    return () => clearTimeout(timer);

  }, [shortCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">{message}</h2>
      {!error && <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mt-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default RedirectPage;

