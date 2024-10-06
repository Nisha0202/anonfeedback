import mongoose, {Schema, Document, model, models} from "mongoose";

// type
export interface Message extends Document{
    content: string;
    createAt: Date;
}

export const MessageSchema : Schema<Message> = new Schema({
    content:{
        type : String,
        required : true
    },
    createAt:{
        type : Date,
        required : true,
        default: Date.now,
        
    }
})

// const MessageModel = model<Message>('Message', MessageSchema);

// Use the existing model if it is already compiled, otherwise define it
const MessageModel = models.Message || model<Message>('Message', MessageSchema);


export default MessageModel;

