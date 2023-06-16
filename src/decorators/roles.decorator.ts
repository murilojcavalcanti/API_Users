import { SetMetadata } from "@nestjs/common"
import { Role } from "../Enums/role.enum"
export const ROLES_KEY = "roles"
export const Roles =( ...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

/*Esse decorator será usado para fazer a autorização dos usuarios*/