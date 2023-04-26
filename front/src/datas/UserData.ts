export class UserData {
  id?: number = 1;
  cpf?: string;
  password?: string;
  name?: string;
  email?: string;
  birth_date?: string;
  administrator?: boolean = true;
  athlete?: boolean;
  club?: string | null;
  federation?: string | null;
  sex?: string;
}