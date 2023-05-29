import { createContext } from "react";
import React from "react";
import { InscricaoData } from "../../../datas/InscricaoData";
import { TorneioData } from "../../../datas/TorneioData";
import { GrupoData } from "../../../datas/GrupoData";

export interface TorneioContextProps {
    torneio: TorneioData | null;
    loading: boolean;
    setTorneio: (torneio: TorneioData | null) => void;
    inscricoes: InscricaoData[] | null;
    setInscricoes: (inscricoes: InscricaoData[] | null) => void;
    findInscricoes: () => void;
    grupos: GrupoData[] | null;
    setGrupos: (grupos: GrupoData[] | null) => void;
    findGrupos: () => void;
    fetchTorneio: () => Promise<void>;
}


export const TorneioContext = createContext<TorneioContextProps>({
    torneio: null,
    loading: true,
    setTorneio: () => {},
    inscricoes: null,
    setInscricoes: () => {},
    findInscricoes: () => {},
    grupos: null,
    setGrupos: () => {},
    findGrupos: () => {},
    fetchTorneio: async () => {},
});

export const useTorneioContext = () => {
    const context = React.useContext(TorneioContext);
    if (!context) {
        throw new Error('useTorneioContext must be used within an TorneioProvider');
    }
    return context;
}
