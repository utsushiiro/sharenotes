export type User = {
  name: string;
};

export type AuthState = {
  loginUser: User | null;
  isLoading: boolean;
};
