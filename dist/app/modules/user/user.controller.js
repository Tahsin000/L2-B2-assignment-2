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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_zod_1 = require("./user.validation.zod");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // will call service function
    try {
        const user = req.body;
        const zodParsedData = user_validation_zod_1.userValidationSchema.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodParsedData);
        // send the res
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            data: err,
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
            message: err,
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
            message: err,
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
        console.log(user);
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
            message: err,
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
            message: err,
        });
    }
});
exports.UserControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
