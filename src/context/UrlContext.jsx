import React, { createContext, useState, useContext } from 'react';

const UrlContext = createContext();

export const useUrls = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);

  const addShortenedUrls = (newUrls) => {
    setUrls(prevUrls => [...prevUrls, ...newUrls]);
  };

  const value = {
    urls,
    addShortenedUrls,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};