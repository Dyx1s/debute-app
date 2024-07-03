import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const SignUp: React.FC = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [roles, setRoles] = useState<string[]>([]);
    const [response, setResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await fetch('/api/get-roles');
                if (result.ok) {
                    const data = await result.json();
                    if (data.roles && Array.isArray(data.roles)) {
                        setRoles(data.roles);
                    } else {
                        setError('Не удалось получить список ролей');
                    }
                } else {
                    console.error(`Ошибка получения ролей: ${result.status}`);
                }
            } catch (error) {
                console.error('Ошибка при получении ролей:', error);
            }
        }

        fetchRoles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            last_name: lastName,
            first_name: firstName,
            email,
            role };

        try {
        const result = await fetch('/api/sign-up', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (result.ok) {
            const text = await result.text();
            const cleanText = text.replace(/^"|"$/g, '');
            setResponse(`${cleanText}!`);
        } else {
            const errorText = await result.text();
            setResponse(`${result.status} - ${errorText}`);
        }
        } catch (error) {
        setResponse(`Error: ${error}`);
        } finally {
        setOpen(true);
        }
    };

    return (
        <div>
        <Typography variant="h5" >Регистрация</Typography>
            <form onSubmit={handleSubmit} style= {{width: '40%'}}>
                <TextField
                    label="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel> Выбрать роль </InputLabel>
                    <Select
                        value={role}
                        onChange={(e) => setRole(e.target.value as string)}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}> {role} </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" color="primary">
                    Отправить
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            <Dialog open={open} onClose={() => setOpen(false)}>
                        <DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {response}
                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>
                                <Button onClick={() => setOpen(false)} color="primary">OK</Button>
                            </DialogActions>
                        </DialogTitle>
            </Dialog>
        </div>
    );
};

export default SignUp;
