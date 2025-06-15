"use client"
import { getSession, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import VideoUploadForm from '../components/VideoUploadForm'

const Upload = () => {
  const { data: session } = useSession()


  return (
    <div className='min-h-full w-full flex flex-col justify-center items-center'>
      {
        !session?.user.username && (
          <div role="alert" className="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Create username in order to upload videos.</span>
          </div>
        )
      }
      <VideoUploadForm />
    </div>
  )
}

export default Upload