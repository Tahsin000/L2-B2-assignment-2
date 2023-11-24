"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// will call controller function
// insertUser into DB
router.post('/users', user_controller_1.UserControllers.createUser);
// getSingleUser into DB
router.get('/users/:userId', user_controller_1.UserControllers.getSingleUser);
// getAllUser into DB
router.get('/users', user_controller_1.UserControllers.getUser);
// getSingleUser into DB
router.delete('/users/:userId', user_controller_1.UserControllers.deleteUser);
// updateSingleUser into DB
router.put('/users/:userId', user_controller_1.UserControllers.updateUser);
// insertOrder into DB
router.put('/users/:userId/orders', user_controller_1.UserControllers.updateOrder);
// getAllOrder into DB
router.get('/users/:userId/orders', user_controller_1.UserControllers.getAllOrder);
// getTotalPrice into DB
router.get('/users/:userId/orders/total-price', user_controller_1.UserControllers.getTotalPrice);
exports.UserRoutes = router;
