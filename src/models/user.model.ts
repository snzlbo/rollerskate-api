import { Schema, Model, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getEnv } from '../utils/core';

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: true,
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['staff', 'admin'],
    default: 'staff',
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
}, {
  timestamps: true
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email: string, excludeUserId?: string): Promise<boolean> {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password)
}

/**
 * Generate token
 * @returns {Promise<JSON>}
 */
userSchema.methods.generateAuthtoken = async function() {
  const user = {
    _id: this._id,
    firstname: this.firstname,
    lastname: this.lastname,
    username: this.username,
    email: this.email
  }

  return sign(user, getEnv({ name: 'JWT_TOKEN_SECRET' }), { expiresIn: '1d' });
}


userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

export default model('User', userSchema);