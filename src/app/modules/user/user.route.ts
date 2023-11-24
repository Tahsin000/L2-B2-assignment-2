import express from 'express'
import { UserControllers } from './user.controller'

const router = express.Router()

// will call controller function

// insertUser into DB
router.post('/users', UserControllers.createUser)

// getSingleUser into DB
router.get('/users/:userId', UserControllers.getSingleUser)

// getAllUser into DB
router.get('/users', UserControllers.getUser)

// getSingleUser into DB
router.delete('/users/:userId', UserControllers.deleteUser)

// updateSingleUser into DB
router.put('/users/:userId', UserControllers.updateUser)

// insertOrder into DB
router.put('/users/:userId/orders', UserControllers.updateOrder)

// getAllOrder into DB
router.get('/users/:userId/orders', UserControllers.getAllOrder)

// getTotalPrice into DB
router.get('/users/:userId/orders/total-price', UserControllers.getTotalPrice)

export const UserRoutes = router
