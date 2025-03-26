export interface ProfileState {
  role: string | null;
  error: string | null;
}

export const initialProfileState: ProfileState = {
  role: null,
  error: null
};