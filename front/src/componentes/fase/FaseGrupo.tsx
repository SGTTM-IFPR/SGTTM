import { Button, Col, Drawer, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { GrupoData } from "../../datas/GrupoData"
import { GrupoCard } from "../grupo/GrupoCard";
import { GrupoTable } from "../grupo/GrupoTable";
import { getAllPartidasByGrupoId, updateAllPartidas } from "../../servicos/PartidaService";
import { PartidaData } from "../../datas/PartidaData";
import { PartidaList } from "../partida/PartidaList";
import { useAuth } from "../../autenticacao/context/AuthenticationContext";

interface IFaseGrupoProps {
    grupos?: GrupoData[] | null;
}
export const FaseGrupo = ({ grupos }: IFaseGrupoProps) => {

    useEffect(() => {
    }, [grupos])

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
        await updateAllPartidas(newPartidas).then((partidasData) => setPartidas(partidasData))
        .finally(() => setOpen(false));
    }

    if (!grupos)
        return (
            <div>Sem grupos</div>
        )


    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
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
                        <Button type="primary" onClick={form.submit}>
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