"use client"
import VideoFeed from "./components/VideoFeed";
import { useEffect, useState } from "react";
import { IVideoClient } from '@/types'
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState<IVideoClient[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchVideos = async () => {
    setLoading(true)
    console.log("Inside Fetching Videos")
    try {
      const response = await axios.get("/api/video")
      if(response.data.success) {
        setVideos(response.data.data)
      }
    } catch (error) {
      console.log("Error fetching videos ::", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchVideos()
  }, [])
  return (
    <div className="min-h-full w-full p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold">Explore</h2>
      <VideoFeed videos={videos}/>
    </div>
  );
}
