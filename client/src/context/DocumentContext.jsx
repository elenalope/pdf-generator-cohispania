import React from 'react'
import { useContext, useState, createContext } from 'react'


export const DocumentContext = createContext()

const DocumentProvider = ({children}) => {
  const [documents, setDocuments] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [data, setData] = useState(null);

  return (
    <DocumentContext.Provider value={{ documents,
      setDocuments,
      currentDocument,
      setCurrentDocument, data, setData}}>
        {children}
    </DocumentContext.Provider>
  )
}

export const useDocument = () => useContext(DocumentContext);

export default DocumentProvider;
