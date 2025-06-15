"use client"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
const Navbar = () => {
    const { data: session } = useSession()

    const router = useRouter()
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Stream.ly</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 space-x-1">
                    <li><a onClick={() => router.push("/")}>Home</a></li>
                    {
                        session?.user ? (<li>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="">
                                    Menu
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a onClick={() => router.push("/profile")}>
                                            Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a onClick={() => router.push("/upload")}>
                                            Upload
                                        </a>
                                    </li>
                                    <li onClick={() => signOut()}><a>Logout</a></li>
                                </ul>
                            </div>
                        </li>) : (<>
                            <li><a onClick={() => router.push("/register")}>Register</a></li>
                            <li><a onClick={() => router.push("/login")}>Login</a></li>
                        </>)
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar