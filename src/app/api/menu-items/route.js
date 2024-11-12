import mongoose from "mongoose";
import { MenuItem } from "../../models/MenuItems";
import { NextResponse } from "next/server"; // For Next.js

export async function POST(req) {
    try {
        // Ensure database connection is established
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL);
        }

        // Parse the request body
        const data = await req.json();

        // Create a new menu item document in the databases
        const menuItemDoc = await MenuItem.create(data);

        // Return the created document as a JSON response
        return NextResponse.json(menuItemDoc);

    } catch (error) {
        // Return error response in case of any failure
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req) {
    try {
        // Ensure database connection is established
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL);
        }

        // Parse the request body
        const {_id,...data} = await req.json();

        await MenuItem.findByIdAndUpdate(_id,data)
        // Return the created document as a JSON response
        return NextResponse.json(true);

    } catch (error) {
        // Return error response in case of any failure
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



export async function GET() {
    try {
        // Ensure database connection is established
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL);
        }

        // Retrieve all menu items from the database
        const menuItems = await MenuItem.find();

        // Return the menu items as a JSON response
        return NextResponse.json(menuItems);

    } catch (error) {
        // Return error response in case of any failure
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
