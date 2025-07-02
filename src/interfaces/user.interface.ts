import { RoleBinding, Reservation } from "generated/prisma";

export interface User {
  id: string;             
  email: string;
  password: string; 
  name: string;
  age: number;
  address: string;
  roles?: RoleBinding[];        
  reservations?: Reservation[]; 
}

export type UserWithoutPassword = Omit<User, "password">