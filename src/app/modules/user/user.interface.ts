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