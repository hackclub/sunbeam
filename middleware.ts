import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Protect all apply sub-routes except the landing page and the sign-in page itself
	if (
		pathname.startsWith("/apply/") &&
		!pathname.startsWith("/apply/hca-signin")
	) {
		const token = request.cookies.get("hca_token")?.value;
		if (!token) {
			const signIn = new URL("/apply/hca-signin", request.url);
			return NextResponse.redirect(signIn);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/apply/:path+"],
};
