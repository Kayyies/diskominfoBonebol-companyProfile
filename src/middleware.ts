import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Tentukan secret key dari environment variable
const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  // Ambil token JWT dari request
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // Jika token ada, artinya user sudah login
  if (token) {
    // Jika user ingin mengakses halaman login namun sudah login, redirect ke dashboard admin
    if (pathname === "/auth/login") {
      return NextResponse.redirect(new URL("/admin/", req.url));
    }
    // Izinkan akses jika sudah login
    return NextResponse.next();
  }

  // Jika belum login dan mencoba mengakses halaman /admin, redirect ke login
  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Izinkan akses ke halaman lain yang tidak butuh login
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"], // Hanya jalankan middleware untuk /admin/* dan /login
};
