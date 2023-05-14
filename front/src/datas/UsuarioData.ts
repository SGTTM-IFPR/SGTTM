export class UsuarioData {
  id?: number = 1;
  cpf?: string;
  senha?: string;
  nome?: string;
  email?: string;
  data_de_nascimento?: string;
  administrador?: boolean = false;
  atleta?: boolean = true;
  clube?: string | null;
  federacao?: string | null;
  sexo?: string;
}