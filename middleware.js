import { clerkMiddleware,  createRouteMatcher } from "@clerk/nextjs/server";

// for protected routes if any routes want to protect just add them.
const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)", 
    "/forum(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
