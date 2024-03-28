export type TUser = {
    name: string,
    email: string,
    password: string,
    profile: TProfile,
}

export type TProfile = {
    bio: string,
    age: number,
}

