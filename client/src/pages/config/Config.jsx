import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Config = () => {

    const[size, setSize] = useState('A4');
    const[title, setTitle] = useState('');
    const[subtitle, setSubtitle] = useState('');
    const[logo, setLogo] = useState(null);
    const navigate = useNavigate();

    const handleConfig = () => {

        navigate('/document', {state: {config: {size, title, subtitle,logo }}});
    }

  return (
    <div>
        <h2>Configura tu plantilla</h2>
        <label htmlFor="">
            Tamaño:
            <select value={size} onChange={(e)=> setSize(e.target.value)} name="" id="">
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A5">A5</option>
            </select>
        </label>
        <label htmlFor="">
            Título:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="">
            Subtítulo:
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}/>
        </label>
        <label htmlFor="">
            Logo:
            <input type="text" onChange={(e) => setLogo(e.target.files[0])} />
        </label>
        <button onClick={handleConfig}>Crear plantilla</button>
    </div>
  )
}

export default Config;