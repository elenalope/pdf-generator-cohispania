import React from 'react'
import { useDocument } from '../context/DocumentContext';


const Chapter = () => {
  const {data, setData,config, setConfig} = useDocument();
  console.log('hola', data);
  console.log('Config:', config);
  return (
    <div>Chapter</div>
  )
}

export default Chapter