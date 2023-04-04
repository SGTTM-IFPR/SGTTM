import { getAll } from "../services/user.service"

export const UserCrudPage= () => {
    getAll()
    return (
        <div>
            User Crud Funcionando
        </div>
    )
}