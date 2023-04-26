export function ModificarEnumSexoUsuario (tipo: string){
    switch (tipo) {
        case "MASCULINO":
            return "Masculino"
        case "FEMININO":
            return "Feminino"
        case "OUTROS":
            return "Outro"
    }
}