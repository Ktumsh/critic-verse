export interface User {
  id: string;
  role: string;
  email: string;
  username: string;
  password: string;
  birthdate?: Date | string;
  profileImage?: string;
}
