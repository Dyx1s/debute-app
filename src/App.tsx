import React, { useState } from 'react';
import { Container } from '@mui/material';
import SignUp from './components/SignUp';
import GetCode from './components/GetCode';
import EncodeToken from './components/EnCodeToken';
import SetStatus from './components/SetStatus';

const App: React.FC = () => {
  const [code, setCode] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const handleCodeReceived = (receivedCode: string) => {
    setCode(receivedCode);
  };

  return (
    <Container>
      <SignUp />
      <GetCode onCodeReceived={handleCodeReceived} />
      {code && <EncodeToken code={code} onTokenGenerated={setToken} />}
      {token && <SetStatus token={token} />}
    </Container>
  );
};

export default App;
