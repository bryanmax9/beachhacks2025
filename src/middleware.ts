
    import {type NextRequest, NextResponse} from 'next/server'
    import {updateSession} from "@/lib/supabase/middleware";
    import {privateRoutes} from "@/config/routes";
    import {createServer} from "@/lib/supabase/server";
    export async function middleware(request: NextRequest) {

        const path = request.nextUrl.pathname;
        const isProtectedRoute = privateRoutes.includes(path);

        const user = await updateSession(request);

        if (isProtectedRoute && !user){
            return NextResponse.redirect(new URL('/', request.nextUrl))
        }


        return NextResponse.next();
    }

    export async function getUserRole(userId: string) {
        const supabase = await createServer();
        const { data, error } = await supabase
            .from('profiles') // Replace with your table name
            .select('is_admin') // Replace with your column name
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user role:', error);
            return null;
        }

        return data?.is_admin;
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