"use client"
import { IVideoClient } from '@/types'
import React, { useEffect } from 'react'

const VideoComponent = ({ video }: { video: IVideoClient }) => {
  return (
    <div className="card bg-base-100 shadow-sm max-w-80">
      <figure className="relative px-4 pt-4">
        <div className="rounded-lg overflow-hidden relative w-full"
          style={{ aspectRatio: "9/16" }}
          >
          <video
            src={video.videoUrl}
            // alt="Picture of the author"
            controls={video.controls}
            // preload="none"
            poster={video.thumbnailUrl}
            className="w-full h-full object-cover"
          />
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {video.title}
        </h2>
        <p>{video.description}</p>
        <p className='text-sm text-gray-300 text-right font-semibold'>~@{video.uploadedBy.username}</p>
      </div>
    </div>
  )
}

export default VideoComponent