// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server"
import { STATUS_CODES } from "@/constants"

export async function GET() {
    try {
        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        })
    
        return Response.json({ token, expire, signature, publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY, success: true }, {status: STATUS_CODES.OK})
    } catch (error) {
        return Response.json({
            error: "Authentication for ImageKit failed!",
            success: false
        }, {status: STATUS_CODES.INTERNAL_SERVER_ERROR})
    }
}