import mongoose from "mongoose";

type ConnectionObject ={
    isConnected ?: number;

}

const connection : ConnectionObject= {}
const uri= process.env.MONGOO_URL as string;
async function dbConnect(): Promise<void>{
    if (connection.isConnected) {
        console.log("Already Connected");
        return
    }

    try {
       const db = await mongoose.connect(uri);
       connection.isConnected = db.connections[0].readyState
       console.log("Connected");
       return



    } catch (error) {
        
        console.log("Error in database connection", error);
        process.exit(1);
    }

    
}

export default dbConnect;