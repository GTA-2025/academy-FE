export interface SignUpPayloadI {
  first_name: string;
  last_name: string;
  country: string;
  email: string;
  phone: string;
  password: string;
  agree_terms: boolean;
}

export interface LoginPayloadI {
  email: string;
  password: string;
}
