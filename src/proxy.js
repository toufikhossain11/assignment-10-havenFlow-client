import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
import { headers } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
 const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session);
    if (!session) {
        return NextResponse.redirect(new URL('/home/login', request.url))
    }
 }
 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher:[ '/home/allProperties/:path',"/deshboard/admin","/deshboard/admin/all-properties","/deshboard/admin/all-bookings","/deshboard/admin/transactions","/deshboard/admin/my-profile","/deshboard/tenant","/deshboard/tenant/favorites","/deshboard/tenant/my-profile","/deshboard/owner","/deshboard/owner/add-property","/deshboard/owner/my-properties","/deshboard/owner/booking-requests","/deshboard/owner/my-profile"],
}