export function EnumModifySexUser (tipo: string){
    switch (tipo) {
        case "MALE":
            return "Masculino"
        case "FEMALE":
            return "Feminino"
        case "OTHERS":
            return "Outro"
    }
}