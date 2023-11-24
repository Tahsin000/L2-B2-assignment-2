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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = exports.addressSchema = exports.userNameSchema = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
exports.addressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
exports.userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, 'Student ID is required.'],
        unique: true,
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: exports.userNameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    hobbies: [{ type: String }],
    address: exports.addressSchema,
    isDeleted: {
        type: Boolean,
        default: false,
    },
});
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this, 'pre, hook: we will save the data ')
        // hashing password and save info DB
        const temp = this;
        temp.password = yield bcrypt_1.default.hash(temp.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
exports.userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
exports.userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield exports.User.findOne({ userId });
        return existingUser;
    });
};
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
