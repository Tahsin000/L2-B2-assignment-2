"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_zod_1 = require("./user.validation.zod");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const user = req.body;
        const zodParsedData = user_validation_zod_1.userValidationSchema.parse(user);
        yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        // send the res
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: userWithoutPassword,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const result = yield user_service_1.UserServices.getUserIntoDB();
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getSingleUserIntoDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const userId = Number(req.params.userId);
        const user = req.body;
        if (user.userId !== undefined || user.username !== undefined) {
            return res.status(400).json({
                success: false,
                message: 'You cannot change the userId or username.',
            });
        }
        const zodParsedData = user_validation_zod_1.userUpdateValidationSchema.parse(user);
        const result = yield user_service_1.UserServices.updateUserIntoDB(userId, zodParsedData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.deleteUserIntoDB(userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const userId = Number(req.params.userId);
        const order = req.body;
        const zodParsedData = user_validation_zod_1.ordersValidationSchema.parse(order);
        const result = yield user_service_1.UserServices.updateOrderIntoDB(userId, zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getAllOrderIntoDB(userId);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const result = yield user_service_1.UserServices.getTotalPriceIntoDB(userId);
        res.status(200).json({
            success: true,
            message: 'Total price fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: {
                code: req.app.settings.port,
                description: err.message,
            },
        });
    }
});
exports.UserControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    updateOrder,
    getAllOrder,
    getTotalPrice,
};
