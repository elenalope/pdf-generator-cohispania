import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Deleting = ({ onClose }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            onClose && onClose();
        }, 1500);

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
        <Stack
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                width: 'auto',
                zIndex: 1500
            }}
            spacing={2}
        >
            <Alert variant="filled" severity="error">
                El documento fue eliminado
            </Alert>
        </Stack>
    );
};

export default Deleting;