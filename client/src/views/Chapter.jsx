import React from 'react'
import { useDocument } from '../context/DocumentContext';
import ChapterDialog from '../components/chapter/ChapterDialog.jsx';


const Chapter = () => {
  const {data, setData,config, setConfig} = useDocument();
  console.log('hola', data);
  console.log('Config:', config);
  return (
    <>
    <ChapterDialog />
    {/* <ChapterCard /> */}
    </>
  )
}

export default Chapter