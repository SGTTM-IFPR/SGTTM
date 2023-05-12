export function ModificarEnumStatus(tipo: string) {
    switch (tipo) {
        case "ABERTO" || "Aberto":
            return "Aberto"
        case "EM_ANDAMENTO" || "Em Andamento":
            return "Em Andamento"
        case "FECHADO" || "Fechado":
            return "Fechado"
    }
}