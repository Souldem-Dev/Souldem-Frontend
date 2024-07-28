import { NextResponse } from 'next/server';

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
  const role = request.cookies.get('role'); // Assuming the role is stored in a cookie
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    '/university/login',
    '/university/signup',
    '/user/login',
    '/user/signup',
  ];

  const governanceProtectedRoutes = [
    '/university/governance',
    '/university/governance/invite/[govAdd]/[govName]/[cName]',
    '/university/governance/marksEntryToggle/[govAdd]/[govName]/[cName]',
    '/university/certificates',
  ];

  const userProtectedRoutes = [
    '/grader',
    '/grader/marksDatabase/[govAdd]/[govName]/[cName]',
    '/student',
    '/student/certificate',
    '/student/marksheet/[cid]/[cName]/[gName]',
    '/mentor',
    '/mentor/invite/[govAdd]/[govName]/[cName]',
    '/mentor/approval/[govAdd]/[govName]/[cName]',
    '/mentor/mint/[mentorAdd]/[govAdd]/[govName]/[cName]',
    '/hod',
    '/hod/invite/[govAdd]/[govName]/[cName]',
  ];

  // Redirect authenticated users trying to access public routes based on their role
  if (publicRoutes.includes(pathname)) {
    if (jwt) {
      // Redirect based on user role
      switch (role) {
        case 'grader':
          return NextResponse.redirect(new URL('/grader', request.url));
        case 'hod':
          return NextResponse.redirect(new URL('/hod', request.url));
        case 'student':
          return NextResponse.redirect(new URL('/student', request.url));
        case 'mentor':
          return NextResponse.redirect(new URL('/mentor', request.url));
        default:
          return NextResponse.next(); // If role is unknown, allow access
      }
    } else {
      return NextResponse.next(); // Allow access for public routes if not authenticated
    }
  }

  // Check governance protected routes
  if (
    governanceProtectedRoutes.some((route) =>
      matchesDynamicRoute(pathname, route)
    )
  ) {
    if (!jwt) {
      return NextResponse.redirect(new URL('/university/login', request.url));
    }
    return NextResponse.next();
  }

  // Check user protected routes
  if (
    userProtectedRoutes.some((route) => matchesDynamicRoute(pathname, route))
  ) {
    if (!jwt) {
      // Redirect to respective paths based on user role
      switch (role) {
        case 'grader':
          return NextResponse.redirect(new URL('/grader', request.url));
        case 'hod':
          return NextResponse.redirect(new URL('/hod', request.url));
        case 'student':
          return NextResponse.redirect(new URL('/student', request.url));
        case 'mentor':
          return NextResponse.redirect(new URL('/mentor', request.url));
        default:
          return NextResponse.redirect(new URL('/user/login', request.url)); // Redirect to login for unknown roles
      }
    }
    return NextResponse.next();
  }

  // If the route is not protected or public, redirect to a 404 page
  return NextResponse.redirect(new URL('/404', request.url));
}

export const config = {
  matcher: [
    '/university/:path*',
    '/grader/:path*',
    '/user/:path*',
    '/student/:path*',
    '/hod/:path*',
    '/mentor/:path*',
  ],
};
