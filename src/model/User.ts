import mongoose, {Schema, Document, model} from "mongoose";
import {Message, MessageSchema} from "./Message";

// Define the User interface extending the Document from Mongoose
export interface User extends Document {
  userName: string;
  userEmail: string;
  password: string;
  verifyCode: number;
  verifyExpireDate: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
  createdAt: Date;
}

// Define the UserSchema using Mongoose
const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid email address!`,
    },
  },

  password: {
    type: String,
    required: true,
  },

  verifyCode: {
    type: Number,
    required: true,
  },
  verifyExpireDate: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  isAcceptingMessage: {
    type: Boolean,
    default: false,
  },

  messages: [MessageSchema],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Export the User model
const UserModel = model<User>('User', UserSchema);

export default UserModel;

