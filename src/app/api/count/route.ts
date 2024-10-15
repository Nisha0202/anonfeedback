import dbConnect from "@/lib/dbConnect"; // Import your dbConnect function
import { NextResponse } from 'next/server'; // Use NextResponse for API responses
import { Schema, Document, model, models } from "mongoose"; // Import necessary Mongoose modules

// Define the Counts interface
export interface Counts extends Document {
    totalcount: number;
    updatedAt: Date;
}

// Define the Count schema
const CountSchema: Schema<Counts> = new Schema({
    totalcount: {
        type: Number,
        required: true,
        default: 0, // Set a default value for totalcount
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Use the existing model if it is already compiled, otherwise define it
const CountModel = models.Counts || model<Counts>('Counts', CountSchema);

// POST handler to increment the count
export async function POST(request: Request) {
    // Connect to the database
    await dbConnect();

    try {
        // Increment the count
        await CountModel.findOneAndUpdate(
            {}, // Update the first document found
            { $inc: { totalcount: 1 }, updatedAt: new Date() }, // Increment the totalcount by 1 and update the timestamp
            { upsert: true } // Create the document if it doesn't exist
        );

        // Log for debugging purposes
        console.log("Count incremented successfully");

        // Return a success response
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Count increment failed", error);

        // Return an error response
        return NextResponse.json({ success: false, message: "Count increment failed" }, { status: 500 });
    }
}
