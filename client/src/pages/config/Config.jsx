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
import FormControlLabel from '@mui/material/FormControlLabel';


const Config = () => {

    const [pdfBlob, setPdfBlob] = useState(null);
    const[size, setSize] = useState('A4');
    const[title, setTitle] = useState('');
    const[subtitle, setSubtitle] = useState('');
    const[toc, setToc] = useState(false);
    const[tocLevels, setTocLevels] = useState(1, 2, 3);
    const[padding, setPadding] = useState('')
    const[coverLogo, setCoverLogo] = useState(null);
    const[showPreview, setShowPreview] = useState(false);
    const[includeBackCover, setIncludeBackCover] = useState(false)
    const[includeCover, setIncludeCover] = useState(false)
    const[theme, setTheme] = useState('')
    const[highlightedValue, setHighlightedValue] = useState('')
    const[docExplanation, setDocExplanation] = useState('')
    const[coverImg, setCoverImg] = useState('')
    const[headerLogo, setHeaderLogo] = useState('')
    const[orientation, setOrientation] = useState('portrait')
    const[watermark, setWatermark] = useState('')
    const navigate = useNavigate();
    const [indexItems, setIndexItems] = useState([]);
    

    const handleConfig = () => {

        navigate('/document', {state: {config: {size, title, subtitle,coverLogo, toc, tocLevels, theme, padding, highlightedValue, docExplanation, coverImg, headerLogo, watermark, includeCover,includeBackCover, indexItems }}});
    }
    const handlePreview = () =>{
        setShowPreview(!showPreview);
    }
    const addIndexItem = () => {
        const newItem = {
           level: tocLevels, // Asume que tocLevels es el nivel del nuevo elemento
           title: 'Nuevo título', // Aquí deberías obtener el título del nuevo elemento, por ejemplo, a través de un campo de entrada
        };
        setIndexItems([...indexItems, newItem]);
       };

  return (
    <>
    <form >
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
        <FormControlLabel
            control={
        <Switch id="toc-switch" checked={toc}
            onChange={(e) => setToc(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="Índice"/>
        </label>
        <label className='configLabel'>
            <Select
                labelId="toc-levels-select-label"
                id="toc-levels-select"
                value={tocLevels}
                onChange={(e) => setTocLevels(e.target.value)}
                label="Nivel del Índice"
            >
                <MenuItem value={1}>Chapters</MenuItem>
                <MenuItem value={2}>Sections</MenuItem>
                <MenuItem value={3}>Subsections</MenuItem>
            </Select>
        </label>
        <label htmlFor="" className='configLabel'>
            <TextField id='coverLogo' label="cover Logo" variant='standard' value={coverLogo} onChange={(e)=> setCoverLogo(e.target.value)}/>
        </label>
        <label id="demo-simple-select-filled-label" className='configLabel'>
            Padding:
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={padding}
          onChange={(e)=> setPadding(e.target.value)}
          label="Padding"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </label>
        <label className='configLabel'>
        <FormControlLabel
            control={
        <Switch id="includeCover-switch" checked={includeCover}
            onChange={(e) => setIncludeCover(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="Portada"/>
        </label>
        <label className='configLabel'>
        <FormControlLabel
            control={
        <Switch id="includeBackCover-switch" checked={includeBackCover}
            onChange={(e) => setIncludeBackCover(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="Contraportada"/>
        </label>
        
        <div className='containerButtonsConfig'>
            <Button variant="contained" onClick={handleConfig}>Crear </Button>
            <Button variant="outlined" onClick={()=>navigate('/')}>Cancelar</Button>
        </div>    
        {showPreview && <PreviewPdf config={{ size, title, subtitle, coverLogo, toc } }/>}

    </div>
    </form>
    </>
    
  )
}

export default Config;