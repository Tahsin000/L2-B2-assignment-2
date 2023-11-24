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
exports.UserServices = void 0;
const users_model_1 = require("../users.model");
function checkUserExists(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield users_model_1.User.isUserExists(userId);
        return userExists;
    });
}
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield users_model_1.User.isUserExists(user.userId)) {
        throw new Error('user already exists');
    }
    const result = yield users_model_1.User.create(user);
    return result;
});
const getUserIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield users_model_1.User.aggregate([
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
    ]);
    return result;
});
const getSingleUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = users_model_1.User.findOne({ userId }, {
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
    });
    return result;
});
const updateUserIntoDB = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield checkUserExists(userId))) {
        throw new Error('User does not exist');
    }
    // const result = await User.updateOne({ userId }, user)
    const result = yield users_model_1.User.aggregate([
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
    ]);
    return result;
});
const deleteUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield checkUserExists(userId))) {
        throw new Error('User does not exist');
    }
    const result = yield users_model_1.User.updateOne({ userId }, { isDeleted: true });
    return result;
});
const updateOrderIntoDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield checkUserExists(userId))) {
        throw new Error('User does not exist');
    }
    const result = yield users_model_1.User.updateOne({ userId }, { $push: { orders: order } });
    return result;
});
const getAllOrderIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield checkUserExists(userId))) {
        throw new Error('User does not exist');
    }
    const result = yield users_model_1.User.findOne({ userId }, { orders: 1, _id: 0 });
    return result;
});
const getTotalPriceIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield checkUserExists(userId))) {
        throw new Error('User does not exist');
    }
    const result = yield users_model_1.User.aggregate([
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
    ]);
    return result[0];
});
exports.UserServices = {
    createUserIntoDB,
    getUserIntoDB,
    getSingleUserIntoDB,
    updateUserIntoDB,
    deleteUserIntoDB,
    updateOrderIntoDB,
    getAllOrderIntoDB,
    getTotalPriceIntoDB,
};
