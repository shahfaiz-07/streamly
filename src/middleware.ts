import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const {pathname} = req.nextUrl;
        const {token} = req.nextauth;
        if((pathname.startsWith("/login") || pathname.startsWith("/register")) && token) {
            return NextResponse.redirect(new URL("/", req.url))
        }

        return NextResponse.next();
    }, {
        callbacks: {
            authorized({req, token}) {
                const {pathname} = req.nextUrl;
                if(pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "/register") {
                    return true;
                }
                if(pathname === "/" || pathname.startsWith("/api/video")) {
                    return true;
                }
                return !!token // converts it into a boolean value
            }
        }
    }
)

export const config = {
    matcher: [
        // Match all request paths except:
        // 1. _next/static (static files)
        // 2. _next/image (image optimization files)
        // 3. favicon.ico (favicon file)
        // 4. public folder
        "/((?!_next/static|_next/image|favicon.ico|public/).*)"
    ]
}