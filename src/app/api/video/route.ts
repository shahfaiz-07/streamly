import { authOptions } from "@/config/auth";
import { connectDB } from "@/config/db";
import { STATUS_CODES } from "@/constants";
import Video, { IVideo } from "@/models/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const videos = await Video.find().populate('uploadedBy').sort({createdAt: -1}).exec()
        return NextResponse.json({
                message: "Videos fetched successfully!",
                success: true,
                data: videos
            }, {status: STATUS_CODES.OK})
    } catch (error) {
        console.log("Error in fetching videos :: ", error)
        return NextResponse.json({
                error: "Error fetching videos!",
                success: false
            }, {status: STATUS_CODES.CONFLICT})
    }
}
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user) {
            return NextResponse.json({
                error: "Unauthorized Access!",
                success: false
            }, {status: STATUS_CODES.UNAUTHORIZED})
        } 
        await connectDB()

        const body: IVideo = await request.json();
        
        if(!body.title || !body.description || !body.thumbnailUrl || !body.videoUrl) {
            return NextResponse.json({
                error: "All fields are required!",
                success: false
            }, {status: STATUS_CODES.BAD_REQUEST})
        }

        const newVideo  = await Video.create({
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            },
            uploadedBy: session.user.id
        })

        return NextResponse.json({
                message: "Video uploaded!",
                success: true,
                data: newVideo
            }, {status: STATUS_CODES.OK})
    } catch (error) {
        console.log("Error uploading video ::", error)
        return NextResponse.json({
                error: "Error uploading video!",
                success: false
            }, {status: STATUS_CODES.INTERNAL_SERVER_ERROR})
    }
}