import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

interface EncodeTokenProps {
  code: string;
  onTokenGenerated: (token: string) => void;
}

const EncodeToken: React.FC<EncodeTokenProps> = ({ code, onTokenGenerated }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleEncode = () => {
    if (email && code) {
      const stringToEncode = `${email}:${code}`;
      const encodedToken = btoa(stringToEncode);
      setToken(encodedToken);
      onTokenGenerated(encodedToken);
      /* Проверка токена console.log('Token generated in handleEncode:', encodedToken); */
    }
  };

  return (
    <div>
      <Typography variant='h5' marginTop={2}>Токен</Typography>
      <Box display='flex' flexDirection='column' marginTop={2}>
        <TextField
          label="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Код"
          value={code.replace(/.(?=.{4,}$)/g, '*')}
          type="text"
          margin="normal"
          disabled
        />
        <Button onClick={handleEncode}>Кодировать</Button>
      </Box>

      <Typography>Email: {email}</Typography>
      <Typography>Код: {code.replace(/.(?=.{4,}$)/g, '*')}</Typography>
      <Typography>Токен: {token.replace(/.(?=.{4,}$)/g, '*')}</Typography>
    </div>
  );
};

export default EncodeToken;
