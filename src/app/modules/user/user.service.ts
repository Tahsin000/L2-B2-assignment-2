import { UserModel } from "../users.model"
import { TUser } from "./user.interface"

const createUserIntoDB = async (user: TUser) => {
    const result = await UserModel.create(user);
    return result ;
}

const getUserIntoDB = async () => {
    const result = await UserModel.find();
    return result
}
const getSingleUserIntoDB = async (userId: number) => {
    const result = await UserModel.findOne({userId});
    return result
}

const updateUserIntoDB = async (userId: number, user: TUser) => {
    const result = await UserModel.updateOne({userId}, user);
    return result;
}

const deleteUserIntoDB = async (userId: number) => {
    const result = await UserModel.updateOne({userId}, {isDeleted: true});
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getUserIntoDB,
    getSingleUserIntoDB,
    updateUserIntoDB,
    deleteUserIntoDB
}