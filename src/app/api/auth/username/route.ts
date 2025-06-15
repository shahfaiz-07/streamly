import { authOptions } from "@/config/auth";
import { connectDB } from "@/config/db";
import { STATUS_CODES } from "@/constants";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({
                error: "Unauthorized Access!",
                success: false
            }, { status: STATUS_CODES.UNAUTHORIZED })
        }
        console.log("Session ::", session)
        await connectDB()

        const { username } = await request.json();

        if(!username) {
            return NextResponse.json({
                error: "Username is required!",
                success: false
            }, { status: STATUS_CODES.BAD_REQUEST })
        }

        const existingUser = await User.findOne({username})

        if(existingUser) {
            return NextResponse.json({
                error: "Username already exists!",
                success: false
            }, { status: STATUS_CODES.CONFLICT })
        }

        const user = await User.findByIdAndUpdate(session.user.id, 
            {username}, {new: true})

        return NextResponse.json({
            message: "Username updated successfully!",
            success: true
        }, {status: STATUS_CODES.OK})

    } catch (error) {
        console.log("Error changing username ::", error)
        return NextResponse.json({
            error: "Username update failed!",
            success: false
        }, {status: STATUS_CODES.INTERNAL_SERVER_ERROR})
    }
}