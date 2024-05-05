import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf';
import './Config.css'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Config = () => {

    const[size, setSize] = useState('A4');
    const[title, setTitle] = useState('');
    const[subtitle, setSubtitle] = useState('');
    const[toc, setToc] = useState(false);
    const[coverLogo, setCoverLogo] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const navigate = useNavigate();
    

    const handleConfig = () => {

        navigate('/document', {state: {config: {size, title, subtitle,coverLogo, toc, theme, padding, highlightedValue, docExplanation, coverImg, headerLogo, watermark, orientation }}});
    }
    const handlePreview = () =>{
        setShowPreview(!showPreview);
    }

  return (
    <>
    <div className='configBar'>
        <h2 className='configTitle'>Configura tu plantilla</h2>
        <ul className='listButtonsConfig'>
            <li><SaveIcon/></li>
            <li><GetAppIcon/></li>
            <li onClick={handlePreview}><VisibilityIcon/></li>
        </ul>
    </div>
    <div className='containerConfig'>
        <label id="demo-simple-select-standard-label" className='configLabelSize'>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={size}
            onChange={(e)=> setSize(e.target.value)}
            label="Tamaño"
            >
            <MenuItem value={'A4'}>A4</MenuItem>
            <MenuItem value={'A5'}>A5</MenuItem>
            <MenuItem value={'A3'}>A3</MenuItem>
            </Select>
        </label>
        <label className='configLabel'>
            <TextField id='title' label="Título" variant='standard' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        </label>
        <label className='configLabel'>
            <TextField id='subtitle' label="Subtítulo" variant='standard' value={subtitle} onChange={(e)=> setSubtitle(e.target.value)}/>
        </label>
        <label className='configLabel'>
                Incluir Índice:
                <Switch id="toc-switch"  checked={toc} onChange={(e) => setToc(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }}/>
        </label>
        <label htmlFor="" className='configLabel'>
            <TextField id='coverLogo' label="cover Logo" variant='standard' value={coverLogo} onChange={(e)=> setCoverLogo(e.target.value)}/>
        </label>
        <div className='containerButtonsConfig'>
            <Button variant="contained" onClick={handleConfig}>Crear </Button>
            <Button variant="outlined" onClick={()=>navigate('/')}>Cancelar</Button>
        </div>    
        {showPreview && <PreviewPdf config={{ size, title, subtitle, coverLogo, toc } }/>}

    </div>
    
    </>
    
  )
}

export default Config;