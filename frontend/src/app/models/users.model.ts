export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AddUser {
  email: string;
  role: string;
}