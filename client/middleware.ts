import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./app/_actions/authActions";

async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  try {
    const user = await getUser();

    // Protected routes - require authentication
    if (/\/profile\/.*/.test(pathname) || pathname.startsWith("/checkout")) {
      if (user) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(`${origin}/`);
      }
    }
    // Auth routes - redirect authenticated users away
    else if (
      pathname === "/login" ||
      pathname === "/sign-up" ||
      pathname === "/confirmation" ||
      pathname === "/forgot-password" ||
      pathname === "/reset-password"
    ) {
      if (user) {
        return NextResponse.redirect(`${origin}/`);
      } else {
        return NextResponse.next();
      }
    }

    // For any other routes, allow access
    return NextResponse.next();
  } catch (err) {
    // If there's an error getting user, treat as unauthenticated
    if (/\/profile\/.*/.test(pathname) || pathname.startsWith("/checkout")) {
      return NextResponse.redirect(`${origin}/`);
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    "/profile/(.*)",
    "/login",
    "/confirmation",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/checkout",
  ],
};

export default middleware;
