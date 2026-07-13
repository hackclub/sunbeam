import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const now = new Date();
	const endDate = new Date("July 14, 2026 05:00:00");

	if (pathname.startsWith("/apply/") && (pathname != "/apply/closedApps" && now.getTime() > endDate.getTime())) {
		const closedApps = new URL("/apply/closedApps", request.url);
		return NextResponse.redirect(closedApps);
	}

	// Protect all apply sub-routes except the landing page and the sign-in page itself
	if (
		pathname.startsWith("/apply/") &&
		!pathname.startsWith("/apply/hca-signin") &&	
		pathname != ("/apply/step2") &&
		pathname != ("/apply/closedApps") 
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
