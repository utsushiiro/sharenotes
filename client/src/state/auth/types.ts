type User = {
    name: string
}

type AuthState = {
    isLogined: boolean,
    loginUser: User | null
}