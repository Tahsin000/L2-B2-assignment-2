/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { UserServices } from './user.service'
import {
  ordersValidationSchema,
  userUpdateValidationSchema,
  userValidationSchema,
} from './user.validation.zod'

const createUser = async (req: Request, res: Response) => {
  // will call service function
  try {
    const user = req.body
    const zodParsedData = userValidationSchema.parse(user)
    const result = await UserServices.createUserIntoDB(zodParsedData)

    // send the res

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      data: err,
    })
  }
}
const getUser = async (req: Request, res: Response) => {
  // will call service function
  try {
    const result = await UserServices.getUserIntoDB()
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  // will call service function
  try {
    const userId = Number(req.params.userId)
    const result = await UserServices.getSingleUserIntoDB(userId)
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  // will call service function
  try {
    const userId = Number(req.params.userId)
    const user = req.body
    if (user.userId !== undefined || user.username !== undefined) {
      return res.status(400).json({
        success: false,
        message: 'You cannot change the userId or username.',
      })
    }
    console.log(user)

    const zodParsedData = userUpdateValidationSchema.parse(user)
    const result = await UserServices.updateUserIntoDB(userId, zodParsedData)
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  // will call service function
  try {
    const userId = Number(req.params.userId)
    const result = await UserServices.deleteUserIntoDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}
const updateOrder = async (req: Request, res: Response) => {
  // will call service function
  try {
    const userId = Number(req.params.userId)
    const order = req.body
    const zodParsedData = ordersValidationSchema.parse(order)
    console.log(zodParsedData)
    const result = await UserServices.updateOrderIntoDB(userId, zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const result = await UserServices.getAllOrderIntoDB(userId)
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const result = await UserServices.getTotalPriceIntoDB(userId)
    res.status(200).json({
      success: true,
      message: 'Total price fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
    })
  }
}

export const UserControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateOrder,
  getAllOrder,
  getTotalPrice,
}
