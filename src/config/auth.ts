import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import { connectDB } from "./db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                identifier: { label: "Email or Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // console.log("Inside authorize :: ", credentials)
                if (!credentials?.identifier || !credentials?.password) {
                    // console.log("Credentials Missing")
                    throw new Error("Missing credentials!")
                }
                try {
                    await connectDB()
                    const user = await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier },
                        ]
                    })

                    if (!user) {
                        // console.log("User not found")
                        throw new Error("Credentials Invalid")
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if (!isValid) {
                        // console.log("Password error")
                        throw new Error("Credentials Invalid")
                    }
                    // console.log("Successfull")
                    return {
                        id: user._id.toString(),
                        username: ""
                    }
                } catch (error) {
                    // console.log("Error in logging in :: ", error)
                    throw error
                }
            }
        }),
        GoogleProvider({
            name: "google",
            clientId: process.env.GOOGLE_AUTH_CLIENT as string,
            clientSecret: process.env.GOOGLE_AUTH_SECRET as string,
            async profile(profile) {
                const email = profile.email
                try {
                    await connectDB()

                    let user = await User.findOne({email});
                    
                    if(!user) {
                        user = await User.create({
                            email,
                        })
                    }
                    user.id = user._id

                    return user
                } catch (error: any) {
                    console.log("Authentication error:", error);
                    console.log("Errors ::", error.errors)
                    return null
                }
            }
        }),
        GitHubProvider({
            name: "github",
            clientId: process.env.GITHUB_AUTH_CLIENT as string,
            clientSecret: process.env.GITHUB_AUTH_SECRET as string,
            async profile(profile) {
                const email = profile.email

                try {
                    await connectDB()
                    let user = await User.findOne({email});
                    
                    if(!user) {
                        user = await User.create({
                            email,
                        })
                    }
                    user.id = user._id

                    return user
                } catch (error: any) {
                    console.log("Authentication error:", error);
                    console.log("Errors ::", error.errors)
                    return null
                }
            }
        }),
        DiscordProvider({
            name: "discord",
            clientId: process.env.DISCORD_AUTH_CLIENT as string,
            clientSecret: process.env.DISCORD_AUTH_SECRET as string,
            async profile(profile) {
                const email = profile.email
                
                try {
                    await connectDB()
                    let user = await User.findOne({email});
                    
                    if(!user) {
                        user = await User.create({
                            email,
                        })
                    }
                    user.id = user._id

                    return user
                } catch (error: any) {
                    console.log("Authentication error:", error);
                    console.log("Errors ::", error.errors)
                    return null
                }
            }
        }),
        // ...add more providers here
    ],
callbacks: {
        async jwt({ token, user, session, trigger }) {
        if (trigger === "update" && session?.username) {
            token.username = session.username
        }
        if (user) {
            token.id = user.id
            token.username = user.username
        }
        return token
    },
        async session({ session, token, newSession, trigger }) {
        if (trigger === "update" && newSession?.username) {
            session.user.username = newSession.username
        }
        if (session.user) {
            session.user.id = token.id as string
            session.user.username = token.username as string
        }
        return session
    },
},
pages: {
    signIn: '/login',
        error: '/login'
},
session: {
    strategy: 'jwt',
        maxAge: 10 * 24 * 60 * 60, // 10 days
    },
secret: process.env.NEXTAUTH_SECRET
}