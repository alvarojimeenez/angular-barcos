import { Socio } from "./Socio";

export interface LoginResponse  {
    socio: Socio,
    token: string
}