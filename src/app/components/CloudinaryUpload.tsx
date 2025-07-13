"use client"
import axios from 'axios';
import React, { useState } from 'react'
import { FileUploadProps } from './FileUpload';
import toast from 'react-hot-toast';

const CloudinaryUpload = ({ onSuccess, fileType, setLoading, disabled=true }: FileUploadProps) => {

    const [uploading, setUploading] = useState<boolean>(false);
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true);
        setLoading(true);
        const toastId = toast.loading("Uploading File!");
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("/api/cloudinary", formData);

            if(!response.data.success) {
                toast.error(response.data.error)
            }
            const res = {
                url: response.data.videoUrl
            }
            toast.success("Uploaded!");
            onSuccess(res)
        } catch (error) {
            toast.error("Upload to cloudinary failed!")
        } finally {
            toast.dismiss(toastId);
            setLoading(false);
            setUploading(false);
        }

    };
    return (
        <div>
            <label className="label">Video File</label>
            <input type="file" className="file-input file-input-primary" accept={fileType=="video" ? "video/*" : "image/*"} disabled={disabled}
                onChange={handleFileChange} />
        </div>
    )
}

export default CloudinaryUpload