import { Breadcrumb, Card } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, EyeFilled } from "@ant-design/icons";
import { useState } from "react";
import { BotaoCriarInscricao } from "../inscricao/BotaoCriarInscricao";
import { ModificarEnumTipoTorneio } from "./ModificarEnumTipoTorneio";
import { TorneioData } from "../../datas/TorneioData";
import { Button, Space } from 'antd';
import { green } from '@ant-design/colors'
import { Link } from "react-router-dom";
import { DataFormatada } from "../data/FormatarData";


const { Meta } = Card;
interface TorneioCardProps {
    torneio: TorneioData;
    onMouseEnter?: (id: number) => void;
    onMouseLeave?: () => void;
}

export const TorneioCard = ({ torneio }: TorneioCardProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const handleCardClick = () => {
    };


    const cardStyle = {
        width: "300px",
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "space-between",
        height: isHovered || hoveredId === torneio?.id ? "auto" : "100%",
        transform: isHovered || hoveredId === torneio?.id ? "scale(1.1)" : "scale(1)",
        opacity: isHovered || hoveredId === torneio?.id ? 1 : 0.9,
        transition: "transform 0.3s ease-in-out, opacity 0.2s ease-in-out, height 0.3s ease-out-in",
    };

    const imageStyle = {
        maxWidth: "300px",
        maxHeight: "100%",
        height: isHovered ? "0px" : "30%",
        transform: isHovered ? "scaleY(0)" : "scaleY(1)",
        transformOrigin: "bottom",
        transition: "transform 0.3s ease-in-out, height 0.3s ease-in-out",
    };

    const buttonStyle = {
        transition: "transform 0.3s ease-in-out",
        backgroundColor: isButtonHovered ? green[7] : green[5],
        color: "white",
        padding: "10x 16px", // fix padding value here
        borderRadius: "4px",
        maxWidth: "100%",
        ":hover": {
            transform: "scale(1.5)",
            backgroundColor: green[10],
        },
        width: "100%",
    };

    return (
        <Card key={torneio?.id}
            hoverable
            style={{ ...cardStyle }}
            cover={<div>
                <img alt="example"
                    src="src\assets\image-card.jpg"
                    style={{ ...imageStyle }}
                />
            </div>
            }

            actions={
                isHovered ? [
                    <Link to={`/torneio/${torneio?.id}`}>
                        <Button
                            type="primary"
                            icon={<EyeFilled />}
                            style={{ ...buttonStyle }}
                            onMouseEnter={() => setIsButtonHovered(true)}
                            onMouseLeave={() => setIsButtonHovered(false)}>
                            <span>Visualizar</span>
                        </Button>
                    </Link>,
                ]
                    : undefined}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)} >
            <Meta
                title={<h2 >{torneio?.nome}</h2>}
                description={torneio?.local}
            />
            {isHovered ? (
                <div>
                    <p>
                        <b>Data de início: </b>
                        <DataFormatada data={torneio.data_inicio?.toString()!} />
                    </p>
                    <p>
                        <b>Data de término: </b>
                        <DataFormatada data={torneio.data_final?.toString()!} />
                    </p>
                    <p>
                        <b>Local: </b>
                        {torneio.local}
                    </p>
                    <p>
                        <b>Tipo do torneio: </b>
                        {torneio.tipo_torneio}
                    </p> </div>
            ) : null}
        </Card>
    )

}