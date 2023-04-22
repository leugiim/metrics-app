import { z } from 'zod';

export interface User {
	username: string;
	password?: string;
	roles: RolesPermissions;
	companiesPermissions: string[];
}

export interface RolesPermissions {
	canWriteCompanies: boolean;
	canReadCompanies: boolean;
	canWriteMetrics: boolean;
	canReadMetrics: boolean;
}

export enum Permission {
	CAN_WRITE_COMPANIES = 'canWriteCompanies',
	CAN_READ_COMPANIES = 'canReadCompanies',
	CAN_WRITE_METRICS = 'canWriteMetrics',
	CAN_READ_METRICS = 'canReadMetrics'
}

export const rolesPermissionsSchema = z.object({
	canWriteCompanies: z.boolean(),
	canReadCompanies: z.boolean(),
	canWriteMetrics: z.boolean(),
	canReadMetrics: z.boolean()
});

export const permissionSchema = z.nativeEnum(Permission);

export const userSchema = z.object({
	username: z.string(),
	password: z.string().optional(),
	roles: rolesPermissionsSchema,
	companiesPermissions: z.array(z.string())
});
