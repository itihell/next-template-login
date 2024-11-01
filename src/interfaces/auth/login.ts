export interface LoginData {
  id: string;
  email: string;
  name: string;
  password: string;
  roles: Role[];
  permissions: Permission[];
  accessToken: string;
}

export interface CustomUserAdapter extends LoginData {
  emailVerified: Date & null & string & undefined;
  role: string;
  image?: string;
}

export interface Role {
  id: string;
  role: string;
}

export interface Permission {
  id: string;
  permission: string;
}
