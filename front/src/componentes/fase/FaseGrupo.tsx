import { Button, Col, Drawer, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { GrupoData } from "../../datas/GrupoData"
import { GrupoCard } from "../grupo/GrupoCard";
import { GrupoTable } from "../grupo/GrupoTable";
import { getAllPartidasByGrupoId } from "../../servicos/PartidaService";
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
    const [partidas, setPartidas] = useState<any[] | null>(null);
    const [form] = Form.useForm();

    const showDrawer = async (grupoId?: number) => {
        if (!grupoId)
            return;
        await getAllPartidasByGrupoId(grupoId).then((partidasData) => setPartidas(partidasData))
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    if (!grupos)
        return (
            <div>Sem grupos</div>
        )


    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
                <Row gutter={[2, 2]}>
                    {grupos.map((grupo: GrupoData) => (
                        <Col style={{ width: "48%", paddingTop: '10px' }} span={24}>

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
                <PartidaList partidas={partidas} form={form} />
            </Drawer>
        </>
    )
}