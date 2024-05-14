import React from 'react'
import { useContext, useState, createContext } from 'react'

export const DocumentContext = createContext()

const DocumentProvider = ({children}) => {
      const [data, setData] = useState(null);
      const [config, setConfig] = useState(null);
  return (
    <DocumentContext.Provider value={{ config, setConfig, data, setData }}>
        {children}
    </DocumentContext.Provider>
  )
}

export const useDocument = () => useContext(DocumentContext);

export default DocumentProvider;
