export type User = {
  id: number;
  name: string;
};

export type AuthState = {
  loginUser: User | null;
  isLoading: boolean;
};
