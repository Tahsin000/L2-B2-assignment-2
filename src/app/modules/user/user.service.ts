import { User } from '../users.model'
import { TOrders, TUpdateUser, TUser } from './user.interface'

async function checkUserExists(userId: number) {
  const userExists = await User.isUserExists(userId)
  return userExists
}
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
  const result = User.findOne(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
    },
  )
  return result
}

const updateUserIntoDB = async (userId: number, user: TUpdateUser) => {
  if (!(await checkUserExists(userId))) {
    throw new Error('User does not exist')
  }
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
  if (!(await checkUserExists(userId))) {
    throw new Error('User does not exist')
  }
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

const updateOrderIntoDB = async (userId: number, order: TOrders) => {
  if (!(await checkUserExists(userId))) {
    throw new Error('User does not exist')
  }
  const result = await User.updateOne({ userId }, { $push: { orders: order } })
  return result
}

const getAllOrderIntoDB = async (userId: number) => {
  if (!(await checkUserExists(userId))) {
    throw new Error('User does not exist')
  }
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 })
  return result
}

const getTotalPriceIntoDB = async (userId: number) => {
  if (!(await checkUserExists(userId))) {
    throw new Error('User does not exist')
  }
  const result = await User.aggregate([
    {
      $match: { userId },
    },
    {
      $unwind: '$orders',
    },
    {
      $group: { _id: null, totalPrice: { $sum: '$orders.price' } },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ])
  return result[0]
}

export const UserServices = {
  createUserIntoDB,
  getUserIntoDB,
  getSingleUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB,
  updateOrderIntoDB,
  getAllOrderIntoDB,
  getTotalPriceIntoDB,
}
