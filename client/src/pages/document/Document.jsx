import './Document.css';

function MyDocument() {
  return (
    <>
    <div className='template-name'>Nombre de la plantilla</div>
    <div className='document-body'>
      <div className='option-list'></div>
      <div className='pdf-background'></div>
    </div>
    <button className='exit-button'>SALIR SIN GUARDAR</button>
    </>
  )
}

export default MyDocument;