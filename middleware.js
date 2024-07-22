// middleware.js
import { NextResponse } from 'next/server';

// Function to check if a pathname matches a dynamic route pattern
const matchesDynamicRoute = (pathname, route) => {
  const routeParts = route.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);

  if (routeParts.length !== pathParts.length) {
    return false;
  }

  return routeParts.every(
    (part, index) => part.startsWith('[') || part === pathParts[index]
  );
};

export function middleware(request) {
  const jwt = request.cookies.get('jwt');
  const { pathname } = request.nextUrl;

  // Public routes that can be accessed without authentication
  const publicRoutes = ['/university/login', '/university/signup'];

  // Protected routes that require authentication
  const protectedRoutes = [
    '/university/governance',
    '/university/governance/invite/[govAdd]/[govName]/[cName]',
    '/university/governance/marksEntryToggle/[govAdd]/[govName]/[cName]',
    '/university/certificates',
  ];

  // Check if the current route is public or protected
  if (publicRoutes.includes(pathname)) {
    if (jwt) {
      // User is logged in but trying to access a public route
      return NextResponse.redirect(
        new URL('/university/governance', request.url)
      );
    } else {
      // User is not logged in and trying to access a public route
      return NextResponse.next(); // Allow access
    }
  }

  // Check protected routes including dynamic routes
  if (protectedRoutes.some((route) => matchesDynamicRoute(pathname, route))) {
    if (!jwt) {
      // User is not logged in and trying to access a protected route
      return NextResponse.redirect(new URL('/university/login', request.url));
    }
    // If logged in, allow access to protected routes
    return NextResponse.next();
  }

  // If the route is not protected or public, handle other cases
  if (pathname.startsWith('/university')) {
    if (jwt) {
      // Logged-in user is trying to access other university routes not explicitly handled
      return NextResponse.redirect(
        new URL('/university/governance', request.url)
      );
    }
    // If not logged in and trying to access other university routes, fall through
  }

  // Allow access if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/university/:path*'],
};
