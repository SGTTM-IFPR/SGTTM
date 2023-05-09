import { Drawer } from "antd";
import { useState } from "react";
import { GrupoData } from "../../datas/GrupoData"
import { GrupoCard } from "../grupo/GrupoCard";
import { GrupoTable } from "../grupo/GrupoTable";

interface IFaseGrupoProps {
    grupos?: GrupoData[] | null;
}
export const FaseGrupo = ({ grupos }: IFaseGrupoProps) => {
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
            <div style={{ display: "flex", flexWrap: "wrap",  justifyContent: "space-between", marginBottom: "20px" }}>
                {grupos.map((grupo: GrupoData) => (
                    <div style={{ width: "48%", paddingTop: '10px' }}>
                        
                        <a onClick={showDrawer} >
                        <GrupoCard key={grupo.id} grupo={grupo} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
         <Drawer closable={false} onClose={onClose} open={open}>
                    Hello
         </Drawer>
        </>
    )
}