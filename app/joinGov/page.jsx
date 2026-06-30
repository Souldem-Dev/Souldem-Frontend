'use client';
import React from 'react';
import Link from 'next/link';

const roles = [
  { label: 'Student', href: '/joinGov/student' },
  { label: 'Mentor', href: '/joinGov/mentor' },
  { label: 'Head of Department', href: '/joinGov/hod' },
  { label: 'Grader', href: '/joinGov/grader' },
];

export default function JoinGovPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold">Join Governance</h1>
      <p className="text-gray-500">Select your role to continue</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {roles.map((role) => (
          <Link
            key={role.href}
            href={role.href}
            className="btn btn-primary w-full text-center"
          >
            {role.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
