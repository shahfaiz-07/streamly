"use client"
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    const [googleLoading, setGoogleLoading] = useState<boolean>(false)
    const [githubLoading, setGithubLoading] = useState<boolean>(false)
    const [discordLoading, setDiscordLoading] = useState<boolean>(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast("Password and Confirm Password Must be Same!", { icon: '⚠️' })
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post("/api/auth/register", {
                email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (!response.data.success) {
                toast.error(response.data.error)
            }
            setLoading(false)
            toast.success("User Registration Successful!")
            router.push("/login")
        } catch (error) {
            toast.error("Error Registering User! Please Try Again Later!")
        }
        setLoading(false)
    }

    const handleGoogleSign = async () => {
        setGoogleLoading(true);
        const result = await signIn("google", {
            redirect: false
        })

        if (result?.error) {
            toast.error("Login Failed! Please try again later!");
        }

        toast.success("Logged In Successfully!");
        if (result?.url) {
            router.replace("/");
        }
        setGoogleLoading(false);
    }

    const handleGithubSign = async () => {
        setGithubLoading(true);
        const result = await signIn("github", {
            redirect: false
        })

        if (result?.error) {
            toast.error("Login Failed! Please try again later!");
        }

        if (result?.url) {
            toast.success("Logged In Successfully!");
            router.replace("/");
        }
        setGithubLoading(false);
    }

    const handleDiscordSign = async () => {
        setDiscordLoading(true);
        const result = await signIn("discord", {
            redirect: false
        })

        if (result?.error) {
            toast.error("Login Failed! Please try again later!");
        }

        if (result?.url) {
            toast.success("Logged In Successfully!");
            router.replace("/");
        }
        setDiscordLoading(false);
    }
    return (
        <div className='min-h-full w-full grid place-content-center'>
            <form onSubmit={handleSubmit} className='my-5 card'>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 card-body">
                    {/* <legend className="fieldset-legend text-base">Register to Streamly</legend> */}
                    <h2 className="card-title mx-auto">Register to Stream.ly</h2>
                    <label className='label'>Email</label>
                    <label className="input input-primary validator">
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
                        <input type="email" placeholder="mail@site.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>
                    <label className='label'>Password</label>
                    <label className="input input-primary validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>

                        <input
                            type="password"
                            required
                            placeholder="Create a Password"
                            minLength={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>

                    <label className='label'>Confirm Password</label>
                    <label className="input input-primary validator">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="h-[1em] opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>

                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your Password"
                        />
                    </label>
                    <div className='validator-hint hidden'>Required</div>
                    <button className="btn btn-outline btn-primary mt-2 w-fit mx-auto" type="submit" disabled={loading}>
                        {
                            loading ? <span className="loading loading-infinity loading-xl"></span>
                                : "Register"
                        }
                    </button>
                    <div className="divider">OR</div>
                    <button className="btn bg-white text-black border-[#e5e5e5]" disabled={loading || googleLoading || githubLoading} type='button' onClick={handleGoogleSign}>
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        {
                            googleLoading ? (<span className="loading loading-dots loading-xs"></span>) : ("Login with Google")
                        }
                    </button>
                    <button className="btn bg-black text-white border-black" disabled={loading || googleLoading || githubLoading} type='button' onClick={handleGithubSign}>
                        <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                        {
                            googleLoading ? (<span className="loading loading-dots loading-xs"></span>) : ("Login with Github")
                        }
                    </button>
                    <button className="btn bg-[#5865F2] text-white border-[#5865F2]" disabled={loading || googleLoading || githubLoading || discordLoading} type='button' onClick={handleDiscordSign}>
                        <svg width="16px" height="16px" viewBox="0 -28.5 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#fff" fillRule="nonzero"> </path> </g> </g></svg>
                        {
                            discordLoading ? (<span className="loading loading-dots loading-xs"></span>) : ("Login with Discord")
                        }
                    </button>
                    <p className='text-center mt-2'>Already have an account? <span className="link link-primary cursor-pointer" onClick={() => router.push('/login')}>Login</span></p>
                </fieldset>
            </form>
        </div>
    )
}

export default Register