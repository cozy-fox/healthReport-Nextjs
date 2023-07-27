import React, { createContext, useState } from 'react';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  return (
    <FileContext.Provider value={{ selectedFile, setSelectedFile,selectedContent, setSelectedContent }}>
      {children}
    </FileContext.Provider>
  );
};