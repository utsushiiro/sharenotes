export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthState = {
  loginUser: User | null;
  isLoading: boolean;
};
