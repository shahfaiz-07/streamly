import { connectDB } from "@/config/db";
import { STATUS_CODES } from "@/constants";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if(!email || !password) {
            return NextResponse.json({
                error: "Email and Password Required!",
                success: false
            }, {status: STATUS_CODES.BAD_REQUEST})
        }

        await connectDB()
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return NextResponse.json({
                error: "User already registered!",
                success: false
            }, {status: STATUS_CODES.CONFLICT})
        }

        await User.create({
            email,
            password
        })

        return NextResponse.json({
                message: "User created!",
                success: true
            }, {status: STATUS_CODES.CREATED})
    } catch (error) {
        console.log("User registration error ::", error)
        return NextResponse.json({
                error: "Failed to register user!",
                success: false
            }, {status: STATUS_CODES.INTERNAL_SERVER_ERROR})
    }
}