'use client';

export default function UniversityLayout({ children }) {
  return (
    <div>
      <body className="flex">{children}</body>
    </div>
  );
}
