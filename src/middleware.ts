import {type NextRequest, NextResponse} from 'next/server'
import {updateSession} from "@/lib/supabase/middleware";
import {privateRoutes} from "@/config/routes";

export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    const isProtectedRoute = privateRoutes.includes(path);

    const user = await updateSession(request);

    if (isProtectedRoute && !user){
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}