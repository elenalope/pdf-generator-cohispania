import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DeletePDF = ({ onClose, onConfirm }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose && onClose();
    };

    const handleDelete = async () => {
        setOpen(false);
        await onConfirm();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent style={{ padding: 0 }}>
                    <div style={{ backgroundColor: '#D32F2F', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', color: 'white' }}>!</div>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', textAlign: 'center' }}>
                        <DialogTitle id="alert-dialog-title">¿Estás seguro de que quieres eliminar el documento?</DialogTitle>
                        <DialogActions style={{ justifyContent: 'center' }}>
                            <Button onClick={handleClose} style={{ backgroundColor: '#2E7D32', color: 'white', margin: '0 8px' }}> Cancelar </Button>
                            <Button onClick={handleDelete} style={{ backgroundColor: '#D32F2F', color: 'white', margin: '0 8px' }} autoFocus> Eliminar documento </Button>
                        </DialogActions>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DeletePDF;