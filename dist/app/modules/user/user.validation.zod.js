"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidationSchema = exports.userValidationSchema = exports.ordersValidationSchema = void 0;
const zod_1 = require("zod");
const fullNameSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, 'Street is required'),
    city: zod_1.z.string().min(1, 'City is required'),
    country: zod_1.z.string().min(1, 'Country is required'),
});
exports.ordersValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1, 'Username is required'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    fullName: fullNameSchema,
    age: zod_1.z.number().min(0, 'Age must be a positive number'),
    email: zod_1.z.string().email('Invalid email address'),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchema,
    isDeleted: zod_1.z.boolean().default(false),
    orders: zod_1.z.array(exports.ordersValidationSchema).optional().default([]),
});
exports.userUpdateValidationSchema = zod_1.z.object({
    userId: zod_1.z.number().optional(),
    username: zod_1.z.string().min(1, 'Username is required').optional(),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    fullName: fullNameSchema,
    age: zod_1.z.number().min(0, 'Age must be a positive number'),
    email: zod_1.z.string().email('Invalid email address'),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchema,
    isDeleted: zod_1.z.boolean().default(false),
});
