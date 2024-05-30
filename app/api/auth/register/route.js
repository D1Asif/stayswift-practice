import { userModel } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    const { fname, lname, email, password } = await request.json();

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        name: fname + " " + lname,
        email: email,
        password: hashedPassword
    }

    try {
        const res = await userModel.create(newUser);
        return new NextResponse("User created successfully", {
            status: 201
        })
    } catch(err) {
        return new NextResponse("Error occurred", {
            status: 500
        })
    }
}