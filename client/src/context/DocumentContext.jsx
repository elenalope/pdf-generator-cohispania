import React from 'react'
import { useContext, useState, createContext } from 'react'

export const DocumentContext = createContext()

const DocumentProvider = ({children}) => {


  return (
    <DocumentContext.Provider value={{}}>
        {children}
    </DocumentContext.Provider>
  )
}

export default DocumentProvider;
export const useDocument = () => useContext(DocumentContext);
