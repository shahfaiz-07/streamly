"use client"
import { getSession, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import VideoUploadForm from '../components/VideoUploadForm'

const Upload = () => {
  const { data: session } = useSession()


  return (
    <div className='min-h-full w-full flex flex-col justify-center items-center'>
      <div role="alert" className="alert alert-warning max-w-lg mx-3 md:mt-5 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Note: For this deployment I am using <span className='text-primary font-bold'>Cloudinary</span> instead of <span className='text-primary font-bold'>ImageKit</span> as it has a limited number of tokens monthly in the free tier account. You can always clone the repo and follow my steps in <span className='text-primary font-bold'>README</span> file to integrate <span className='text-primary font-bold'>ImageKit</span>. It's just uncommenting and commenting some lines of code!</span>
      </div>
      {
        !session?.user.username && (
          <div role="alert" className="alert alert-error mx-3">
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