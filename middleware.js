import { NextResponse } from 'next/server';

const ROLE_HOME = {
  hod:        '/user/hod',
  mentor:     '/user/mentor',
  grader:     '/user/grader',
  student:    '/user/wallet',
  university: '/university/governance',
};

// No auth required
const PUBLIC_PATHS = [
  '/university/login',
  '/university/signup',
  '/user/login',
  '/user/signup',
];

// /user/* sections locked to one specific role
const ROLE_PREFIXES = [
  { prefix: '/user/hod',    role: 'hod' },
  { prefix: '/user/mentor', role: 'mentor' },
  { prefix: '/user/grader', role: 'grader' },
];

export function middleware(request) {
  const jwt        = request.cookies.get('jwt')?.value;
  const activeRole = request.cookies.get('activeRole')?.value;
  const { pathname } = request.nextUrl;

  // ── Public routes ──────────────────────────────────────────────────────────
  if (PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))) {
    if (jwt && activeRole) {
      return NextResponse.redirect(
        new URL(ROLE_HOME[activeRole] ?? '/user/login', request.url)
      );
    }
    return NextResponse.next();
  }

  // ── University routes ──────────────────────────────────────────────────────
  if (pathname.startsWith('/university')) {
    if (!jwt) return NextResponse.redirect(new URL('/university/login', request.url));
    if (activeRole !== 'university') {
      // Mentor/student hitting /university/* via back button → send them home
      return NextResponse.redirect(
        new URL(ROLE_HOME[activeRole] ?? '/user/login', request.url)
      );
    }
    return NextResponse.next();
  }

  // ── User routes ────────────────────────────────────────────────────────────
  if (pathname.startsWith('/user')) {
    if (!jwt) return NextResponse.redirect(new URL('/user/login', request.url));

    // Pre-feature session (no activeRole cookie) → force re-login to set it
    if (!activeRole) return NextResponse.redirect(new URL('/user/login', request.url));

    // University user navigating to /user/* → send back
    if (activeRole === 'university') {
      return NextResponse.redirect(new URL('/university/governance', request.url));
    }

    // Role-locked sections (/user/hod, /user/mentor, /user/grader)
    for (const { prefix, role } of ROLE_PREFIXES) {
      if (pathname === prefix || pathname.startsWith(prefix + '/')) {
        if (activeRole !== role) {
          return NextResponse.redirect(
            new URL(ROLE_HOME[activeRole] ?? '/user/wallet', request.url)
          );
        }
        return NextResponse.next();
      }
    }

    // /user/wallet, /user/aadhaarIntr, etc. — any non-university role is fine
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/university/:path*', '/user/:path*'],
};
