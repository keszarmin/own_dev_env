
export interface IModel {
    id: number;
    name: string;
    description: string;
    type: string;
    data: string;
}

export interface IUserModel {
    username: string,
    password: string
}

export const Types = [
    "world",
    "timer"
]