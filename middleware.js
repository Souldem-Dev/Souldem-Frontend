import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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
  const jwtToken = request.cookies.get('jwt');
  const { pathname } = request.nextUrl;

  // Function to get the role from the JWT
  const getRoleFromJwt = (token) => {
    if (!token) return null;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
      return decoded.role; // Adjust based on your JWT structure
    } catch (err) {
      return null;
    }
  };

  const userRole = getRoleFromJwt(jwtToken);

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

  if (publicRoutes.includes(pathname)) {
    if (userRole) {
      if (userRole === 'university') {
        return NextResponse.redirect(
          new URL('/university/governance', request.url)
        );
      } else if (userRole === 'grader') {
        return NextResponse.redirect(new URL('/grader', request.url));
      } else if (userRole === 'student') {
        return NextResponse.redirect(new URL('/student', request.url));
      } else if (userRole === 'mentor') {
        return NextResponse.redirect(new URL('/mentor', request.url));
      } else if (userRole === 'hod') {
        return NextResponse.redirect(new URL('/hod', request.url));
      }
    } else {
      return NextResponse.next();
    }
  }

  if (
    governanceProtectedRoutes.some((route) =>
      matchesDynamicRoute(pathname, route)
    )
  ) {
    if (!userRole || userRole !== 'university') {
      return NextResponse.redirect(new URL('/university/login', request.url));
    }
    return NextResponse.next();
  }

  if (
    userProtectedRoutes.some((route) => matchesDynamicRoute(pathname, route))
  ) {
    if (!userRole) {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }
    return NextResponse.next();
  }

  // If entering any random route, redirect to the error page
  return NextResponse.redirect(new URL('/404', request.url));
}

export const config = {
  matcher: ['/university/:path*', '/grader/:path*', '/user/:path*'],
};
