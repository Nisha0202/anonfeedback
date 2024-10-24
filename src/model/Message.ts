import {Schema, Document, model, models} from "mongoose";

// type
export interface Message extends Document{
    _id: string;
    content: string;
    createAt: Date;
    isPinned?: boolean;
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
        
    },
    isPinned:{
        type : Boolean,
        default: false,
        
    }
})


// Use the existing model if it is already compiled, otherwise define it
const MessageModel = models.Message || model<Message>('Message', MessageSchema);


export default MessageModel;

