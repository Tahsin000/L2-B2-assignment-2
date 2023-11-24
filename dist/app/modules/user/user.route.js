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
router.post('/users', user_controller_1.UserControllers.createUser);
router.get('/users/:userId', user_controller_1.UserControllers.getSingleUser);
router.get('/users', user_controller_1.UserControllers.getUser);
router.delete('/users/:userId', user_controller_1.UserControllers.deleteUser);
router.put('/users/:userId', user_controller_1.UserControllers.updateUser);
exports.UserRoutes = router;
