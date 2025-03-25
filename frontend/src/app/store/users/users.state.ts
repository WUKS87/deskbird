import { User } from "../../models/users.model";

export interface UsersState {
  users: User[];
  error: string | null;
}

export const initialUsersState: UsersState = {
  users: [],
  error: null
};