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
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    '/university/login',
    '/university/signup',
    '/user/login',
    '/user/signup',
  ];

  const universityProtectedRoutes = [
    '/university/governance',
    '/university/governance/invite/[govAdd]/[govName]/[cName]',
    '/university/governance/marksEntryToggle/[govAdd]/[govName]/[cName]',
    '/university/certificates',
  ];

  const userProtectedRoutes = [
    '/user/grader',
    '/user/grader/marksDatabase/[govAdd]/[govName]/[cName]',
    '/user/wallet',
    '/user/wallet/certificate',
    '/user/wallet/marksheet/[cid]/[cName]/[gName]',
    '/user/mentor',
    '/user/mentor/invite/[govAdd]/[govName]/[cName]',
    '/user/mentor/approval/[govAdd]/[govName]/[cName]',
    '/user/mentor/mint/[mentorAdd]/[govAdd]/[govName]/[cName]',
    '/user/hod',
    '/user/hod/invite/[govAdd]/[govName]/[cName]',
  ];

  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    if (jwt) {
      if (pathname.startsWith('/university')) {
        return NextResponse.redirect(
          new URL('/university/governance', request.url)
        );
      } else if (pathname.startsWith('/user')) {
        return NextResponse.redirect(new URL('/user/wallet', request.url));
      }
    } else {
      return NextResponse.next(); // Allow access to public routes if not logged in
    }
  }

  // Handle protected university routes
  if (
    universityProtectedRoutes.some((route) =>
      matchesDynamicRoute(pathname, route)
    )
  ) {
    if (!jwt) {
      return NextResponse.redirect(new URL('/university/login', request.url));
    }
    return NextResponse.next(); // Allow access to protected university routes if logged in
  }

  // Handle protected user routes
  if (
    userProtectedRoutes.some((route) => matchesDynamicRoute(pathname, route))
  ) {
    if (!jwt) {
      return NextResponse.redirect(new URL('/user/login', request.url));
    }
    return NextResponse.next(); // Allow access to protected user routes if logged in
  }

  // Handle other university routes
  if (pathname.startsWith('/university')) {
    if (jwt) {
      return NextResponse.redirect(
        new URL('/university/governance', request.url)
      );
    }
    return NextResponse.next(); // Allow access to other university routes if not logged in
  }

  // Handle other user routes
  if (pathname.startsWith('/user')) {
    if (jwt) {
      return NextResponse.redirect(new URL('/user/wallet', request.url));
    }
    return NextResponse.next(); // Allow access to other user routes if not logged in
  }

  // Allow access if no conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ['/university/:path*', '/user/:path*'],
};
