import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExitWithoutSaving = ({ onClose }) => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    
    const handleClose = () => {
        setOpen(false);
        onClose && onClose();
    };

    const handleExit = () => {
        console.log('Saliendo sin guardar...');
        setOpen(false);
        navigate('/');
        onClose && onClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent style={{ padding: 0 }}>
                    <div style={{ backgroundColor: '#D32F2F', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: 'white' }}>!</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', textAlign: 'center' }}>
                        <DialogTitle id="alert-dialog-title">¿Estás seguro de que quieres salir sin guardar?</DialogTitle>
                        <DialogActions style={{ justifyContent: 'center' }}>
                            <Button onClick={handleClose} style={{ backgroundColor: '#2E7D32', color: 'white', margin: '0 8px' }}> Cancelar </Button>
                            <Button onClick={()=> navigate('/')} style={{ backgroundColor: '#D32F2F', color: 'white', margin: '0 8px' }} autoFocus> Salir </Button>
                        </DialogActions>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ExitWithoutSaving;


