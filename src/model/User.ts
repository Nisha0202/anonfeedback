import {Schema, Document, model, models} from "mongoose";
import {Message, MessageSchema} from "./Message";

// Define the User interface extending the Document from Mongoose
export interface User extends Document {
  userName: string;
  userEmail: string;
  password: string;
  verifyCode: string;
  verifyExpireDate: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
  createdAt: Date;
  isForgetPassword: boolean;
  newPassword: string
}

// Define the UserSchema using Mongoose
const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
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
    type: String,
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

  isForgetPassword:{
    type: Boolean,
    default: false
  },
  newPassword: {
    type: String,
    required: false,
  }

});


// Use the existing model if it is already compiled, otherwise define it
const UserModel = models.User || model<User>('User', UserSchema);


export default UserModel;

