import { TorneioLista } from '../componentes/torneio/TorneioLista';
import { FlagStatusTorneio } from '../componentes/torneio/FlagStatusTorneio';
import { SetStateAction, useState } from 'react';
import { FaseEliminatoria } from '../componentes/fase/FaseEliminatoria';

export const HomePage = () => {
  const [status, setStatus] = useState('Aberto');

  const handleStatusChange = (value: SetStateAction<string>) => {
    setStatus(value);
  };

  return (
    // so mostrar se start for false

    <>
      <FlagStatusTorneio onStatusChange={handleStatusChange} />
      <TorneioLista status={status} />
    </>

  );
};
