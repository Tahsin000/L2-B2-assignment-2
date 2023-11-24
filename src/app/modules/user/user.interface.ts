import { Model } from "mongoose";

export type TAddress ={
    street: string
    city: string
    country: string
}
export type THobbies = string[];
export type TFullName ={
    firstName: string
    lastName: string
}
export type TUser =
{
    userId: number
    username: string
    password: string
    fullName: TFullName
    age: number
    email: string
    isActive: boolean
    hobbies: THobbies
    address : TAddress
    isDeleted: boolean
}
export type TUpdateUser =
{
    password: string
    fullName: TFullName
    age: number
    email: string
    isActive: boolean
    hobbies: THobbies
    address : TAddress
    isDeleted: boolean
}

export interface UserModel extends Model <TUser>{
    // eslint-disable-next-line no-unused-vars
    isUserExists(userId: number): Promise<TUser | null>;
} 