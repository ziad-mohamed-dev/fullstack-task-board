import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/serverApi";

const guestOnlyRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/boards"];

const isGuestOnlyRoute = (pathname: string) => {
  return guestOnlyRoutes.some((guestRoute) => pathname.startsWith(guestRoute));
};

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some((protectedRoute) =>
    pathname.startsWith(protectedRoute)
  );
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (isGuestOnlyRoute(pathname) && token) {
    try {
      await verifyToken();
      return NextResponse.redirect(new URL("/boards", request.url));
    } catch {
      return;
    }
  }

  if (isProtectedRoute(pathname)) {
    if (token) {
      try {
        await verifyToken();
        return NextResponse.next();
      } catch {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
};
