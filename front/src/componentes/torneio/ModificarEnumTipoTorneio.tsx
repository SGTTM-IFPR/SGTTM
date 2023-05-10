export function ModificarEnumTipoTorneio (tipo: string){
    switch (tipo) {
        case "COPA":
            return "Copa"
        case "ELIMINATORIA_SIMPLES":
            return "Eliminatória Simples"
        case "RODIZIO_SIMPLES":
            return "Rodízio Simples"
    }
}