import React, { useState } from 'react';
import api from '../services/api';
import { useUrls } from '../context/UrlContext';

const HomePage = () => {
  const [urlEntries, setUrlEntries] = useState([{ id: 1, longUrl: '', validity: '', customShortcode: '' }]);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const { addShortenedUrls } = useUrls();

  const handleAddRow = () => {
    if (urlEntries.length < 5) {
      setUrlEntries([...urlEntries, { id: Date.now(), longUrl: '', validity: '', customShortcode: '' }]);
    }
  };

  const handleRemoveRow = (id) => {
    setUrlEntries(urlEntries.filter(entry => entry.id !== id));
  };

  const handleChange = (id, field, value) => {
    setUrlEntries(urlEntries.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
  };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    urlEntries.forEach((entry) => {
      if (!entry.longUrl || !urlRegex.test(entry.longUrl)) {
        newErrors[entry.id] = { ...newErrors[entry.id], longUrl: 'Please enter a valid URL.' };
        isValid = false;
      }
      if (entry.validity && !/^\d+$/.test(entry.validity)) {
        newErrors[entry.id] = { ...newErrors[entry.id], validity: 'Must be an integer.' };
        isValid = false;
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');
    setShortenedUrls([]);
    if (!validateInputs()) return;
    setIsLoading(true);
    try {
      const response = await api.createShortUrls(urlEntries);
      setShortenedUrls(response);
      addShortenedUrls(response);
    } catch (error) {
       setApiError('An error occurred. Some shortcodes might be taken.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-700 text-gray-200 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorInputClass = "w-full bg-gray-700 text-gray-200 border border-red-500 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500";
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Create Short URLs</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {urlEntries.map((entry, index) => (
            <div key={entry.id} className="flex items-start md:items-center flex-col md:flex-row gap-3">
              <div className="flex-1 w-full">
                <input
                  type="url"
                  placeholder="Original Long URL"
                  className={errors[entry.id]?.longUrl ? errorInputClass : inputClass}
                  value={entry.longUrl}
                  onChange={(e) => handleChange(entry.id, 'longUrl', e.target.value)}
                />
                 {errors[entry.id]?.longUrl && <p className="text-red-500 text-sm mt-1">{errors[entry.id].longUrl}</p>}
              </div>
              <div className="w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Validity (mins)"
                  className={`${errors[entry.id]?.validity ? errorInputClass : inputClass} md:w-36`}
                  value={entry.validity}
                  onChange={(e) => handleChange(entry.id, 'validity', e.target.value)}
                />
                {errors[entry.id]?.validity && <p className="text-red-500 text-sm mt-1">{errors[entry.id].validity}</p>}
              </div>
              <div className="w-full md:w-auto">
                 <input
                  type="text"
                  placeholder="Custom Shortcode"
                  className={`${inputClass} md:w-44`}
                  value={entry.customShortcode}
                  onChange={(e) => handleChange(entry.id, 'customShortcode', e.target.value)}
                />
              </div>
              <button type="button" onClick={() => handleRemoveRow(entry.id)} disabled={urlEntries.length === 1} className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:hover:text-gray-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4">
             <button type="button" onClick={handleAddRow} disabled={urlEntries.length >= 5} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 disabled:hover:text-blue-400 transition mb-4 sm:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
                Add another URL
            </button>
            <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50 flex items-center justify-center">
              {isLoading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>}
              {isLoading ? 'Processing...' : 'Shorten URLs'}
            </button>
          </div>
        </form>
      </div>
      {apiError && <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg mt-6">{apiError}</div>}
      {shortenedUrls.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Shortened URLs</h2>
          <ul className="divide-y divide-gray-700">
            {shortenedUrls.map((url) => (
              <li key={url.id} className="py-4">
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-400 hover:underline break-all">{url.shortUrl}</a>
                <p className="text-sm text-gray-400 mt-1 truncate">Original: {url.longUrl}</p>
                <p className="text-sm text-gray-500 mt-1">Expires: {new Date(url.expiresAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;