import React, { createContext, useState } from 'react';
import { useRouter } from 'next/router';

export const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [latest, setLatest] = useState(null);
  const [search, setSearch1] = useState('');
  const [sort, setSort] = useState('recent');
  const [range, setRange] = useState([null, null])

  const setSearch=(strings)=>{
    setSearch1(strings);
    router.push('/select_file');
  }

  return (
    <FileContext.Provider
      value={{
        latest, setLatest,
        selectedFile, setSelectedFile,
        selectedContent, setSelectedContent,
        search, setSearch,
        sort, setSort,
        range, setRange
      }}>
      {children}
    </FileContext.Provider>
  );
};