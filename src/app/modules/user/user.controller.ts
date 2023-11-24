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
    await UserServices.createUserIntoDB(zodParsedData)

    // send the res
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { password, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userWithoutPassword,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
    })
  }
}
const updateOrder = async (req: Request, res: Response) => {
  // will call service function
  try {
    const userId = Number(req.params.userId)
    const order = req.body
    const zodParsedData = ordersValidationSchema.parse(order)
    const result = await UserServices.updateOrderIntoDB(userId, zodParsedData)


    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
      message: 'something went wrong',
      error: {
        code: req.app.settings.port,
        description: err.message,
      },
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
