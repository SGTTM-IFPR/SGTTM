import { Button, Col, Drawer, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { GrupoData } from "../../datas/GrupoData"
import { GrupoCard } from "../grupo/GrupoCard";
import { GrupoTable } from "../grupo/GrupoTable";
import { getAllPartidasByGrupoId, updateAllPartidas } from "../../servicos/PartidaService";
import { PartidaData } from "../../datas/PartidaData";
import { PartidaList } from "../partida/PartidaList";
import { useAuth } from "../../autenticacao/context/AuthenticationContext";
import { useTorneioContext } from "../../paginas/torneio/context/TorneioContext";

interface IFaseGrupoProps {
}
export const FaseGrupo = ({ }: IFaseGrupoProps) => {

    const { torneio, fetchTorneio, grupos, findGrupos } = useTorneioContext();

    const { identity } = useAuth();

    const [open, setOpen] = useState(false);
    const [partidas, setPartidas] = useState<PartidaData[] | null>(null);
    const [form] = Form.useForm();

    const showDrawer = async (grupoId?: number) => {
        if (!grupoId)
            return;
        await getAllPartidasByGrupoId(grupoId).then((partidasData) => setPartidas(partidasData))
        .finally(() => setOpen(true));
    };

    const onClose = () => {
        setOpen(false);
    };


    const onFinish = async (values: any) => {
        console.log(values)
        if (!partidas)
            return null;
        const newPartidas = partidas.map(partida => {
            return {
                ...partida,
                ...values.partidas[partida.id]
            };
        });
        console.log(newPartidas)
        await updateAllPartidas(newPartidas).then((partidasData) => setPartidas(partidasData))
        .finally(async () => {
            await fetchTorneio();
            await findGrupos();
            setOpen(false);
        });
    }

    if (!grupos)
        return (
            <div>Sem grupos</div>
        )


    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "20px", margin: '20px 20px' }}>
                <Row gutter={[24, 0]} style={{ width: '100%'}}>
                    {grupos.map((grupo: GrupoData) => (
                        <Col style={{ width: "100%", paddingTop: '10px' }} span={12} key={grupo.id}>

                            <a onClick={() => showDrawer(grupo.id)} >
                                <GrupoCard key={grupo.id} grupo={grupo} />
                            </a>
                        </Col>
                    ))}
                </Row>
            </div>
            <Drawer closable={false} onClose={onClose} open={open} width={'50%'}
                title="Partidas"
                extra={
                    identity.isAdmin ?
                        <Button type="primary" onClick={form.submit} disabled={torneio?.fase_atual != 'Fase de grupos'}>
                            <span>Salvar</span>
                        </Button>
                        : null
                }>
                <Form form={form} onFinish={onFinish}>
                    <PartidaList partidas={partidas} form={form} />
                </Form>
            </Drawer>
        </>
    )
}