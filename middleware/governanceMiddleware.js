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
  const publicRoutes = [
    '/university/login',
    '/university/signup',
    '/user/login',
    '/user/signup',
  ];

  // Protected routes that require authentication for the university governance section
  const governanceProtectedRoutes = [
    '/university/governance',
    '/university/governance/invite/[govAdd]/[govName]/[cName]',
    '/university/governance/marksEntryToggle/[govAdd]/[govName]/[cName]',
    '/university/certificates',
  ];

  // Protected routes that require authentication for the grader section
  const graderProtectedRoutes = [
    '/grader',
    '/grader/marksDatabase/[govAdd]/[govName]/[cName]',
  ];

  // Check if the current route is public
  if (publicRoutes.includes(pathname)) {
    if (jwt) {
      // User is logged in but trying to access a public route
      if (pathname.startsWith('/university')) {
        return NextResponse.redirect(
          new URL('/university/governance', request.url)
        );
      } else if (pathname.startsWith('/user/login')) {
        return NextResponse.redirect(new URL('/grader', request.url));
      }
    } else {
      // User is not logged in and trying to access a public route
      return NextResponse.next(); // Allow access
    }
  }

  // Check protected routes for the university governance section including dynamic routes
  if (
    governanceProtectedRoutes.some((route) =>
      matchesDynamicRoute(pathname, route)
    )
  ) {
    if (!jwt) {
      // User is not logged in and trying to access a protected university route
      return NextResponse.redirect(new URL('/university/login', request.url));
    }
    // If logged in, allow access to protected university routes
    return NextResponse.next();
  }

  // Check protected routes for the grader section including dynamic routes
  if (
    graderProtectedRoutes.some((route) => matchesDynamicRoute(pathname, route))
  ) {
    if (!jwt) {
      // User is not logged in and trying to access a protected grader route
      return NextResponse.redirect(new URL('/user/login', request.url));
    }
    // If logged in, allow access to protected grader routes
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

  if (pathname.startsWith('/grader')) {
    if (jwt) {
      // Logged-in user is trying to access other grader routes not explicitly handled
      return NextResponse.redirect(new URL('/grader', request.url));
    }
    // If not logged in and trying to access other grader routes, fall through
  }

  // If entering any random route, redirect to the error page
  if (pathname.startsWith('/')) {
    return NextResponse.redirect(new URL('/error', request.url));
  }

  // Allow access if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/university/:path*', '/grader/:path*', '/user/:path*'],
};
