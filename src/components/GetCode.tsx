import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const GetCode: React.FC<{ onCodeReceived: (code: string) => void}> = ({ onCodeReceived }) => {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setResponse('Введите email!');
            setOpen(true);
            return;
        }

        try {
            const res = await fetch(`/api/get-code?email=${encodeURIComponent(email)}`);
        if (res.ok) {
            const text = await res.text();
            const cleanText = text.replace(/^"|"$/g, '');
            onCodeReceived(cleanText);
            setResponse(`Code: ${cleanText}`);
        } else {
            const errorText = await res.text();
            const cleanErrorText = errorText.replace(/^"|"$/g, '');
            setResponse(`Failed to get code: ${res.status} - ${cleanErrorText}`);
        }
        } catch (error) {
            setResponse(`Error: ${error}`);
        } finally {
            setOpen(true);
        }
    };

/*   модалка =>  const handleClose = () => {
        setOpen(false);
    }; */

    return (
        <div>
            <Typography variant="h5" marginTop={2}>Получить код</Typography>

            <form onSubmit={handleSubmit} style= {{ width: '40%', flexDirection: 'row' }}>
                <Box display="flex">
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit"  color="primary">
                    Код
                    </Button>
                </Box>

            </form>

{/* Если нужен токен, то можно вывести его в отдельное модальное окно, оставил в качестве примера
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ваш код</DialogTitle>
                    <DialogContent>
                        <DialogContentText> {response} </DialogContentText>
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
};

export default GetCode;
