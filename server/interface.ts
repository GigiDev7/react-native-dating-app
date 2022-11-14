export interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  bio?: string;
  gender: string;
  email: string;
  password: string;
  likes?: string[];
  likedBy?: string[];
  matches?: string[];
}
