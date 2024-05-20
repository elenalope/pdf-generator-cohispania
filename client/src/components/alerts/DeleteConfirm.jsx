import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Deleting = ({ onClose }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            onClose && onClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onClose]);

    useEffect(() => {
        const cleanup = () => {
            window.location.reload();
        };

        if (!open) {
            cleanup();
        }

        return cleanup;
    }, [open]);

    return (
        <div>
            <Dialog 
                open={open} 
                onClose={() => { setOpen(false); onClose && onClose(); }} 
                aria-labelledby="alert-dialog-title" 
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{ padding: 0 }}>
                    <div style={{ backgroundColor: '#D32F2F', padding: '16px', textAlign: 'center' }}>
                        <DeleteIcon style={{ fontSize: '48px', color: 'white' }} />
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '16px', textAlign: 'center' }}>
                        <DialogTitle id="alert-dialog-title">El documento ha sido eliminado</DialogTitle>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Deleting;