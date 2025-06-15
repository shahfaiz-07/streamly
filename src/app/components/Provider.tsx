"use client"
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";
import React from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT as string;

export default function Provider({ children }: { children: React.ReactNode }) {
    return (<SessionProvider refetchInterval={5 * 60}>
        <ImageKitProvider urlEndpoint={urlEndpoint}>
            {children}
        </ImageKitProvider>
    </SessionProvider>)
}