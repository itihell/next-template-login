export interface LoginData {
  id: string;
  email: string;
  fullName: string;
  password: string;
  roles: Role[];
  permissions: Permission[];
  accessToken: string;
}

export interface Role {
  id: string;
  role: string;
}

export interface Permission {
  id: string;
  permission: string;
}
