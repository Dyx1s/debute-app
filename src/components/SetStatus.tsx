import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

interface SetStatusProps {
    token: string;
}

const SetStatus: React.FC<SetStatusProps> = ({ token }) => {
    const [response, setResponse] = useState<string | null>('Подождите...');
    const [responseType, setResponseType] = useState<'success' | 'error' | 'waiting'>('waiting');

    useEffect(() => {
        const statusData = {
            token: token,
            status: 'increased'
        };

        fetch('/api/set-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusData),
        })
        .then((response) => response.text())
        .then((data) => {
            const cleanData = data.replace(/^"|"$/g, '');
            setResponse(cleanData);
            setResponseType('success');
        })
        .catch((error) => {
            setResponse(`Error: ${error}`);
            setResponseType('error');
        });
    }, [token]);

    return (
        <div>
            <Typography variant='h5' marginTop={2}>Set Status</Typography>
            <Box>
                <Typography>Токен: {token.replace(/.(?=.{4,}$)/g, '*')}</Typography>
            </Box>
            <Typography style={{ color: responseType === 'success' ? 'green' : responseType === 'error' ? 'red' : 'black' }}>{response}</Typography>
        </div>
    );
};

export default SetStatus;
