"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export interface FileUploadProps {
    onSuccess: (res: any) => void
    fileType?: "image" | "video"
    setLoading: (val: boolean) => void
    disabled: boolean
}
// FileUpload component demonstrates file uploading using ImageKit's Next.js SDK.
const FileUpload = ({ onSuccess, fileType, setLoading, disabled=true }: FileUploadProps) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setErrors("Please upload a valid video file!")
            }
        }
        if (file.size > 100 * 1024 * 1024) { // 100MB
            setErrors("File size must be less than 100 MB!")
        }
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if(!file || !validateFile(file)) return

        setUploading(true)
        setLoading(true)
        setErrors("")

        try {
            const authRes = await axios.get("/api/imagekit/auth")
            
            const { token, expire, signature, publicKey } = authRes.data

            const res = await upload({
                file, 
                fileName: file.name, 
                publicKey, 
                signature, 
                expire, 
                token,
                onProgress: (event) => {
                    if(event.lengthComputable) {
                        const percent = (event.loaded / event.total) * 100;
                        setProgress(Math.round(percent))
                    }
                }
            })

            onSuccess(res)
        } catch (error) {
            toast.error("Upload failed!")
        } finally {
            setUploading(false)
            setLoading(false)
        }
    }


    return (
        <>
            <label className="label">Video File</label>
            <input type="file" className="file-input file-input-primary" accept={fileType === "video" ? "video/*" : "image/*"} disabled={disabled}
                onChange={handleFileChange} />
                {
                    uploading && (
                        <progress className="progress progress-primary w-full my-2" value={progress} max="100"></progress>
                    )
                }
        </>
    );
};

export default FileUpload;