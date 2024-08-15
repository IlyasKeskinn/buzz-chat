"use client";
import { NextResponse } from "next/server";
import { getSession } from "./lib/lib";
import { firebaseAuth } from "./utils/FirebaseConfig";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const userToken = await getSession();

  if (request.nextUrl.pathname === "/" && !userToken?.user?._id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/sign-up") &&
    userToken?.user?._id
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
