/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser, UserModel } from './user/user.interface'
import config from '../config'
import bcrypt from 'bcrypt'

export const userNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
})

export const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
})

export const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'Student ID is required.'],
    unique: true,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: userNameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: addressSchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
})
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre, hook: we will save the data ')
  // hashing password and save info DB
  const temp = this
  temp.password = await bcrypt.hash(
    temp.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
