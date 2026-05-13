export interface PasswordReset {
  token: string | null;
  email: string | null;
  password: string;
  password_confirmation: string;
}
