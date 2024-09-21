import mongoose, {Schema, Document, model} from "mongoose";

// type
export interface Message extends Document{
    content: string;
    createAt: Date;
}

const MessageSchema : Schema<Message> = new Schema({
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

const MessageModel = model<Message>('Message', MessageSchema);

export default MessageModel;

