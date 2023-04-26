export class UsuarioData {
  id?: number = 1;
  cpf?: string;
  senha?: string;
  nome?: string;
  email?: string;
  data_nascimento?: string;
  administradpr?: boolean = true;
  atleta?: boolean;
  clube?: string | null;
  federacao?: string | null;
  sexo?: string;
}