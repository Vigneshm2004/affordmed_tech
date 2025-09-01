import React, { useState } from 'react';

const URLShortenerForm = ({ onSubmit, loading, error, shortenedUrls }) => {
  const [urlForms, setUrlForms] = useState(Array.from({ length: 1 }, () => ({ longUrl: '', validity: '', shortcode: '' })));

  const handleUrlFormChange = (index, e) => {
    const newForms = [...urlForms];
    newForms[index][e.target.name] = e.target.value;
    setUrlForms(newForms);
  };

  const addUrlForm = () => {
    if (urlForms.length < 5) {
      setUrlForms([...urlForms, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(urlForms);
    setUrlForms(Array.from({ length: 1 }, () => ({ longUrl: '', validity: '', shortcode: '' })));
  };

  return (
    <div className="flex flex-col items-center p-6 sm:p-8 bg-white rounded-2xl shadow-2xl w-full max-w-4xl transition-all duration-300">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">URL Shortener</h2>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        {urlForms.map((form, index) => (
          <div key={index} className="flex flex-col md:flex-row md:space-x-4 md:items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Long URL</label>
              <input
                className="w-full p-3 rounded-xl border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="text"
                name="longUrl"
                value={form.longUrl}
                onChange={(e) => handleUrlFormChange(index, e)}
              />
            </div>
            <div className="flex-none w-full md:w-28 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">Validity (min)</label>
              <input
                className="w-full p-3 rounded-xl border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="number"
                name="validity"
                value={form.validity}
                onChange={(e) => handleUrlFormChange(index, e)}
              />
            </div>
            <div className="flex-none w-full md:w-28 mt-4 md:mt-0">
              <label className="block text-sm font-medium text-gray-700">Shortcode</label>
              <input
                className="w-full p-3 rounded-xl border border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                type="text"
                name="shortcode"
                value={form.shortcode}
                onChange={(e) => handleUrlFormChange(index, e)}
              />
            </div>
          </div>
        ))}
        {urlForms.length < 5 && (
          <button
            type="button"
            onClick={addUrlForm}
            className="w-full p-4 font-bold text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300"
          >
            Add Another URL ({urlForms.length} of 5)
          </button>
        )}
        <button
          type="submit"
          className="w-full p-4 font-bold text-lg text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Shorten URLs
        </button>
      </form>
      
      {loading && <p className="mt-6 text-center text-gray-600">Loading...</p>}
      {error && <p className="mt-6 text-center text-red-500 font-medium">{error}</p>}
      
      {shortenedUrls.length > 0 && (
        <div className="mt-8 w-full p-6 bg-gray-50 rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Shortened URLs</h3>
          <ul className="space-y-4">
            {shortenedUrls.map((url, index) => (
              <li key={index} className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <p className="font-semibold text-gray-700">Original URL:</p>
                <a href={url.longUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-words hover:underline">{url.longUrl}</a>
                <p className="mt-2 font-semibold text-gray-700">Shortened URL:</p>
                <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-mono break-all hover:underline">{url.shortUrl}</a>
                <p className="mt-2 text-sm text-gray-500">Expires: {new Date(url.expiresAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default URLShortenerForm;
