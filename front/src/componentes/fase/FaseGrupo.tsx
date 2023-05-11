import { Col, Drawer, Row } from "antd";
import { useEffect, useState } from "react";
import { GrupoData } from "../../datas/GrupoData"
import { GrupoCard } from "../grupo/GrupoCard";
import { GrupoTable } from "../grupo/GrupoTable";

interface IFaseGrupoProps {
    grupos?: GrupoData[] | null;
}
export const FaseGrupo = ({ grupos }: IFaseGrupoProps) => {
    
    useEffect(() => {
        console.log(grupos);
    }, [grupos])
    
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
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
            <Row gutter={[2,2]}>
                {grupos.map((grupo: GrupoData) => (
                    <Col style={{ width: "48%", paddingTop: '10px' }} span={24}>
                        
                        <a onClick={showDrawer} >
                        <GrupoCard key={grupo.id} grupo={grupo} />
                        </a>
                    </Col>
                ))}
            </Row>
        </div>
         <Drawer closable={false} onClose={onClose} open={open}>
                    Hello
         </Drawer>
        </>
    )
}