import { Col, Row } from "antd"


interface IFaseEliminatoriaProps {
}

export const FaseEliminatoria = ({ }: IFaseEliminatoriaProps) => {
    return (
        <>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: "20px", margin: '20px 20px' }}>
            <Row gutter={[24, 0]} style={{ width: '100%'}}>
                <span> Funcionando </span>
            </Row>

        </div>
        </>

    )
}