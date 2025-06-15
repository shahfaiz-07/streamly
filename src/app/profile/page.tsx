"use client"
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Profile = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [loader, setLoader] = useState<boolean>(false)
    const [changeUsername, setChangeUsername] = useState<boolean>(false)

    const {data: session, update} = useSession()

    const fetchUserDetails = async () => {
        setLoader(true)
        try {
            const response = await axios.get("/api/auth/profile")
            if (!response.data.success) {
                toast.error("Error fetching user details!")
                return;
            }
            setEmail(response.data.data.email)
            setUsername(response.data.data.username)
        } catch (error) {
            console.log("Error fetching the user details ::", error)
        } finally {
            setLoader(false)
        }
    }

    const handleChangeUsername = async () => {
        setLoader(true)
        try {
            const response = await axios.post("/api/auth/username", { username })

            if (!response.data.success) {
                toast.error("Error changing username!");
            } else {
                toast.success("Username changed successfully!")
                await fetchUserDetails();
                await update({username})
            }
        } catch (error) {
            console.log(error);
            toast.error("Error changing username!");
        } finally {
            setLoader(false)
            setChangeUsername(false)
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

    return (
        <div className='min-h-full w-full grid place-content-center'>
            {
                loader ? (
                    <div className="skeleton h-44 w-96"></div>
                ) : (<div className="card card-border bg-base-100 w-96">
                <div className="card-body">
                    <h2 className="card-title">Your Profile</h2>
                    <label className='label'>Email</label>
                    <label className="input w-full">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={true} />
                    </label>
                    <label className='label justify-between mt-2'><span>Username</span>
                        <input type="checkbox" checked={changeUsername} onChange={(e) => setChangeUsername(e.target.checked)} className="toggle toggle-primary" />
                    </label>
                    <div className="join">
                        <div className='w-full'>
                            <label className="input validator join-item">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input type="text" placeholder="Create username" required disabled={!changeUsername} value={username} onChange={(e) => setUsername(e.target.value)} pattern="[A-Za-z][A-Za-z0-9\-]*" minLength={3} maxLength={30} title="Only letters, numbers or dash" />
                            </label>
                            <div className="validator-hint hidden">Must be 3 to 30 characters
                                <br />containing only letters, numbers or dash</div>
                        </div>
                        <button className="btn btn-neutral join-item" onClick={() => {
                            const isValid = /^[A-Za-z][A-Za-z0-9\-]{2,29}$/.test(username);
                            if (isValid) {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                modal?.showModal();
                            }
                        }} type={"submit"}
                            disabled={!changeUsername || loader}
                        >Change {loader && (<span className="loading loading-infinity loading-sm"></span>)}</button>
                    </div>
                </div>
            </div>)
            }
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirmation!</h3>
                    <p className="py-4">Are you sure you want to change your username?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={handleChangeUsername}>Yes</button>
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Profile