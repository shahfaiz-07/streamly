import { STATUS_CODES } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs"
import { uploadOnCloudinary } from "@/utils/cloudinary";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            console.log("File required!");
            return NextResponse.json({
                error: "File is required!",
                success: false
            }, { status: STATUS_CODES.BAD_REQUEST })
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const tempFilePath = `./public/temp/${file.name}`;

        fs.writeFileSync(tempFilePath, buffer);

        const result = await uploadOnCloudinary(tempFilePath);

        if (!result) {
            return NextResponse.json({
                error: "File upload failed!",
                success: false
            }, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
        }

        return NextResponse.json({
            message: "File uploaded successfully!",
            success: true,
            videoUrl: result.secure_url
        }, {
            status: STATUS_CODES.OK
        })
    } catch (error) {
        console.log(`Error uploading video to cloudinary :: ${error}`)
        return NextResponse.json({
            error: "File upload failed!",
            success: false
        }, { status: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}