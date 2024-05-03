import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf';
import './Config.css'


const Config = () => {

    const[size, setSize] = useState('A4');
    const[title, setTitle] = useState('');
    const[subtitle, setSubtitle] = useState('');
    const[toc, setToc] = useState(false);
    const[logo, setLogo] = useState(null);
    const navigate = useNavigate();

    const handleConfig = () => {

        navigate('/document', {state: {config: {size, title, subtitle,logo, toc }}});
    }

  return (
    <>
    <h2 className='configTitle'>Configura tu plantilla</h2>
    <div className='containerConfig'>
        <label htmlFor="" className='configLabel'>
            Tamaño:
            <select  value={size} onChange={(e)=> setSize(e.target.value)} name="" id="">
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A5">A5</option>
            </select>
        </label>
        <label htmlFor="" className='configLabel'>
            Título:
            <input className='configInput' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="" className='configLabel'>
            Subtítulo:
            <input className='configInput' type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/>
        </label>
        <label htmlFor="" className='configLabel'>
                Incluir Índice:
                <input className='configInput' type="checkbox"  checked={toc} onChange={(e) => setToc(e.target.checked)} />
            </label>
        <label htmlFor="" className='configLabel'>
            Logo:
            <input className='configInput' type="text" onChange={(e) => setLogo(e.target.files[0])} />
        </label>
        <div className='containerButtonsConfig'>
        <button className='configButton' onClick={()=>navigate('/')}>Cancelar</button>
        <button className='configButton' onClick={handleConfig}>Crear plantilla</button> 
        </div>
        
{/*         <PreviewPdf handleConfig={handleConfig} />
 */}    </div>
    
    
    </>
    
  )
}

export default Config;