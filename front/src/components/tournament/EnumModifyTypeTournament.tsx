export function EnumModifyTypeTournament (tipo: string){
    switch (tipo) {
        case "COUP":
            return "Copa"
        case "SINGLE_ELIMINATION":
            return "Eliminatória Simples"
        case "ROUND_ROBIN":
            return "Rodízio Simples"
    }
}