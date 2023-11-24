import express  from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

// will call controller function 

router.post('/users', UserControllers.createUser)

router.get('/users/:userId', UserControllers.getSingleUser)

router.get('/users', UserControllers.getUser)

router.put('/users/:userId', UserControllers.updateUser)

export const UserRoutes = router;