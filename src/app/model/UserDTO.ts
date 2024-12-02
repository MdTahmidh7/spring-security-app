export class UserDTO {
  id: number;
  username: string;
  password: string;
  email: string;

  constructor(username: string, password: string, email: string, id?: number) {
    this.id = id ;
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
