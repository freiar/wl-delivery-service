import { User } from "./user";

export interface Registration {
    user: User;
    id: number;
    avatar: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: number;
    disabled: boolean;
}
