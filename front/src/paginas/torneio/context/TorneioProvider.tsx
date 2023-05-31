import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useNavigate, useParams } from "react-router";
import { TorneioContext } from "./TorneioContext";
import { TorneioData } from "../../../datas/TorneioData";
import { getTorneioById } from "../../../servicos/TorneioServico";
import { InscricaoData } from "../../../datas/InscricaoData";
import { getInscricaoByTorneioId } from "../../../servicos/InscricaoServico";
import { GrupoData } from "../../../datas/GrupoData";
import { getGruposByTorneioId } from "../../../servicos/GrupoServico";

interface TorneioProviderProps {
  children: ReactNode;
}

export const TorneioProvider = ({ children }: TorneioProviderProps) => {
  const [torneio, setTorneio] = useState<TorneioData | null>(null);
  const [inscricoes, setInscricoes] = useState<InscricaoData[] | null>(null);
  const [grupos, setGrupos] = useState<GrupoData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();


  const fetchTorneio = async () => {
    if (!id)
      return;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      console.error(`Invalid id: ${id}`);
      return;
    }

    try {
      setTorneio(await getTorneioById(parsedId));
    } catch (error) {
      console.error(error);
    } finally {
      console.log(torneio);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTorneio();
  }, []);

  const findInscricoes = useCallback(async () => {
    if (!torneio || !torneio.id)
      return;
    await getInscricaoByTorneioId(torneio.id).then((inscricaoData) => setInscricoes(inscricaoData))
  }, [torneio]);

  const findGrupos = useCallback(async () => {
    if (!torneio || !torneio.id)
      return;
    await getGruposByTorneioId(torneio.id).then((grupoData) => setGrupos(grupoData))
  }, [torneio]);
  
  return (
    <TorneioContext.Provider
      value={{
        torneio,
        loading,
        setTorneio,
        inscricoes,
        setInscricoes,
        findInscricoes,
        grupos,
        setGrupos,
        findGrupos,
        fetchTorneio
      }}>
      {children}
    </TorneioContext.Provider>
  );
};

export const useTorneioContext = () => useContext(TorneioContext);

