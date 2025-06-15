import { authOptions } from "@/config/auth";
import { STATUS_CODES } from "@/constants";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({
                error: "Unauthorized Access!",
                success: false
            }, { status: STATUS_CODES.UNAUTHORIZED })
        }

        const user = await User.findById(session.user.id)

        return NextResponse.json({
                message: "User details fetched successfully!",
                success: true,
                data: {
                    email: user.email,
                    username: user.username
                }
            }, { status: STATUS_CODES.OK })
    } catch (error) {
        console.log("Error in fetching user details ::", error)
        return NextResponse.json({
            error: "User details cannot be fetched!",
            success: false
        }, {status: STATUS_CODES.INTERNAL_SERVER_ERROR})
    }
}