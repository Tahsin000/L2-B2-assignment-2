import { User } from '../users.model'
import { TOrders, TUpdateUser, TUser } from './user.interface'

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('user already exists')
  }
  const result = await User.create(user)
  return result
}

const getUserIntoDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ])
  return result
}
const getSingleUserIntoDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $project: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ])
  return result
}

const updateUserIntoDB = async (userId: number, user: TUpdateUser) => {
  // const result = await User.updateOne({ userId }, user)
  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $set: { updatedUser: user },
    },
    {
      $project: {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  ])
  return result
}

const deleteUserIntoDB = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

const updateOrderIntoDB = async (userId: number, order: TOrders) => {
  const result = await User.updateOne({ userId }, { $push: { orders: order } })
  return result
}

const getAllOrderIntoDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $project: {
        orders: 1,
      },
    },
  ])
  return result
}

const getTotalPriceIntoDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $project: {
        orders: 1,
      },
    },
  ])
  return result
}

export const UserServices = {
  createUserIntoDB,
  getUserIntoDB,
  getSingleUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB,
  updateOrderIntoDB,
  getAllOrderIntoDB,
  getTotalPriceIntoDB
}
