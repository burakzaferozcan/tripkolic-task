import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Kullanıcı oturum bilgisini kontrol et
  const user = request.cookies.get("user")?.value;
  const isLoggedIn = user ? JSON.parse(user).isLoggedIn : false;

  // Profil sayfasına erişim kontrolü
  if (request.nextUrl.pathname.startsWith("/profile") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Kullanıcı giriş yapmışsa login sayfasına erişimi engelle
  if (request.nextUrl.pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Ana sayfaya yönlendirme
  if (request.nextUrl.pathname === "/" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (request.nextUrl.pathname === "/" && isLoggedIn) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/profile/:path*"],
};
